// utils/httpClient.js
const axios = require("axios");
const opentracing = require("opentracing");

function createHttpClient(req) {
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    if (req.tracer && req.parentSpan) {
      const span = req.tracer.startSpan("HTTP " + config.method.toUpperCase() + " " + config.url, {
        childOf: req.parentSpan,
      });

      req.tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, config.headers);

      config.metadata = { span };

      span.log({ event: "request_started", url: config.url, method: config.method });
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.config.metadata && response.config.metadata.span) {
        const span = response.config.metadata.span;
        span.log({ event: "request_ended", status: response.status });
        span.finish();
      }
      return response;
    },
    (error) => {
      if (error.config.metadata && error.config.metadata.span) {
        const span = error.config.metadata.span;
        span.setTag(opentracing.Tags.ERROR, true);
        span.log({ event: "request_error", error: error.message });
        span.finish();
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

module.exports = createHttpClient;

// tracingMiddleware.js
const opentracing = require("opentracing");

function tracingMiddleware(tracer, logger) {
  return (req, res, next) => {
    const wireCtx = tracer.extract(
      opentracing.FORMAT_HTTP_HEADERS,
      req.headers
    );
    const span = tracer.startSpan(req.path, { childOf: wireCtx });

    span.setTag(opentracing.Tags.HTTP_METHOD, req.method);
    span.setTag(
      opentracing.Tags.SPAN_KIND,
      opentracing.Tags.SPAN_KIND_RPC_SERVER
    );
    span.setTag(opentracing.Tags.HTTP_URL, req.url);
    span.setTag("requestId", req.requestId || "N/A");

    span.log({
      event: "request_received",
      request_headers: req.headers,
      request_body: req.body,
    });

    req.tracer = tracer;
    req.parentSpan = span;

    const originalSend = res.send.bind(res);
    res.send = (body) => {
      span.log({ event: "response_sent", response_body: body });
      originalSend(body);
    };

    res.on("finish", () => {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);
      if (res.statusCode >= 400) {
        span.setTag(opentracing.Tags.ERROR, true);
        span.log({ event: "error", message: `HTTP ${res.statusCode}` });
      }
      span.log({ event: "request_end" });
      span.finish();
    });

    logger.info({
      event: "request_received",
      request_path: req.path,
      request_method: req.method,
      requestId: req.requestId,
      request_headers: req.headers,
      request_body: req.body,
    });

    next();
  };
}

module.exports = tracingMiddleware;

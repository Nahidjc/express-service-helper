const opentracing = require("opentracing");

function errorHandlingTracingMiddleware(logger) {
  return (err, req, res, next) => {
    const span = req.span;
    if (span) {
      span.setTag(opentracing.Tags.ERROR, true);
      span.log({
        event: "error",
        message: err.message,
        stack: err.stack,
      });
      span.finish();
    }

    logger.error({
      error_message: err.message,
      error_stack: err.stack,
      requestId: req.requestId,
      method: req.method,
      url: req.url,
      status: err.status || 500,
    });

    res.status(err.status || 500);
    res.json({ error: err.message });
  };
}

module.exports = errorHandlingTracingMiddleware;

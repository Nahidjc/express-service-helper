const { initTracer } = require("jaeger-client");

function initJaegerTracer(serviceName) {
  const config = {
    serviceName,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      collectorEndpoint: "http://localhost:14268/api/traces",
    },
  };


  
  const options = {
    logger: {
      info(msg) {
        console.log("INFO", msg);
      },
      error(msg) {
        console.error("ERROR", msg);
      },
    },
  };

  return initTracer(config, options);
}

module.exports = initJaegerTracer;

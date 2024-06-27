"use strict";

const { uuid } = require("uuidv4");

/**
 * Return middleware that gets a unique request id from a header or
 * generates a new id.
 * @param {Object} options - Optional configuration
 * @param {String} options.header - Request and response header name
 * @param {String} options.propertyName - Request property name
 * @param {Function} options.generator - Id generator function
 * @return {Function} - Express middleware
 */
function requestId(options = {}) {
  const {
    header = "X-Request-Id",
    propertyName = "reqId",
    generator = uuid,
  } = options;

  return (req, res, next) => {
    const reqId = req.get(header) || generator();
    req[propertyName] = reqId;
    res.set(header, reqId);
    next();
  };
}

module.exports = requestId;

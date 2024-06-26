# Innovatica Express Helper

[![npm version](https://badge.fury.io/js/innovatica-service-helper.svg)](https://badge.fury.io/js/innovatica-service-helper)
[![Build Status](https://github.com/Nahidjc/express-service-helper/actions/workflows/publish.yml/badge.svg)](https://github.com/Nahidjc/express-service-helper/actions)

A utility package for Express.js providing tracing middleware, response handlers, and various helper methods.

## Installation

To install the package, run the following command:

```bash
npm install innovatica-service-helper
```

## Usage

### Tracing Middleware

To use the tracing middleware, include it in your Express application as shown below:

```javascript
const express = require("express");
const { tracingMiddleware } = require("innovatica-express-helper");

const app = express();

app.use(tracingMiddleware);

// Define your routes here

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Response Handler

Include the response handler middleware in your Express application to standardize response formats:

````javascript
const { responseHandler } = require('innovatica-express-helper');

app.use(responseHandler());

### Error Response Handler

Handle errors uniformly across your application:

```javascript
const { errorResponseHandler } = require('innovatica-express-helper');

app.use(errorResponseHandler);


### DateTime Helpers

Use the DateTime helpers to format dates and get the current date in UTC+6:

```javascript
const { formatDateTime, getCurrentDateTimeUTCPlus6 } = require('innovatica-express-helper');

const formattedDate = formatDateTime('YYYY-MM-DD');
const currentDate = getCurrentDateTimeUTCPlus6();

## API Reference

### Tracing Middleware API

**tracingMiddleware**

Middleware for tracing incoming requests.

Usage:

```javascript
const { tracingMiddleware } = require('innovatica-express-helper');
app.use(tracingMiddleware);


### Response Handler API

**responseHandler**

Middleware for handling responses in a consistent format.

Usage:

```javascript
const { responseHandler } = require('innovatica-express-helper');
app.use(responseHandler());

### Error Response Handler API

**errorResponseHandler**

Middleware for handling errors uniformly.

Usage:

```javascript
const { errorResponseHandler } = require('innovatica-express-helper');
app.use(errorResponseHandler);


### DateTime Helpers API

**formatDateTime(format, date)**

Formats the given date according to the specified format.

- **Parameters:**
  - `format` (string): The format in which to return the date.
  - `date` (Date, optional): The date to format. Defaults to the current date if not provided.

- **Returns:**
  - (string): The formatted date.

- **Usage:**

```javascript
const { formatDateTime } = require('innovatica-express-helper');
const formattedDate = formatDateTime('YYYY-MM-DD');

### DateTime Helpers API

**getCurrentDateTimeUTCPlus6()**

Gets the current date and time in UTC+6.

- **Returns:**
  - (Date): The current date and time in UTC+6.

- **Usage:**

```javascript
const { getCurrentDateTimeUTCPlus6 } = require('innovatica-express-helper');
const currentDate = getCurrentDateTimeUTCPlus6();

## Contributing

We welcome contributions to improve this package. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
````

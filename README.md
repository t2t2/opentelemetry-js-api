# OpenTelemetry API for JavaScript

[![NPM Published Version][npm-img]][npm-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devDependencies][devDependencies-image]][devDependencies-url]
[![Apache License][license-image]][license-image]

This package provides everything needed to interact with the OpenTelemetry API, including all TypeScript interfaces, enums, and no-op implementations. It is intended for use both on the server and in the browser.

The methods in this package perform no operations by default. This means they can be safely called by a library or end-user application whether there is an SDK registered or not. In order to generate and export telemetry data, you will also need an SDK such as the [OpenTelemetry JS SDK][opentelemetry-js].

## Tracing Quick Start

### You Will Need

- An application you wish to instrument
- [OpenTelemetry JS SDK][opentelemetry-js]
- Node.js >=8.5.0 (14+ is preferred) or an ECMAScript 5+ compatible browser

**Note:** ECMAScript 5+ compatibility is for this package only. Please refer to the documentation for the SDK you are using to determine its minimum ECMAScript version.

**Note for library authors:** Only your end users will need an OpenTelemetry SDK. If you wish to support OpenTelemetry in your library, you only need to use the OpenTelemetry API. For more information, please read the [tracing documentation][docs-tracing].

### Install Dependencies

```sh
npm install @opentelemetry/api @opentelemetry/tracing
```

### Trace Your Application

In order to get started with tracing, you will need to first register an SDK. The SDK you are using may provide a convenience method which calls the registration methods for you, but if you would like to call them directly they are documented here: [sdk registration methods][docs-sdk-registration].

Once you have registered an SDK, you can start and end spans. A simple example of basic SDK registration and tracing a simple operation is below. The example should export spans to the console once per second. For more information, see the [tracing documentation][docs-tracing].

```javascript
const { trace }  = require("@opentelemetry/api");
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor }  = require("@opentelemetry/tracing");

// Create and register an SDK
const provider = new BasicTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
trace.setGlobalTracerProvider(provider);

// Acquire a tracer from the global tracer provider which will be used to trace the application
const name = 'my-application-name';
const version = '0.1.0';
const tracer = trace.getTracer(name, version);

// Trace your application by creating spans
async function operation() {
  const span = tracer.startSpan("do operation");
  
  // mock some work by sleeping 1 second
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  })

  span.end();
  return output;
}

async function main() {
  while (true) {
    await operation();
  }
}

main();
```

## Version Compatibility

Because the npm installer and node module resolution algorithm could potentially allow two or more copies of any given package to exist within the same `node_modules` structure, the OpenTelemetry API takes advantage of a variable on the `global` object to store the global API. When an API method in the API package is called, it checks if this `global` API exists and proxies calls to it if and only if it is a compatible API version. This means if a package has a dependency on an OpenTelemetry API version which is not compatible with the API used by the end user, the package will receive a no-op implementation of the API.

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, join us in [GitHub Discussions][discussions-url]

## License

Apache 2.0 - See [LICENSE][license-url] for more information.

[opentelemetry-js]: https://github.com/open-telemetry/opentelemetry-js

[discussions-url]: https://github.com/open-telemetry/opentelemetry-js/discussions
[license-url]: https://github.com/open-telemetry/opentelemetry-js-api/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat
[dependencies-image]: https://david-dm.org/open-telemetry/opentelemetry-js-api/status.svg
[dependencies-url]: https://david-dm.org/open-telemetry/opentelemetry-js-api
[devDependencies-image]: https://david-dm.org/open-telemetry/opentelemetry-js-api/dev-status.svg
[devDependencies-url]: https://david-dm.org/open-telemetry/opentelemetry-js-api?type=dev
[npm-url]: https://www.npmjs.com/package/@opentelemetry/api
[npm-img]: https://badge.fury.io/js/%40opentelemetry%2Fapi.svg

[docs-tracing]: https://github.com/open-telemetry/opentelemetry-js-api/blob/main/docs/tracing.md
[docs-sdk-registration]: https://github.com/open-telemetry/opentelemetry-js-api/blob/main/docs/sdk-registration.md

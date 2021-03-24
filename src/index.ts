/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export * from './baggage/index.js';
export * from './common/Exception.js';
export * from './common/Time.js';
export * from './diag/index.js';
export * from './propagation/NoopTextMapPropagator.js';
export * from './propagation/TextMapPropagator.js';
export * from './trace/attributes.js';
export * from './trace/Event.js';
export * from './trace/link_context.js';
export * from './trace/link.js';
export * from './trace/NoopTracer.js';
export * from './trace/NoopTracerProvider.js';
export * from './trace/ProxyTracer.js';
export * from './trace/ProxyTracerProvider.js';
export * from './trace/Sampler.js';
export * from './trace/SamplingResult.js';
export * from './trace/span_context.js';
export * from './trace/span_kind.js';
export * from './trace/span.js';
export * from './trace/SpanOptions.js';
export * from './trace/status.js';
export * from './trace/TimedEvent.js';
export * from './trace/trace_flags.js';
export * from './trace/trace_state.js';
export * from './trace/tracer_provider.js';
export * from './trace/tracer.js';

export {
  INVALID_SPANID,
  INVALID_TRACEID,
  INVALID_SPAN_CONTEXT,
  isSpanContextValid,
  isValidTraceId,
  isValidSpanId,
} from './trace/spancontext-utils.js';

export * from './context/context.js';
export * from './context/NoopContextManager.js';
export * from './context/types.js';

import { ContextAPI } from './api/context.js';
export type { ContextAPI } from './api/context.js';
/** Entrypoint for context API */
export const context = ContextAPI.getInstance();

import { TraceAPI } from './api/trace.js';
export type { TraceAPI } from './api/trace.js';
/** Entrypoint for trace API */
export const trace = TraceAPI.getInstance();

import { PropagationAPI } from './api/propagation.js';
export type { PropagationAPI } from './api/propagation.js';
/** Entrypoint for propagation API */
export const propagation = PropagationAPI.getInstance();

import { DiagAPI } from './api/diag.js';
export type { DiagAPI } from './api/diag.js';

/**
 * Entrypoint for Diag API.
 * Defines Diagnostic handler used for internal diagnostic logging operations.
 * The default provides a Noop DiagLogger implementation which may be changed via the
 * diag.setLogger(logger: DiagLogger) function.
 */
export const diag = DiagAPI.instance();

export default {
  trace,
  context,
  propagation,
  diag,
};

import pino from 'pino';

import type { Logger as PinoLogger, LoggerOptions } from 'pino';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LoggerConfig {
  level?: LogLevel;
  pinoPretty?: boolean;
}

const pinoPrettyOptions = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  },
};

export class Logger {
  private static instance: PinoLogger;
  private static correlationId?: string;

  static initialize(config: LoggerConfig = {}) {
    const { level = 'info', pinoPretty } = config;

    const options: LoggerOptions = {
      level,
      formatters: {
        level(label) {
          return { level: label };
        },
        bindings(bindings) {
          return { pid: bindings.pid }; // keep minimal
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      ...(pinoPretty && { transport: pinoPrettyOptions }),
    };

    this.instance = pino(options);
  }
  private static enrich(meta?: Record<string, unknown>) {
    return this.correlationId
      ? { ...meta, correlationId: this.correlationId }
      : meta;
  }

  static setCorrelationId(correlationId: string) {
    this.correlationId = correlationId;
  }

  static debug(msg: string, meta?: Record<string, unknown>) {
    this.instance.debug(this.enrich(meta), msg);
  }

  static info(msg: string, meta?: Record<string, unknown>) {
    this.instance.info(this.enrich(meta), msg);
  }

  static warn(msg: string, meta?: Record<string, unknown>) {
    this.instance.warn(this.enrich(meta), msg);
  }

  static error(msg: string, meta?: Record<string, unknown>) {
    this.instance.error(this.enrich(meta), msg);
  }

  static fatal(msg: string, meta?: Record<string, unknown>) {
    this.instance.fatal(this.enrich(meta), msg);
  }
}

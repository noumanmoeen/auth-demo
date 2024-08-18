import { ConsoleLogger, Injectable,  Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private logFile: string;

  constructor() {
    super();
    this.logFile = path.join(process.cwd(), 'logs', 'app.log');
    this.ensureLogDirectoryExists();
  }

  private ensureLogDirectoryExists() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private writeToFile(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
    this.writeToFile(`ERROR: ${message}\nTrace: ${trace}`);
  }

  warn(message: string) {
    super.warn(message);
    this.writeToFile(`WARN: ${message}`);
  }

  log(message: string) {
    super.log(message);
    this.writeToFile(`INFO: ${message}`);
  }

  debug(message: string) {
    super.debug(message);
    this.writeToFile(`DEBUG: ${message}`);
  }

  verbose(message: string) {
    super.verbose(message);
    this.writeToFile(`VERBOSE: ${message}`);
  }
}
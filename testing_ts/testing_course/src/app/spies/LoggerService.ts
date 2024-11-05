export class LoggerService {
    logInfo(message: string): void {
      console.log(`INFO: ${message}`);
    }
  
    logError(message: string): void {
      console.error(`ERROR: ${message}`);
    }
  }
  
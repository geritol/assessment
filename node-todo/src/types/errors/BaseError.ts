export class BaseError extends Error {
  public details: string;
  constructor(message, details) {
    super(message);
    this.details = details;
  }
}

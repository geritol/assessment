import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  constructor(message, details) {
    super(message, details);
  }
}

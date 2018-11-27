import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message, details) {
    super(message, details);
  }
}

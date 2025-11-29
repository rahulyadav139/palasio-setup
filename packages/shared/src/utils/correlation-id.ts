import { v4 as uuid } from 'uuid';

export function generateCorrelationId(): string {
  return uuid();
}

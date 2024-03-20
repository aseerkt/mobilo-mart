import { Types } from 'mongoose';

export function getFloatValue(value?: Types.Decimal128) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}

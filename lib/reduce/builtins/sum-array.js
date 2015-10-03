
import addOrThrow from './add-or-throw';

export default function (values) {
  return values.reduce(addOrThrow, 0);
}

import { customAlphabet } from 'nanoid';
import { env } from '../env';

const codeHash = customAlphabet('1234567890abcdefgh', 6);

export function generateCode() {
  if (env.NODE_ENV === 'development') return '111111';

  return codeHash();
}

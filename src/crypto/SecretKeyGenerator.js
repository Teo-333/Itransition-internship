import crypto from 'crypto';

export default class SecretKeyGenerator {
  generateKey() {
    return crypto.randomBytes(32).toString('hex').toUpperCase();
  }
}

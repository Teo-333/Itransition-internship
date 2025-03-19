const crypto = require('crypto');

class SecretKeyGenerator {
  generateKey() {
    return crypto.randomBytes(32).toString('hex').toUpperCase();
  }
}

module.exports = SecretKeyGenerator;
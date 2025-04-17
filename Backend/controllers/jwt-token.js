// Use this to generator JWT_SECRET and paste it in .env
// To run use node -e in the prefix followed by below console.log
console.log(require('crypto').randomBytes(64).toString('hex'));

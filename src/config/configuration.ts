export default () => ({
  env: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  apiPath: process.env.API_PATH,
  passwordSaltRounds: process.env.PASSWORD_SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: parseInt(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      30,
    ),
    refreshExpirationDays: parseInt(
      process.env.JWT_REFRESH_EXPIRATION_DAYS,
      30,
    ),
    resetPasswordExpirationMinutes: parseInt(
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
      10,
    ),
    verifyEmailExpirationMinutes: parseInt(
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
      10,
    ),
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
});

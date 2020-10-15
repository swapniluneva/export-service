import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    env: envFound.parsed?.NODE_ENV || process.env.NODE_ENV,
    port: process.env.PORT,
    sql: {
        server: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    SECRET: process.env.SECRET,
    TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
}

import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

if (!process.env.PORT) {
    console.warn("⚠️ PORT is not defined in the environment!");
}

export const { 
    PORT, 
    NODE_ENV,DB_URI
    ,JWT_SECRET,
    JWT_EXPIRE_IN,ARCJET_ENV,
    ARCJET_KEY
 } = process.env;

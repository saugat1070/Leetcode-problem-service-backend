import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    port : string | number;
    dbUrl : string;
    jwtSecret ?: string;
}

export const Env : EnvConfig = {
    port : process.env.PORT || 3000,
    dbUrl : process.env.DB_URL || "mongodb://localhost:27017/leetcode-problem"
}
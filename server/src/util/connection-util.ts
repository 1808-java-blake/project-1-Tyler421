import { Pool } from "pg";

export const connectionPool = new Pool({
  database: "postgres",
  host: "revature-1808.caqouygu0qnf.us-east-2.rds.amazonaws.com",
  max: 2,
  password: process.env["1808_MOVIE_DB_PASSWORD"],
  port: 5432,
  user: process.env["1808_MOVIE_DB_USERNAME"]
});

import pg from "pg";

const connectToDB = async () => {
  const pool = new pg.Pool({
    host: "postgres",
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  });
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

export default {
  connectToDB,
};

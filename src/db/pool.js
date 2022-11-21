import poolPromise from "./config.js";

const pool = {
  query: async (query, value) => {
    let result;
    const pool = await poolPromise;
    try {
      var connection = await pool.getConnection();
      result = value
        ? await connection.query(query, value)
        : (await connection.query(query)) || null;
    } catch (err) {
      console.log(err);
      connection.rollback(() => {});
    } finally {
      //pool.releaseConnection(connection);
      return result;
    }
  },
};

export default pool;
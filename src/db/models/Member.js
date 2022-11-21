import statusUtil from "../../utils/statusUtil.js";
import pool from "../pool.js";

const tableName = "cb_member";

const Member = {
  selectAll: async () => {
    const query = `SELECT * FROM ${tableName}`;
    const result = await pool.query(query);

    return result ? statusUtil.success(result) : statusUtil.false();
  },
  insert: async (mem_id, mem_username) => {
    const query = `INSERT INTO ${tableName} (mem_id, mem_username) VALUES (?, ?)`;
    const result = await pool.query(query, [mem_id, mem_username]);

    return result ? statusUtil.success(result) : statusUtil.false();
  },
};



export default Member;
import db from "../database/connection.js";

export const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM categorias");
  return rows;
};

export const create = async ({ nome, descricao }) => {
  const [result] = await db.query(
    "INSERT INTO categorias (nome, descricao) VALUES (?, ?)",
    [nome, descricao]
  );
  return result.insertId;
};

export const update = async (id, { nome, descricao, status }) => {
  const [result] = await db.query(
    `UPDATE categorias
     SET nome = ?, descricao = ?, status = ?
     WHERE id = ?`,
    [nome, descricao, status, id]
  );
  return result.affectedRows;
};

export const hasProducts = async (categoriaId) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as total FROM produtos WHERE categoria_id = ?",
    [categoriaId]
  );

  return rows[0].total > 0;
};

export const remove = async (id) => {
  const [result] = await db.query(
    "DELETE FROM categorias WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

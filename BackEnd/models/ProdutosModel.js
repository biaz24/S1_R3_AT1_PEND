import db from "../database/connection.js";

class ProdutosModel {
  async getAll() {
    const [rows] = await db.query(`
      SELECT
        p.*,
        c.nome AS categoria
      FROM produtos p
      JOIN categorias c ON c.id = p.categoria_id
    `);

    return rows;
  }

  async create(produto) {
    const {
      nome,
      descricao,
      preco,
      quantidade_estoque,
      marca,
      modelo,
      garantia_meses,
      destaque,
      categoria_id,
    } = produto;

    const [result] = await db.query(
      `INSERT INTO produtos (
        nome, descricao, preco, quantidade_estoque,
        marca, modelo, garantia_meses, destaque, categoria_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        descricao,
        preco,
        quantidade_estoque,
        marca,
        modelo,
        garantia_meses,
        destaque,
        categoria_id,
      ],
    );

    return result.insertId;
  }

  async update(id, produto) {
    const {
      nome,
      descricao,
      preco,
      quantidade_estoque,
      status,
      marca,
      modelo,
      garantia_meses,
      destaque,
      categoria_id,
    } = produto;

    const [result] = await db.query(
      `UPDATE produtos SET
        nome = ?,
        descricao = ?,
        preco = ?,
        quantidade_estoque = ?,
        status = ?,
        marca = ?,
        modelo = ?,
        garantia_meses = ?,
        destaque = ?,
        categoria_id = ?
       WHERE id = ?`,
      [
        nome,
        descricao,
        preco,
        quantidade_estoque,
        status,
        marca,
        modelo,
        garantia_meses,
        destaque,
        categoria_id,
        id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM produtos WHERE id = ?", [id]);

    return result.affectedRows;
  }
}

export default new ProdutosModel();

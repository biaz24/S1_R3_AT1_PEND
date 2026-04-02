import ProdutosModel from "../models/ProdutosModel.js";

class ProdutosController {
  async index(req, res, next) {
    try {
      const produtos = await ProdutosModel.getAll();
      res.json(produtos);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const produto = req.body;

      if (!produto.nome) {
        throw new Error("Nome do produto é obrigatório");
      }

      if (produto.preco <= 0) {
        throw new Error("Preço inválido");
      }

      await ProdutosModel.create(produto);

      res.status(201).json({
        message: "Produto cadastrado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const produto = req.body;

      if (!id) {
        throw new Error("ID do produto é obrigatório");
      }

      await ProdutosModel.update(id, produto);

      res.json({
        message: "Produto atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID do produto é obrigatório");
      }

      await ProdutosModel.delete(id);

      res.json({
        message: "Produto removido com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProdutosController();

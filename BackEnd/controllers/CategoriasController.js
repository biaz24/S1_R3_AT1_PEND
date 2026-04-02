import * as CategoriasModel from "../models/CategoriasModel.js";

export const index = async (req, res, next) => {
  try {
    const categorias = await CategoriasModel.getAll();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

export const store = async (req, res, next) => {
  try {
    const categoria = req.body;

    if (!categoria.nome) {
      throw new Error("Nome da categoria é obrigatório");
    }

    await CategoriasModel.create(categoria);

    res.status(201).json({
      message: "Categoria criada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoria = req.body;

    if (!id) {
      throw new Error("ID da categoria é obrigatório");
    }

    if (!categoria.nome) {
      throw new Error("Nome da categoria é obrigatório");
    }

    await CategoriasModel.update(id, categoria);

    res.json({
      message: "Categoria atualizada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("ID da categoria é obrigatório");
    }

    const hasProducts = await CategoriasModel.hasProducts(id);

    if (hasProducts) {
      return res.status(400).json({
        message:
          "Não é possível excluir a categoria pois existem produtos vinculados.",
      });
    }

    await CategoriasModel.delete(id);

    res.json({ message: "Categoria removida com sucesso" });
  } catch (error) {
    next(error);
  }
};

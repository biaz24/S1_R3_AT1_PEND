import express from "express";
import cors from "cors";
import categoriasRoutes from "./routes/CategoriasRoutes.js";
import produtosRoutes from "./routes/ProdutosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);

export default app;

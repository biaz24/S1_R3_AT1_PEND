//endereço onde estamos buscando a API
const API_PRODUTOS = "http://localhost:3000/produtos";
const API_CATEGORIAS = "http://localhost:3000/categorias";
let mudando;

//criar um produto temos que capturar o formulario

const form = document.getElementById("formProduto");
//lista que temos que imprimir para o cliente
const lista = document.querySelector("#listaProdutos");
const btnCancelar = document.getElementById("btnCancelar");

async function carregarProdutos() {
  //                      so colocamos a constante da hrl
  const response = await fetch(API_PRODUTOS);
  const produtos = await response.json();

  //imprimindo para ver se deu certo
  console.log(produtos);

  //limpando o oconteudodo html
  lista.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <h3>${produto.nome}</h3>
    <p>${produto.descricao || "Sem descrição"}</p>
    <p>${produto.marca || "-"}</p>
    <p>${produto.modelo || "-"}</p>
    <p>${produto.quantidade_estoque}</p>
    <p>${produto.preco}</p>
    <div class="actions">
    <button class="btn edit">editar</button>
    <button class="btn delete">excluir</button>
    </div>
    `;

    card.querySelector(".edit").addEventListener("click", () => {
      editarProduto(produto.id);
    });

    card.querySelector(".delete").addEventListener("click", () => {
      deleteProduto(produto.id);
    });

    lista.appendChild(card);
  });
}

async function carregarCategorias() {
  const response = await fetch(API_CATEGORIAS);
  const categorias = await response.json();

  console.log(categorias);
  const select = document.getElementById("categoria");
  //   select.innerHTML = `<optiom value="">Selecione uma categoria</option>`;

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nome;

    // adiciona o elemento filho
    select.appendChild(option);
  });
}
async function editarProduto(id) {
  const response = await fetch(API_PRODUTOS);
  const produtos = await response.json();
  //    vai procurar na lista o id que eu passei
  const produto = produtos.find((p) => {
    return p.id === id;
  });

  console.log(produto);

  document.getElementById("nome").value = produto.nome;
  document.getElementById("descricao").value = produto.descricao;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade_estoque;
  document.getElementById("marca").value = produto.marca;
  document.getElementById("modelo").value = produto.modelo;
  document.getElementById("garantia").value = produto.garantia_meses;
  document.getElementById("categoria").value = produto.categoria_id;

  mudando = id;
}
async function deleteProduto(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  const res = await fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
  });

  carregarProdutos();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    preco: Number(document.getElementById("preco").value),
    quantidade_estoque: Number(document.getElementById("quantidade").value),
    status: 1,
    destaque: 0,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    garantia_meses: Number(document.getElementById("garantia").value),
    categoria_id: Number(document.getElementById("categoria").value),
  };

  console.log(produto);
  //aqui estamos enviando o produto para o back end
  //usando o fetch mas mudando o método
  await fetch(API_PRODUTOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });

  if (mudando) {
    await fetch(`${API_PRODUTOS}/${mudando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
  }

  form.reset();
  carregarProdutos();
});

carregarProdutos();
carregarCategorias();

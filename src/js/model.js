export const state = {
  products: [],
  favorites: [],
  search: {
    query: "",
    results: [],
  },
};

export const loadProducts = async function (query, product) {
  try {
    state.search.query = query;
    if (product) state.search.results.push(product);

    const res = await fetch(`https://www.mocky.io/v2/5d3b57023000005500a2a0a6`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { produtos } = data;

    state.products = produtos.map((data) => {
      return {
        decricaoCurta: data.decricaoCurta,
        descricaoLonga: data.descricaoLonga,
        exclusivo: data.exclusivo,
        id: data.id,
        imagem: data.imagem,
        fichaTecnica: data.fichaTecnica,
        nome: data.nome,
        promocao: data.promocao,
        valor: data.valor,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const setFullProductLocalStorage = function (dataEl) {
  if (dataEl) {
    localStorage.setItem("produtos", JSON.stringify(dataEl));
  }
};

export const getFullProductLocalStorage = function () {
  const storage = JSON.parse(localStorage.getItem("produtos"));
  return storage;
};

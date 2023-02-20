import * as model from "./model.js";
import view from "./view/view.js";
import { DATA } from "./config.js";

// Listagem de produtos a serem vendidas
const controlProductListing = async function () {
  try {
    view.renderSpinner();
    await model.loadProducts();

    view.render(model.state.products);
  } catch (err) {
    view.renderMensagemError();
  }
};

// removendo acentuação
function removerSpecials(search) {
  search = search.replace(/[ÀÁÂÃÄÅ]/, "A");
  search = search.replace(/[àáâãäå]/, "a");
  search = search.replace(/[ÈÉÊË]/, "E");
  search = search.replace(/[èéêë]/, "e");
  search = search.replace(/[Ç]/, "C");
  search = search.replace(/[ç]/, "c");

  return search.replace(/[^a-z0-9]/gi, "");
}

// Buscar um produto específico através do seu nome
const controlSearchResults = function () {
  const query = view.getQuery();

  DATA.find((data) => {
    const dataNomeNew = removerSpecials(data.nome);
    if (
      removerSpecials(dataNomeNew.toLowerCase()) ===
      removerSpecials(query.toLowerCase())
    ) {
      model.loadProducts(query, data);

      return view.render(data);
    }
  });
};

// Filtrando produtos
const controlFilterProduct = function (opt) {
  if (opt === "todos") {
    return view.render(DATA);
  }
  if (opt === "exclusivo") {
    const dataOpt = DATA.filter((data) => {
      if (data.exclusivo) return data;
    });
    return view.render(dataOpt);
  }
  if (opt === "promocao") {
    const dataOpt = DATA.filter((data) => {
      if (data.promocao) return data;
    });
    return view.render(dataOpt);
  }
};

// Renderizando produtos com mais detalhes em outra página
const controlFullProduct = function (dataset) {
  DATA.find((data) => {
    if (data.id === dataset) return model.setFullProductLocalStorage(data);
  });
};

// Salvando produtos no localStorage para serem recuperados e renderizando na página produto.html
const getDataLocalStorage = function () {
  view.renderFullProduct(model.getFullProductLocalStorage());
};

// Selecionando favoritos
const controlAddFavorites = function (dataset, clicked) {
  const dataFavorito = DATA.find((data) => {
    if (data.id === dataset) {
      model.setFullProductLocalStorage(data);
      return data;
    }
  });

  if (!dataFavorito.isFavorite) {
    dataFavorito.isFavorite = true;
  } else dataFavorito.isFavorite = false;

  view.renderButtonFavorite(dataFavorito, clicked);
};

// Estado inicial
const init = function () {
  view.addHandlerSeach(controlSearchResults);
  view.addHandlerOptions(controlFilterProduct);
  view.addHandlerFullProduct(controlFullProduct);
  view.addHandlerFavoritesPageProduct(controlAddFavorites);
  view.addHandlerFavorites(controlAddFavorites);
  controlProductListing();
  getDataLocalStorage();
};
init();

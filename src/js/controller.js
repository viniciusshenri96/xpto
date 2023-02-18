import * as model from "./model.js";
import view from "./view/view.js";

const controlSearch = async function () {
  try {
    const data = await model.controlProduct();
    // console.log(data);
    view.render(data);
    // console.log(data.nome);
  } catch (err) {
    console.log(err);
  }
};

const searchResultProduct = async function () {
  try {
    const query = view.getQuery();

    const data = await model.controlProduct();
    data.find((data) => {
      if (data.nome.toLowerCase() === query.toLowerCase())
        return view.render(data);
    });
  } catch (err) {
    console.log(err);
  }
};

const controlOption = async function (opt) {
  const data = await model.controlProduct();
  if (opt === "todos") {
    return view.render(data);
  }
  if (opt === "exclusivo") {
    const dataOpt = data.filter((data) => {
      if (data.exclusivo) return data;
    });
    return view.render(dataOpt);
  }
  if (opt === "promocao") {
    const dataOpt = data.filter((data) => {
      if (data.promocao) return data;
    });
    return view.render(dataOpt);
  }
};

const controlFullProduct = function (dataEl) {
  model.setLocalStorage(dataEl);
};

const controlAddFavorites = async function () {
  const data = await model.controlProduct();
  view.render(data);
};

const init = async function () {
  const data = await model.controlProduct();
  view.addHandleSeach(searchResultProduct);
  view.addHandleOptions(controlOption);
  view.addHadleFullProduct(controlFullProduct, data);
  view.addHandlerFavorites(controlAddFavorites, data);
  // view.default.addHandlerSeatch(controlSearch);
  controlSearch();
};
init();

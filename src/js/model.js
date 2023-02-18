export const state = {
  favoritos: [],
};

export const controlProduct = async function () {
  try {
    const res = await fetch(`http://www.mocky.io/v2/5d3b57023000005500a2a0a6`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { produtos } = data;

    return produtos;
  } catch (err) {
    throw err;
  }
};

export const setLocalStorage = function (dataEl) {
  state.favoritos.push(dataEl);
  if (dataEl) {
    localStorage.setItem("produtos", JSON.stringify(dataEl));
    // localStorage.setItem("favoritos", JSON.stringify(state.favoritos));
  }
};

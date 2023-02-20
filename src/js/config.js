import * as model from "./model.js";

await model.loadProducts();
export const DATA = model.state.products;

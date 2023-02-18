class ViewApp {
  _content = document.querySelector(".content");
  _parentEl = document.querySelector(".content__product");
  _parentForm = document.querySelector(".content__search");
  _parentProduto = document.querySelector(".product");
  _parentMenu = document.querySelector(".content__option");

  render(data) {
    const markup = ` 
      ${
        Array.isArray(data)
          ? data.map((data) => this._gerarMarkupProduct(data)).join("")
          : this._gerarMarkupProduct(data)
      }
    `;

    if (this._parentEl) {
      this._parentEl.innerHTML = "";
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
  }

  getQuery() {
    const query = this._parentForm.querySelector(".search").value;

    // this._clearInput();
    return query;
  }

  addHandleSeach(handler) {
    if (this._parentForm) {
      this._parentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
    }
  }

  addHandleOptions(handler) {
    if (this._parentMenu) {
      this._parentMenu.addEventListener("change", function (e) {
        const clickOption = e.target.value;
        console.log(clickOption);
        handler(clickOption);
      });
    }
  }

  addHadleFullProduct(handler, data) {
    if (this._parentEl) {
      this._parentEl.addEventListener("click", function (e) {
        const clicked = e.target.closest(".content__product-link");
        if (!clicked) return;
        const dataset = clicked.dataset.opt;
        if (!dataset) return;

        const dataEl = data.find((data) => {
          if (data.id === +dataset) return data;
        });

        handler(dataEl);
      });
    }
    this.load();
  }

  addHandlerFavorites(handler, data) {
    if (this._parentEl) {
      this._parentEl.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".content__favorites-box");
        if (clickedButton) {
          e.preventDefault();
          const dataset = clickedButton.dataset.opt;
          const dataEl = data.find((data) => {
            if (data.id === +dataset) return data;
          });
        }
      });
    }
  }

  load() {
    const storage = JSON.parse(localStorage.getItem("produtos"));
    if (window.location.pathname === "/produto.html") {
      const markup = `
      <div class="product__content" data-opt="">
      <div class="content__box-img">
        <img class="content__img" src="${storage.imagem}" alt="">
        <svg class="content__icon" width="26" height="24" viewBox="0 0 26 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 7C25 3.68667 22.2013 1 18.7493 1C16.1693 1 13.9533 2.50133 13 4.644C12.0467 2.50133 9.83067 1 7.24933 1C3.8 1 1 3.68667 1 7C1 16.6267 13 23 13 23C13 23 25 16.6267 25 7Z"
            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="${
          storage.exclusivo ? "content__tag-exc" : "content__tag-promo"
        }">${storage.exclusivo ? "Exclusivo" : "Promoção"}</div>
      </div>
      <div class="product__info">
        <h1 class="product__title">
        ${storage.nome}
        </h1>
        <p class="product__desc">
          ${storage.decricaoCurta}
        </p>
        <p class="product__price">${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(storage.valor)}</p>
        <div class="product__ficha">
          <h2 class="product__subtitle">FICHA TECNICA</h2>
          <ul class="product__list">

          ${storage.fichaTecnica
            .map((storage) => this._gerarFichaTecnica(storage))
            .join("")}
           
          </ul>
        </div>
      </div>
      <div class="product__description">
        <h2 class="product__subtitle">Descrição</h2>
        <p class="product__desc">
          ${storage.descricaoLonga}
        </p>
      </div>
    </div>
      
      `;
      if (this._parentProduto) {
        this._parentProduto.insertAdjacentHTML("beforeend", markup);
      }
    }
  }

  _gerarFichaTecnica(storage) {
    return `
    <li class="product__item">
      <p class="product__sub">${storage.titulo}</p>
      <p class="product__subdesc">${storage.descricao}</p>
    </li>
    
    `;
  }

  _gerarMarkupProduct(data) {
    return `
    <a href="produto.html" class="content__product-link" data-opt="${data.id}">
      <article class="content__product-box">
        <div class="content__box-img">
          <img class="content__img" src='${data.imagem}' alt="${data.nome}">
          <div class="${
            data.exclusivo ? "content__tag-exc" : "content__tag-promo"
          }">${data.exclusivo ? "Exclusivo" : "Promoção"}</div>
        </div>
        <div class="content__info-product">
          <h2 class="content__title">${data.nome}</h2>
          <p class="content__desc">
          ${data.decricaoCurta}
          </p>
          <p class="content__price">${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data.valor)}</p>
        </div>
      </article>
      <button type="button" class="content__favorites-box">
            <svg class="content__favorites-active" aria-colspan="content__favorites-icon" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
     
    </a>
    `;
  }
}

export default new ViewApp();

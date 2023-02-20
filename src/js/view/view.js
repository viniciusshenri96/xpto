class ViewApp {
  _content = document.querySelector(".content");
  _parentEl = document.querySelector(".content__product");
  _parentForm = document.querySelector(".content__search");
  _parentProduto = document.querySelector(".product");
  _parentMenu = document.querySelector(".content__option");

  // renderizando produtos

  /**
   *
   * @param {Object} data dados que vem da API para serem manipulados
   */
  render(data) {
    const markup = ` 
      ${
        Array.isArray(data)
          ? data
              .map((data, _, arr) => this._generateMarkupProduct(data, arr))
              .join("")
          : this._generateMarkupProduct(data)
      }
    `;

    if (this._parentEl) {
      this._parentEl.innerHTML = "";
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
  }

  getQuery() {
    const query = this._parentForm.querySelector(".search").value;
    return query;
  }

  /**
   * publish-subscribe pattern
   * @param {function} handler = função que vai ser chamada quando o botão ser clicado
   *
   */
  addHandlerSeach(handler) {
    if (this._parentForm) {
      this._parentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
    }
  }

  addHandlerOptions(handler) {
    if (this._parentMenu) {
      this._parentMenu.addEventListener("change", function (e) {
        const clickOption = e.target.value;
        handler(clickOption);
      });
    }
  }

  addHandlerFullProduct(handler) {
    if (this._parentEl) {
      this._parentEl.addEventListener("click", function (e) {
        const clicked = e.target.closest(".content__product-link");
        if (!clicked) return;

        const dataset = clicked.dataset.opt;
        if (!dataset) return;

        handler(+dataset);
      });
    }
  }

  addFavoritesFunction(handler, parent) {
    const userEvents = ["touchstart", "click"];

    userEvents.forEach((event) => {
      parent.addEventListener(event, function (e) {
        const clickedButton = e.target.closest(".content__favorites-box");

        if (clickedButton) {
          e.preventDefault();
          const dataset = clickedButton.dataset.opt;
          if (!dataset) return;
          handler(+dataset, clickedButton);
        }
      });
    });
  }

  addHandlerFavorites(handler) {
    if (this._parentEl) {
      this.addFavoritesFunction(handler, this._parentEl);
    }
  }

  addHandlerFavoritesPageProduct(handler) {
    if (window.location.pathname === "/produto.html") {
      this.addFavoritesFunction(handler, this._parentProduto);
    }
  }

  renderFullProduct(storage) {
    if (window.location.pathname === "/produto.html") {
      const markup = `
      <div class="product__content" data-opt="">
      <button data-opt="${
        storage.id
      }" type="button" class="content__favorites-box">
            <svg class="${
              storage.isFavorite
                ? "content__favorites-active"
                : "content__favorites"
            } " aria-colspan="content__favorites-icon" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
      <div class="content__box-img">
        <img class="content__img" src="${storage.imagem}" alt="">
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
            .map((storage) => this._generateTechnicalSheeta(storage))
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

  _generateTechnicalSheeta(storage) {
    return `
    <li class="product__item">
      <p class="product__sub">${storage.titulo}</p>
      <p class="product__subdesc">${storage.descricao}</p>
    </li>
    
    `;
  }

  _generateMarkupProduct(data) {
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
      <button data-opt="${
        data.id
      }" type="button" class="content__favorites-box">
            <svg aria-hidden='true' class="${
              data.isFavorite
                ? "content__favorites-active"
                : "content__favorites"
            }" aria-colspan="content__favorites-icon" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
    </a>
     
    `;
  }

  renderButtonFavorite(data, clicked) {
    const markup = `
    <button data-opt="${data.id}" type="button" class="content__favorites-box">
       <svg aria-hidden='true' class="${
         data.isFavorite ? "content__favorites-active" : "content__favorites"
       }" aria-colspan="content__favorites-icon" fill="none"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round"
           d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
       </svg>
     </button>
`;
    const parse = new DOMParser();
    const markupNew = parse.parseFromString(markup, "text/html");

    const btnNew = markupNew.querySelector(".content__favorites-box");

    clicked.innerHTML = "";
    clicked.innerHTML = btnNew.innerHTML;
  }

  renderSpinner() {
    const markup = ` 
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div> 
    `;

    if (this._parentEl) {
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
  }

  renderMensagemError() {
    const markup = ` 
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>Nenhum produto encontrado.</p>
      </div>
    `;

    if (this._parentEl) {
      this._parentEl.innerHTML = "";
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
  }

  renderMensagemError() {
    const markup = ` 
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>Nenhum produto encontrado.</p>
      </div>
    `;

    if (this._parentEl) {
      this._parentEl.innerHTML = "";
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
  }
}

export default new ViewApp();

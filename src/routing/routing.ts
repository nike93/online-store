import { allProducts } from './../components/templates/types';
import CartPage from '../components/cart/cart';
import DescriptionPage from '../components/description/description';
import ErrorPage from '../components/error/error';
import MainPage from '../components/main/main';
import Component from '../components/templates/components';

export const enum PagesId {
  MainPage = 'main-page',
  DescriptionPage = 'product',
  CartPage = 'cart-page',
}

class Routing {
  private defaultPageId = 'current-page';
  private container;
  constructor() {
    this.container = document.querySelector('main');
  }
  renderNewPage(hash: string, data: allProducts) {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML && currentPageHTML.childNodes[0]) {
      currentPageHTML.childNodes[0].remove();
    }
    let page: Component | null = null;

    if (hash === PagesId.MainPage || hash.length == 0) {
      page = new MainPage(data);
    } else if (
      hash.split('!')[0] === PagesId.DescriptionPage &&
      hash.split('!')[1]
    ) {
      page = new DescriptionPage(data.prod, Number(hash.split('!')[1]));
    } else if (hash === PagesId.CartPage) {
      page = new CartPage();
    } else {
      page = new ErrorPage();
    }

    if (page && this.container) {
      const pageHTML = page.render();
      this.container.id = this.defaultPageId;
      this.container.append(pageHTML);
    }
  }

  enableRouteChange(data: allProducts) {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash, data);
    });
  }

  checkLoadRouting(data: allProducts) {
    window.addEventListener('load', () => {
      const hash = window.location.hash.slice(1);
      if (hash.length > 0) {
        this.renderNewPage(hash, data);
      } else {
        window.location.hash = 'main-page';
      }
    });
  }
}

export default Routing;

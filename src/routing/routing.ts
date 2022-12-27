import { allProducts } from './../components/templates/types';
import CartPage from '../components/cart/cart';
import DescriptionPage from '../components/description/description';
import ErrorPage from '../components/error/error';
import MainPage from '../components/main/main';
import Component from '../components/templates/components';

export const enum PagesId {
  MainPage = 'main-page',
  DescriptionPage = 'description-page',
  CartPage = 'cart-page',
}

class Routing {
  private defaultPageId = 'current-page';
  private container;
  constructor(container: HTMLElement | null) {
    this.container = container;
  }
  renderNewPage(idPage: string, data: allProducts) {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML && currentPageHTML.childNodes[0]) {
      currentPageHTML.childNodes[0].remove();
    }
    let page: Component | null = null;

    if (idPage === PagesId.MainPage) {
      page = new MainPage(data);
    } else if (idPage === PagesId.DescriptionPage) {
      page = new DescriptionPage();
    } else if (idPage === PagesId.CartPage) {
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
        this.renderNewPage('main-page', data);
      }
    });
  }
}

export default Routing;

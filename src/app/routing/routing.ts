import CartPage from '../pages/cart/cart';
import DescriptionPage from '../pages/description/description';
import ErrorPage from '../pages/error/error';
import MainPage from '../pages/main/main';
import Component from '../components/templates/components';
import App from '../app';
import Query from '../query/query';
import LStorage from '../localStorage/localStorage';

export const enum PagesId {
  MainPage = 'main-page',
  DescriptionPage = 'product',
  CartPage = 'cart',
}

class Routing {
  private defaultPageId = 'current-page';
  private container;
  private statePage: string;
  constructor() {
    this.container = document.querySelector('main');
    this.statePage = '';
  }
  renderNewPage(hash: string) {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML && currentPageHTML.childNodes[0]) {
      currentPageHTML.childNodes[0].remove();
    }
    let page: Component | null = null;

    if (hash === PagesId.MainPage) {
      page = new MainPage();
    } else if (
      hash.split('!')[0] === PagesId.DescriptionPage &&
      hash.split('!')[1] &&
      App.data.prod[+hash.split('!')[1] - 1]
    ) {
      page = new DescriptionPage(App.data.prod, Number(hash.split('!')[1]));
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

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1).split('?')[0];
      if (this.checkIsSamePage(hash)) {
        return;
      }
      if (!hash) {
        window.location.hash = 'main-page';
      }
      this.renderNewPage(hash);
      this.statePage = hash;
    });
  }

  checkLoadRouting() {
    window.addEventListener('load', () => {
      const hash = window.location.hash.slice(1).split('?')[0];
      LStorage.getLocalStorage();
      App.header.reloadHeader();
      Query.readQueryString(window.location.hash);

      if (hash.length > 0) {
        this.renderNewPage(hash);
      } else {
        window.location.hash = 'main-page';
      }
      this.statePage = hash;
    });

    window.addEventListener('beforeunload', LStorage.setLocalStorage);
  }
  checkIsSamePage(hash: string) {
    return this.statePage == hash;
  }
}

export default Routing;

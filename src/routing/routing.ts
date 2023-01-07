import CartPage from '../components/cart/cart';
import DescriptionPage from '../components/description/description';
import ErrorPage from '../components/error/error';
import MainPage from '../components/main/main';
import Component from '../components/templates/components';
import App from '../app/app';

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
    // console.log(this.statePage);
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML && currentPageHTML.childNodes[0]) {
      currentPageHTML.childNodes[0].remove();
    }
    let page: Component | null = null;

    if (hash === PagesId.MainPage) {
      page = new MainPage();
    } else if (
      hash.split('!')[0] === PagesId.DescriptionPage &&
      hash.split('!')[1]
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

      if (hash.length > 0) {
        this.renderNewPage(hash);
      } else {
        window.location.hash = 'main-page';
      }
      this.statePage = hash;
    });
  }
  checkIsSamePage(hash: string) {
    return this.statePage == hash;
  }
}

export default Routing;

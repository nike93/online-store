import App from '../../app';
import Query from '../../query/query';
import Component from '../../components/templates/components';
import CartPage from './cart';

class Pagination extends Component {
  constructor() {
    super('div', 'cart-list__header');
  }

  renderTitle(): HTMLElement {
    const title = document.createElement('span');
    title.classList.add('cart-list__title');
    title.textContent = 'Products in cart';
    return title;
  }

  renderPaginationControl(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('pagination');
    container.append(this.renderLimit(), this.renderPage());
    return container;
  }

  renderLimit(): HTMLElement {
    this.isStateLimitExist();
    const limitN = App.state.pagination.limit;
    const limit = document.createElement('div');
    limit.classList.add('pagination__limit');
    const text = document.createElement('span');
    text.textContent = 'LIMIT: ';
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.value = String(limitN);
    input.max = String(App.state.cart.items.length);
    input.addEventListener('change', () => this.setLimit(+input.value));
    limit.append(text, input);
    return limit;
  }

  setLimit(val: number): void {
    this.checkInvalidPage(val);
    App.state.pagination.limit = val;
    CartPage.loadPage();
    Query.addToHash('limit', String(val));
  }

  checkInvalidPage(limit?: number): void {
    if (!limit) {
      limit = App.state.pagination.limit || 1;
    }
    const page = App.state.pagination.page;
    const lastAvailablePage = Math.ceil(App.state.cart.items.length / limit);
    if (page && page > lastAvailablePage) {
      App.state.pagination.page = lastAvailablePage;
    }
  }

  isStatePageExist(): void {
    const page = App.state.pagination.page;
    if (!page) {
      App.state.pagination.page = 1;
    }
  }

  isStateLimitExist(): void {
    const limit = App.state.pagination.limit;
    if (!limit || limit > App.state.cart.items.length) {
      App.state.pagination.limit = App.state.cart.items.length;
    }
  }

  changePage(num: number): void {
    const limit = App.state.pagination.limit;
    if (
      (limit && num > Math.ceil(App.state.cart.items.length / limit)) ||
      num == 0
    ) {
      return;
    }
    App.state.pagination.page = num;
    Query.addToHash('page', String(num));
    CartPage.loadPage();
  }

  renderPage(): HTMLElement {
    const pageN = App.state.pagination.page || 1;
    const page = document.createElement('div');
    page.classList.add('pagination__page');
    const text = document.createElement('span');
    text.textContent = 'PAGE: ';
    const prevBTN = document.createElement('button');
    prevBTN.textContent = '<';
    const nextBTN = document.createElement('button');
    nextBTN.textContent = '>';
    const pageNumber = document.createElement('span');
    pageNumber.classList.add('pagination__page-number');
    pageNumber.textContent = String(pageN);
    page.append(text, prevBTN, pageNumber, nextBTN);

    prevBTN.addEventListener('click', () => this.changePage(pageN - 1));
    nextBTN.addEventListener('click', () => this.changePage(pageN + 1));
    return page;
  }

  render(): HTMLElement {
    this.checkInvalidPage();
    this.container.innerHTML = '';
    this.container.append(this.renderTitle(), this.renderPaginationControl());
    return this.container;
  }
}
export default Pagination;

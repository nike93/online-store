import Component from '../../components/templates/components';
import { PagesId } from '../../routing/routing';
import App from '../../app/app';

class Header extends Component {
  priceSumHTML: HTMLElement;
  totalItemsHTML: HTMLElement;
  constructor() {
    super('div', 'header__wrapper', 'header');
    this.priceSumHTML = document.createElement('span');
    this.totalItemsHTML = document.createElement('div');
  }

  renderLogoBlock() {
    const container = document.createElement('div');
    container.classList.add('header__brand');
    const brandName = document.createElement('h1');
    brandName.innerText = 'Online Store';
    brandName.classList.add('header__brand-name');
    const logo = document.createElement('div');
    logo.classList.add('header__brand-logo', 'logo');
    container.append(logo, brandName);
    container.addEventListener('click', () => {
      window.location.hash = `#${PagesId.MainPage}`;
    });
    return container;
  }

  renderPriceBlock() {
    const container = document.createElement('div');
    container.classList.add('header__price');
    const priceTitle = document.createElement('span');
    priceTitle.innerText = 'Cart total:';
    priceTitle.classList.add('header__price-title');
    this.priceSumHTML.classList.add('header__price-sum');
    container.append(priceTitle, this.priceSumHTML);

    return container;
  }

  renderCartBlock() {
    const container = document.createElement('div');
    container.classList.add('header__cart');
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('header__total-container');
    this.totalItemsHTML.classList.add('header__total-items');
    totalContainer.append(this.totalItemsHTML);
    container.append(totalContainer);
    container.addEventListener('click', () => {
      window.location.hash = `#${PagesId.CartPage}`;
    });
    return container;
  }

  protected createHeader() {
    this.container.classList.add('wrapper');

    const headerTitle = this.renderLogoBlock();
    const totalPrice = this.renderPriceBlock();
    const cart = this.renderCartBlock();

    this.container.append(headerTitle, totalPrice, cart);
  }

  reloadHeader() {
    this.totalItemsHTML.innerText = String(
      App.state.cart.items.reduce((a, b) => a + b.qty, 0)
    );
    this.priceSumHTML.innerText = `$${App.state.cart.items.reduce(
      (a, b) => a + b.prod.price * b.qty,
      0
    )}`;
  }

  render() {
    this.createHeader();
    this.reloadHeader();
    return this.container;
  }
}

export default Header;

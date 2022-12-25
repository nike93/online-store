import Component from '../../components/templates/components';
import { PagesId } from '../../routing/routing';

class Header extends Component {
  priceSumHTML: HTMLElement;
  totalItemsHTML: HTMLElement;
  x: number;
  constructor() {
    super('div', 'header__wrapper', 'header');
    this.priceSumHTML = document.createElement('span');
    this.totalItemsHTML = document.createElement('div');
    this.x = 23;
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
    this.priceSumHTML.innerText = '$1234';
    container.append(priceTitle, this.priceSumHTML);

    return container;
  }

  renderCartBlock() {
    const container = document.createElement('div');
    container.classList.add('header__cart');
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('header__total-container');
    this.totalItemsHTML.classList.add('header__total-items');
    this.totalItemsHTML.innerText = String(this.x);
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

  render() {
    this.createHeader();
    return this.container;
  }
}

export default Header;

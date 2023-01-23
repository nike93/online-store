import { ProductItem } from '../../../../components/templates/types';
import Component from '../../../../components/templates/components';
import App from '../../../../app';
import CartPage from '../../../cart/cart';

class ItemMain extends Component {
  product: ProductItem;

  constructor(product: ProductItem) {
    super('div', 'main-item');
    this.product = product;
  }

  renderGridCards(): void {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('main-item__wrapper');
    const itemImg = document.createElement('div');
    itemImg.classList.add('main-item__image');
    itemImg.style.backgroundImage = `url('${this.product.thumbnail}')`;
    itemImg.addEventListener('click', () => {
      window.location.hash = `#product!${this.product.id}`;
    });

    const description = document.createElement('div');
    description.classList.add('main-item__description');

    const title = document.createElement('span');
    title.classList.add('main-item__title');
    title.textContent = this.product.title;
    const category = document.createElement('span');
    category.classList.add('main-item__category');
    category.textContent = `Category: ${this.product.category}`;
    const brand = document.createElement('span');
    brand.classList.add('main-item__brand');
    brand.textContent = `Brand: ${this.product.brand}`;
    description.append(title, category, brand);

    const itemBottom = document.createElement('div');
    itemBottom.classList.add('main-item__bottom');
    const itemPrice = document.createElement('span');
    itemPrice.classList.add('main-item__price');
    itemPrice.textContent = `${this.product.price}$`;
    const itemBTN = document.createElement('button');
    itemBTN.classList.add('main-item__button', 'button');
    this.checkInCart(itemBTN);
    itemBottom.append(itemPrice, itemBTN);

    itemWrapper.append(itemImg, description, itemBottom);
    if (App.state.view === 'list') {
      this.container.classList.add('list');
    }
    this.container.append(itemWrapper);
  }

  addToCart(e: Event): void {
    CartPage.addItemtoCart(this.product);
    App.header.reloadHeader();
    (e.target as HTMLElement).textContent = 'drop from cart';
    (e.target as HTMLElement).classList.add('active');
    e.target?.addEventListener(
      'click',
      (e) => {
        this.removeFromCart(e);
      },
      { once: true },
    );
  }

  removeFromCart(e: Event): void {
    CartPage.removeItemFromCart(this.product);
    App.header.reloadHeader();
    (e.target as HTMLElement).textContent = 'add to cart';
    (e.target as HTMLElement).classList.remove('active');
    e.target?.addEventListener(
      'click',
      (e) => {
        this.addToCart(e);
      },
      { once: true },
    );
  }

  checkInCart(element: HTMLElement): void {
    const isInCart: number = App.state.cart.items.filter(
      (el) => el.prod.id == this.product.id,
    ).length;
    if (isInCart > 0) {
      element.textContent = 'drop from cart';
      element.classList.add('active');
      element.addEventListener(
        'click',
        (e) => {
          this.removeFromCart(e);
        },
        { once: true },
      );
    } else {
      element.textContent = 'add to cart';
      element.classList.remove('active');
      element.addEventListener(
        'click',
        (e) => {
          this.addToCart(e);
        },
        { once: true },
      );
    }
  }

  render(): HTMLElement {
    this.renderGridCards();

    return this.container;
  }
}
export default ItemMain;

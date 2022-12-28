import { productItem, state } from './../../../templates/types';
import Component from '../../../templates/components';

class ItemMain extends Component {
  product: productItem;
  state: state;
  constructor(product: productItem, state: state) {
    super('div', 'main-item');
    this.product = product;
    this.state = state;
  }

  renderGridCards() {
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
    itemBTN.textContent = 'add to cart';
    itemBottom.append(itemPrice, itemBTN);

    itemWrapper.append(itemImg, description, itemBottom);
    if (this.state.view === 'list') {
      this.container.classList.add('list');
    }
    this.container.append(itemWrapper);
  }

  render() {
    this.renderGridCards();

    return this.container;
  }
}
export default ItemMain;

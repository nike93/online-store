import { productItem } from './../../../templates/types';
import Component from '../../../templates/components';

class ItemMain extends Component {
  product: productItem;
  constructor(product: productItem) {
    super('div', 'main-item');
    this.product = product;
  }

  renderStaticInfo() {
    return `
    <span class="main-item__title">${this.product.title}</span>
    <span class="main-item__category">Category: ${this.product.category}</span>
    <span class="main-item__brand">Brand: ${this.product.brand}</span>`;
  }

  render() {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('main-item__wrapper');
    const itemImg = document.createElement('div');
    itemImg.classList.add('main-item__image');
    itemImg.style.backgroundImage = `url('${this.product.thumbnail}')`;
    itemWrapper.innerHTML = this.renderStaticInfo();
    itemWrapper.prepend(itemImg);

    const itemBottom = document.createElement('div');
    itemBottom.classList.add('main-item__bottom');
    const itemPrice = document.createElement('span');
    itemPrice.classList.add('main-price');
    itemPrice.textContent = String(this.product.price);
    const itemBTN = document.createElement('button');
    itemBTN.classList.add('main-item__button', 'button');
    itemBTN.textContent = 'add to cart';
    itemBottom.append(itemPrice, itemBTN);

    itemWrapper.append(itemBottom);

    this.container.append(itemWrapper);
    return this.container;
  }
}
export default ItemMain;

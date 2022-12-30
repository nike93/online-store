import { cartItem } from './../templates/types';
import Component from '../templates/components';
import App from '../../app/app';
import CartPage from './cart';
// import App from '../../app/app';

class CartItem extends Component {
  cartItem: cartItem;
  index: number;
  price: HTMLElement;
  qty: HTMLElement;
  constructor(cartItem: cartItem, index: number) {
    super('div', 'cart-item');
    this.cartItem = cartItem;
    this.index = index;
    this.price = document.createElement('span');
    this.qty = document.createElement('span');
  }

  renderCartItemInfo() {
    return `
    <div class="cart-item__position">${this.index + 1}</div>
    <div class="cart-item__info">
    <img src="${
      this.cartItem.prod.thumbnail
    }" alt="product" class="cart-item__image" />
    <div class="cart-item__details">
      <div class="cart-item__title">${this.cartItem.prod.title}</div>
      <div class="cart-item__description">${
        this.cartItem.prod.description
      }</div>
      <div class="cart-item__statistic">
        <span>Rating: ${this.cartItem.prod.rating}</span>
        <span>Discount: ${this.cartItem.prod.discountPercentage}%</span>
      </div>
    </div>
  </div>
    `;
  }

  renderControlQty() {
    const container = document.createElement('div');
    container.classList.add('cart-item__control');
    const plusBTN = document.createElement('button');
    plusBTN.classList.add('cart-item__plus');
    plusBTN.addEventListener('click', () => {
      this.addOneItem();
    });
    plusBTN.textContent = '+';
    const minusBTN = document.createElement('button');
    minusBTN.classList.add('cart-item__minus');
    minusBTN.textContent = '-';
    minusBTN.addEventListener('click', () => {
      this.removeOneItem();
    });
    this.qty.classList.add('cart-item__qty');
    this.qty.textContent = String(this.cartItem.qty);
    container.append(minusBTN, this.qty, plusBTN);
    return container;
  }

  renderQtyBlock() {
    const container = document.createElement('div');
    container.classList.add('cart-item__navigation');

    const stock = document.createElement('div');
    stock.classList.add('cart-item__stock');
    stock.textContent = `Stock: ` + String(this.cartItem.prod.stock);

    const control = this.renderControlQty();

    this.price.classList.add('cart-item__price');
    this.price.textContent =
      String(this.cartItem.prod.price * this.cartItem.qty) + '$';

    container.append(stock, control, this.price);
    return container;
  }

  addOneItem() {
    this.cartItem.qty++;
    CartPage.loadPage();
    App.header.reloadHeader();
    console.log(App.state.cart.items);
    console.log(this.index);
  }

  removeOneItem() {
    this.cartItem.qty--;
    console.log(App.state.cart.items);
    console.log(this.cartItem);
    let index;
    if (this.cartItem.qty == 0) {
      index = App.state.cart.items.indexOf(this.cartItem);
      console.log(index);
      App.state.cart.items.splice(index, 1);
    }
    CartPage.loadPage();

    App.header.reloadHeader();
  }

  render() {
    this.container.innerHTML = this.renderCartItemInfo();
    this.container.append(this.renderQtyBlock());
    return this.container;
  }
}
export default CartItem;

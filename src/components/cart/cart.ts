import { cartItem, productItem } from './../templates/types';
import Component from '../templates/components';
import CartList from './cartList';
import Summary from './summary';
import App from '../../app/app';

class CartPage extends Component {
  static cartList: CartList;
  static container: HTMLElement;
  constructor() {
    super('div', 'cart', 'cart-page');
    CartPage.cartList = new CartList();
    CartPage.container = this.container;
  }

  static addItemtoCart(item: productItem) {
    const newItem: cartItem = { prod: item, qty: 1 };
    App.state.cart.items.push(newItem);
    App.state.pagination.limit = App.state.cart.items.length;
  }

  static removeItemFromCart(item: productItem) {
    const goods = App.state.cart.items;
    goods.forEach((el, ind) => {
      if (el.prod.id == item.id) {
        goods.splice(ind, 1);
      }
    });
    App.state.pagination.limit = App.state.cart.items.length;
  }

  static emptyCartDom() {
    const div = document.createElement('div');
    div.classList.add('cart__empty');
    div.textContent = 'Cart is Empty';
    return div;
  }

  static loadPage() {
    CartPage.container.innerHTML = '';
    if (App.state.cart.items.length == 0) {
      CartPage.container.append(CartPage.emptyCartDom());
    } else {
      CartPage.container.append(CartPage.cartList.render());
      CartPage.container.append(new Summary().render());
    }
  }

  render() {
    CartPage.container.classList.add('wrapper');
    CartPage.loadPage();
    return CartPage.container;
  }
}

export default CartPage;

import { state, productItem, cartItem } from './../templates/types';
import Component from '../templates/components';

class CartPage extends Component {
  state: state;

  constructor(state: state) {
    super('div', 'cart', 'cart-page');
    this.state = state;
  }

  addItemtoCart(item: productItem) {
    const newItem: cartItem = { prod: item, qty: 1 };
    this.state.cart.items.push(newItem);
  }
  render() {
    this.container.textContent = 'CART PAGE';
    this.container.classList.add('wrapper');
    return this.container;
  }
}

export default CartPage;

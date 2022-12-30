import Component from '../templates/components';
import CartItem from './cartItem';
import App from '../../app/app';

class CartList extends Component {
  constructor() {
    super('div', 'cart__list');
  }
  //   rerender() {
  //     console.log(this.render());
  //   }
  //   makeCards() {
  //     const fragment: DocumentFragment =document.createDocumentFragment()
  //   }
  render() {
    this.container.innerHTML = '';
    App.state.cart.items.map((el, ind) =>
      this.container.append(new CartItem(el, ind).render())
    );
    return this.container;
  }
}
export default CartList;

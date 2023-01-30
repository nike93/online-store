import Component from '../../components/templates/components';
import CartItem from './cartItem';
import App from '../../app';
import Pagination from './pagination';

class CartList extends Component {
  pagination: Pagination;
  list: HTMLElement;
  constructor() {
    super('div', 'cart-list');
    this.pagination = new Pagination();
    this.list = document.createElement('div');
  }

  renderItems() {
    const page = App.state.pagination.page || 1;
    const limit = App.state.pagination.limit || App.state.cart.items.length;
    this.list.innerHTML = '';
    this.list.classList.add('cart-list__items');
    App.state.cart.items.map((el, ind) => {
      if (ind + 1 > (page - 1) * limit && ind < page * limit) {
        this.list.append(new CartItem(el, ind).render());
      }
    });
    return this.list;
  }

  render() {
    this.container.innerHTML = '';
    this.container.append(this.pagination.render());
    this.renderItems();
    this.container.append(this.list);
    return this.container;
  }
}
export default CartList;

import { productItem, state } from './../../templates/types';
import Component from '../../templates/components';
import ItemMain from './itemMain/itemMain';

class ItemsList extends Component {
  products: productItem[];
  state: state;

  constructor(products: productItem[], state: state) {
    super('div', 'main__prod-list');
    this.products = products;
    this.state = state;
  }

  render() {
    this.products.forEach((el) => {
      this.container.append(new ItemMain(el, this.state).render());
    });
    return this.container;
  }
}
export default ItemsList;

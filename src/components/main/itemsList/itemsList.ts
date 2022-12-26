import { productItem } from './../../templates/types';
import Component from '../../templates/components';
import ItemMain from './itemMain/itemMain';

class ItemsList extends Component {
  products: productItem[];

  constructor(products: productItem[]) {
    super('div', 'main__prod-list');
    this.products = products;
  }

  render() {
    this.products.forEach((el) => {
      this.container.append(new ItemMain(el).render());
    });
    return this.container;
  }
}
export default ItemsList;

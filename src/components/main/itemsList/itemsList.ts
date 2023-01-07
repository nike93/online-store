import { productItem } from './../../templates/types';
import Component from '../../templates/components';
import ItemMain from './itemMain/itemMain';
import FiltrationLogic from '../filters/filtrationLogic';
import App from '../../../app/app';

class ItemsList extends Component {
  products: productItem[];

  constructor() {
    super('div', 'main__prod-list');
    this.products = FiltrationLogic.filterDataCheckbox(App.data.prod);
  }
  isEmptyList() {
    if (this.products.length == 0)
      this.container.innerHTML = `<div class="main__empty">Products were not found, try to change search settings.</div>`;
  }

  render() {
    this.isEmptyList();
    this.products.forEach((el) => {
      this.container.append(new ItemMain(el).render());
    });
    return this.container;
  }
}
export default ItemsList;

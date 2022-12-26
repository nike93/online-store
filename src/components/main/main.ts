import { allProducts } from './../templates/types';
import Component from '../../components/templates/components';
import data from '../../data.json';
import ItemsList from './itemsList/itemsList';
import Filters from './filters/filters';

class MainPage extends Component {
  static TextObject = {
    MainTitle: 'Main Page',
  };
  data: allProducts;

  constructor() {
    super('div', 'main__wrapper', 'main-page');
    this.data = data;
  }

  render() {
    this.container.classList.add('wrapper');
    this.container.append(new Filters().render());
    this.container.append(new ItemsList(data.prod).render());
    return this.container;
  }
}
export default MainPage;

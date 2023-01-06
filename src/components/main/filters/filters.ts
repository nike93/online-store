import Component from '../../../components/templates/components';
import CheckFilters from './checkFilters';

class Filters extends Component {
  brandFilters: CheckFilters;
  categoryFilters: CheckFilters;

  static TextObject = {
    MainTitle: 'Filters',
  };

  constructor() {
    super('div', 'filters');
    this.brandFilters = new CheckFilters('brand');
    this.categoryFilters = new CheckFilters('category');
  }

  render() {
    const title = this.createTitle(Filters.TextObject.MainTitle);
    this.container.append(
      title,
      this.categoryFilters.render(),
      this.brandFilters.render()
    );
    return this.container;
  }
}
export default Filters;

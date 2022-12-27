import Component from '../../../components/templates/components';

class Filters extends Component {
  static TextObject = {
    MainTitle: 'Filters',
  };

  constructor() {
    super('div', 'filters');
  }

  render() {
    const title = this.createTitle(Filters.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
export default Filters;

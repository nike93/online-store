import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Routing from '../routing/routing';
import data from '../data.json';
import { allProducts, state } from './../components/templates/types';

class App {
  static header: Header;
  static state: state;
  static data: allProducts;
  private footer: Footer;
  private routing: Routing;

  constructor() {
    App.state = {
      view: 'grid',
      cart: { items: [] },
      appliedCuppons: [],
      pagination: {},
      filters: {
        checkboxes: {},
        search: '',
        range: {},
      },
    };
    App.header = new Header();
    this.footer = new Footer();
    this.routing = new Routing();
    App.data = data;
  }

  run() {
    App.state.cart.items.push({ prod: App.data.prod[1], qty: 1 });
    App.state.cart.items.push({ prod: App.data.prod[2], qty: 1 });
    App.state.cart.items.push({ prod: App.data.prod[3], qty: 1 });
    App.state.cart.items.push({ prod: App.data.prod[4], qty: 1 });
    App.state.cart.items.push({ prod: App.data.prod[5], qty: 1 });
    App.state.cart.items.push({ prod: App.data.prod[6], qty: 1 });
    const headerDOM = document.querySelector('header');
    const footerDOM = document.querySelector('footer');
    const headerHTML = App.header.render();
    const footerHTML = this.footer.render();
    this.routing.enableRouteChange();
    this.routing.checkLoadRouting();
    if (headerDOM && footerDOM) {
      headerDOM.append(headerHTML);
      footerDOM.append(footerHTML);
    }
  }
}
('');

export default App;

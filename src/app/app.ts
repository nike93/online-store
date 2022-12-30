import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Routing from '../routing/routing';
import data from '../data.json';
import { allProducts, state } from './../components/templates/types';

class App {
  static header: Header;
  private footer: Footer;
  private routing: Routing;
  data: allProducts;
  static state: state;

  constructor() {
    App.state = {
      view: 'grid',
      cart: { items: [] },
    };
    App.header = new Header();
    this.footer = new Footer();
    this.routing = new Routing();
    this.data = data;
  }

  run() {
    const headerDOM = document.querySelector('header');
    const footerDOM = document.querySelector('footer');
    const headerHTML = App.header.render();
    const footerHTML = this.footer.render();
    this.routing.enableRouteChange(this.data);
    this.routing.checkLoadRouting(this.data);
    if (headerDOM && footerDOM) {
      headerDOM.append(headerHTML);
      footerDOM.append(footerHTML);
    }
  }
}
('');

export default App;

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Routing from '../routing/routing';
import data from '../data.json';
import { allProducts, state } from './../components/templates/types';

class App {
  private headerDOM: HTMLElement | null;
  private mainDOM: HTMLElement | null;
  private footerDOM: HTMLElement | null;
  private header: Header;
  private footer: Footer;
  private routing: Routing;
  data: allProducts;
  state: state;

  constructor() {
    this.headerDOM = document.querySelector('header');
    this.mainDOM = document.querySelector('main');
    this.footerDOM = document.querySelector('footer');
    this.header = new Header();
    this.footer = new Footer();
    this.routing = new Routing(this.mainDOM);
    this.data = data;
    this.state = {
      view: 'grid',
      cart: { items: [], totalSum: 0, totalProducts: 0 },
    };
  }

  run() {
    const headerHTML = this.header.render();
    const footerHTML = this.footer.render();
    this.routing.enableRouteChange(this.data, this.state);
    this.routing.checkLoadRouting(this.data, this.state);
    if (this.headerDOM && this.footerDOM) {
      this.headerDOM.append(headerHTML);
      this.footerDOM.append(footerHTML);
    }
  }
}
('');

export default App;

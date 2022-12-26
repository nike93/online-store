import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Routing from '../routing/routing';
import data from '../data.json';
import { allProducts } from './../components/templates/types';

class App {
  private headerDOM: HTMLElement | null;
  private mainDOM: HTMLElement | null;
  private footerDOM: HTMLElement | null;
  private header: Header;
  private footer: Footer;
  private routing: Routing;
  data: allProducts;

  constructor() {
    this.headerDOM = document.querySelector('header');
    this.mainDOM = document.querySelector('main');
    this.footerDOM = document.querySelector('footer');
    this.header = new Header();
    this.footer = new Footer();
    this.routing = new Routing(this.mainDOM);
    this.data = data;
  }

  run() {
    const headerHTML = this.header.render();
    const footerHTML = this.footer.render();
    this.routing.enableRouteChange(this.data);
    this.routing.checkLoadRouting(this.data);
    if (this.headerDOM && this.footerDOM) {
      this.headerDOM.append(headerHTML);
      this.footerDOM.append(footerHTML);
    }
  }
}

export default App;

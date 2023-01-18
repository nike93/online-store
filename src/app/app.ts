import Footer from './components/footer/footer';
import Header from './components/header/header';
import Routing from './routing/routing';
import data from '../data/data.json';
import { allProducts, state } from './components/templates/types';
import { crosscheckDescription } from '../crosscheckDescription';
import { State } from './state/state';

class App {
  static header: Header;
  static state: state;
  static data: allProducts;
  private footer: Footer;
  private routing: Routing;

  constructor() {
    App.data = data;
    App.state = State;
    App.header = new Header();
    this.footer = new Footer();
    this.routing = new Routing();
  }

  run() {
    console.log(crosscheckDescription);
    const headerDOM = document.querySelector('header');
    const footerDOM = document.querySelector('footer');
    const headerHTML = App.header.render();
    const footerHTML = this.footer.render();
    this.routing.checkLoadRouting();
    this.routing.enableRouteChange();
    if (headerDOM && footerDOM) {
      headerDOM.append(headerHTML);
      footerDOM.append(footerHTML);
    }
  }
}

export default App;

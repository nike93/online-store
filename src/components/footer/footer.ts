import Component from "../../components/templates/components";

class Footer extends Component {
  static TextObject = {
    MainTitle: "Footer",
  };

  constructor() {
    super("div", "footer__wrapper", "footer");
  }

  render() {
    const title = this.createTitle(Footer.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default Footer;

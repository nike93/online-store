import Component from "../../components/templates/components";

class MainPage extends Component {
  static TextObject = {
    MainTitle: "Main Page",
  };

  constructor() {
    super("div", "main__wrapper", "main-page");
  }

  render() {
    const title = this.createTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
export default MainPage;

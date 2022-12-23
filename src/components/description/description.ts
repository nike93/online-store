import Component from "../../components/templates/components";

class DescriptionPage extends Component {
  static TextObject = {
    MainTitle: "Description Page",
  };

  constructor() {
    super("div", "description", "description-page");
  }

  render() {
    const title = this.createTitle(DescriptionPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default DescriptionPage;

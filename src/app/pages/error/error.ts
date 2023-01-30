import Component from "../../components/templates/components";

class ErrorPage extends Component {
  private errorType: string;

  static TextObject: { [prop: string]: string } = {
    "404": "Error! The page was not found :(",
  };

  constructor() {
    super("div", "error__wrapper", "error-page");
    this.errorType = "404";
  }

  render(): HTMLElement {
    const title = this.createTitle(ErrorPage.TextObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;

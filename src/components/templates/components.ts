abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string, id: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
    this.container.id = id;
  }

  protected createTitle(text: string) {
    const title = document.createElement('h1');
    title.innerText = text;
    return title;
  }

  render() {
    return this.container;
  }
}

export default Component;

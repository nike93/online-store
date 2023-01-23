import App from '../../../app';
import MainPage from '../main';

class ResetButtons {
  container: HTMLElement;
  buttonReset: HTMLButtonElement;
  buttonCopy: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div');
    this.buttonReset = document.createElement('button');
    this.buttonCopy = document.createElement('button');
  }

  createButtons(): void {
    this.buttonReset.classList.add('reset-btn');
    this.buttonReset.innerText = 'Reset Filters';

    this.buttonCopy.classList.add('copy-btn');
    this.buttonCopy.innerText = 'Copy Link';

    this.buttonCopy.addEventListener('click', () => this.copyLink());
    this.buttonReset.addEventListener('click', () => {
      ResetButtons.resetFilters();
      MainPage.rerender();
    });

    this.container.append(this.buttonReset, this.buttonCopy);
  }

  copyLink(): void {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        this.buttonCopy.innerText = 'Copied!';
        setTimeout(() => (this.buttonCopy.innerText = 'Copy Link'), 1500);
      })
      .catch(() => {
        this.buttonCopy.innerText = 'Error!';
        setTimeout(() => (this.buttonCopy.innerText = 'Copy Link'), 1500);
      });
  }

  static resetFilters(): void {
    App.state.filters.checkboxes = {};
    App.state.filters.search = '';
    App.state.filters.range = {};
    App.state.filters.sorting = '';
    App.state.filters.filteredData = structuredClone(App.data.prod);
    window.location.hash = 'main-page';
  }

  render(): HTMLElement {
    this.container.classList.add('total-reset');
    this.createButtons();
    return this.container;
  }
}

export default ResetButtons;

import {
  GIT_NIKE93_LINK,
  GIT_TOP_LINK,
  RS_LINK,
  RS_LOGO,
  GIT_LOGO,
} from './../../../data/constants';
import Component from '../../components/templates/components';

class Footer extends Component {
  constructor() {
    super('div', 'footer__wrapper', 'footer');
  }

  gitHubLinks(): void {
    const gitLinksContainer = document.createElement('div');
    gitLinksContainer.classList.add('footer__git');

    const gitItemOne = document.createElement('a');
    gitItemOne.innerText = 'nike93';
    gitItemOne.href = GIT_NIKE93_LINK;
    gitLinksContainer.append(gitItemOne);

    const gitImg = document.createElement('img');
    gitImg.classList.add('git-logo');
    gitImg.src = GIT_LOGO;

    gitLinksContainer.append(gitImg);

    const gitItemTwo = document.createElement('a');
    gitItemTwo.innerText = 'top-aleksei';
    gitItemTwo.href = GIT_TOP_LINK;
    gitLinksContainer.append(gitItemTwo);

    this.container.append(gitLinksContainer);
  }

  createYear() {
    const year = document.createElement('p');
    const date = new Date();
    year.innerText = String(date.getFullYear());
    return year;
  }

  rsLinks(): void {
    const rsLinksContainer = document.createElement('div');

    const rsLink = document.createElement('a');
    rsLink.classList.add('rs-link');
    rsLink.href = RS_LINK;

    const rsImg = document.createElement('img');
    rsImg.classList.add('rs-logo');
    rsImg.src = RS_LOGO;
    rsLink.append(rsImg);
    rsLinksContainer.append(rsLink);

    this.container.append(rsLinksContainer);
  }

  render(): HTMLElement {
    this.gitHubLinks();
    this.container.append(this.createYear());
    this.rsLinks();
    this.container.classList.add('wrapper');
    return this.container;
  }
}

export default Footer;

import Component from '../../components/templates/components';

class Footer extends Component {
  constructor() {
    super('div', 'footer__wrapper', 'footer');
  }

  gitHubLinks() {
    const gitLinksContainer = document.createElement('div');
    gitLinksContainer.classList.add('footer__git');

    const gitItemOne = document.createElement('a');
    gitItemOne.innerText = 'nike93';
    gitItemOne.href = 'https://github.com/nike93';
    gitLinksContainer.append(gitItemOne);

    const gitImg = document.createElement('img');
    gitImg.classList.add('git-logo');
    //gitImg.src = '../../img/git-logo.png';
    gitImg.src =
      'https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo-768x432.png';
    gitLinksContainer.append(gitImg);

    const gitItemTwo = document.createElement('a');
    gitItemTwo.innerText = 'top-aleksei';
    gitItemTwo.href = 'https://github.com/top-aleksei';
    gitLinksContainer.append(gitItemTwo);

    this.container.append(gitLinksContainer);
  }

  rsLinks() {
    const rsLinksContainer = document.createElement('div');

    const rsLink = document.createElement('a');
    rsLink.classList.add('rs-link');
    rsLink.href = 'https://rs.school/js/';

    const rsImg = document.createElement('img');
    rsImg.classList.add('rs-logo');
    //gitImg.src = '../../img/git-logo.png';
    rsImg.src = 'https://rollingscopes.com/images/logo_rs_text.svg';
    rsLink.append(rsImg);
    rsLinksContainer.append(rsLink);

    this.container.append(rsLinksContainer);
  }

  render() {
    this.gitHubLinks();
    const year = document.createElement('p');
    year.innerText = '2023';
    this.container.append(year);
    this.rsLinks();
    this.container.classList.add('wrapper');
    return this.container;
  }
}

export default Footer;

import { productItem } from './../components/templates/types';
import App from '../app/app';

class Query {
  static addToHash(name: string, value: number) {
    const hash = window.location.hash;
    const page = hash.slice(1).split('?')[0];
    if (hash.indexOf('?') == -1) {
      window.location.hash += '?';
    }
    const queryString = window.location.hash.split('?')[1];
    if (queryString.includes(name)) {
      const query = queryString.split('&');
      query.map((el, ind) => {
        if (el.includes(name)) {
          query.splice(ind, 1, `${name}=${value}`);
        }
      });
      window.location.hash = [page, query.join('&')].join('?');
    } else {
      const newQuery = queryString ? `&${name}=${value}` : `${name}=${value}`;
      window.location.hash += newQuery;
    }
  }

  static addCheckBoxesToHash() {
    const hash = window.location.hash;
    const page = hash.slice(1).split('?')[0];
    if (hash.indexOf('?') == -1) {
      window.location.hash += '?';
    }
    const queryString = window.location.hash.split('?')[1];

    const query = queryString.split('&');
    for (const key of Object.keys(App.state.filters.checkboxes)) {
      const stateFilter =
        App.state.filters.checkboxes[key as keyof productItem];
      if (queryString.includes(key)) {
        const index = query.findIndex((el) => el.startsWith(key));

        query[index] = `${key}=${stateFilter?.join(',')}`;

        window.location.hash = [page, query.join('&')].join('?');
      } else {
        const query = `${key}=${stateFilter?.join(',')}`;
        const newQuery = queryString ? `&${query}` : `${query}`;
        window.location.hash += newQuery;
      }
    }
    Query.isLastCheckBox();
  }
  static isLastCheckBox() {
    const keys = ['category', 'brand'];
    const hash = window.location.hash;
    const page = hash.slice(1).split('?')[0];
    const queryString = window.location.hash.split('?')[1];
    const query = queryString.split('&');
    for (const val of keys) {
      const index = query.findIndex((el) => el.startsWith(val));
      if (
        !App.state.filters.checkboxes[val as keyof productItem] &&
        queryString.includes(val)
      ) {
        query.splice(index, 1);
        window.location.hash =
          query.length == 0 ? page : [page, query.join('&')].join('?');
      }
    }
  }
}

export default Query;

import { productItem } from './../components/templates/types';
import App from '../app/app';
import FiltrationLogic from '../components/main/filters/filtrationLogic';

class Query {
  static addToHash(name: string, value: string) {
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
        if (el.includes(name) && !value) {
          query.splice(ind, 1);
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

  static readQueryString(hash: string) {
    const queryString = hash.split('?')[1];
    if (queryString) {
      const queries = queryString.split('&');
      queries.forEach((el) => Query.changeStateFromQuery(el));
    }
  }

  static changeStateFromQuery(query: string) {
    const [key, value] = query.split('=');
    if (key == 'category' || key == 'brand') {
      App.state.filters.checkboxes[key] = value
        .split(',')
        .map((el) => el.split('%20').join(' '));
    }
    if (key == 'price' || key == 'stock') {
      App.state.filters.range[key] = value.split('-').map((el) => +el);
      if (key == 'price') {
        App.state.filters.isChangedByRange = true;
      }
    }
    if (key == 'view') {
      App.state.view = value;
    }
    if (key == 'search') {
      App.state.filters.search = value;
    }
    if (key == 'sort') {
      App.state.filters.sorting = value;
    }
    if (key == 'limit') {
      App.state.pagination.limit = +value;
    }
    if (key == 'page') {
      App.state.pagination.page = +value;
    }
    FiltrationLogic.applyAllFilters();
  }
}

export default Query;

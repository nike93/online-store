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
}

export default Query;

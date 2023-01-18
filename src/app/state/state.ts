import { state } from './../components/templates/types';
import data from '../../data/data.json';

export const State: state = {
  view: 'grid',
  cart: { items: [], promoString: '' },
  appliedCuppons: [],
  pagination: {},
  filters: {
    checkboxes: {},
    search: '',
    range: {},
    isChangedByRange: false,
    filteredData: structuredClone(data.prod),
    searchFocus: false,
  },
};

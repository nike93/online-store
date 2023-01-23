import { StateInterface } from './../components/templates/types';
import data from '../../data/data.json';

export const State: StateInterface = {
  view: 'grid',
  cart: { items: [], promoString: '' },
  appliedCuppons: [],
  pagination: {},
  filters: {
    checkboxes: {},
    search: '',
    range: {},
    isChangedByRange: false,
    filteredData: JSON.parse(JSON.stringify(data.prod)),
    searchFocus: false,
  },
};

const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadProducts')
  };
}

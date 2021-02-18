import { NETFLIX_API_URL, API_REQUEST_HEADERS, API_REQUEST_OBJECT } from '../constants/api';

export const FETCH_SHOWS_CHANGE = 'FETCH_SHOWS_CHANGE';

export const COUNTRIES_FETCHED = 'COUNTRIES_FETCHED';
export const FETCHING = 'FETCHING';
export const FETCH_SHOW_TOTAL_CHANGE = 'FETCH_SHOW_TOTAL_CHANGE';
export const FETCH_DELETED_SHOW_TOTAL_CHANGE = 'FETCH_DELETED_SHOW_TOTAL_CHANGE';
export const IGNORE_TOTALS_IF_STATEMENT = 'IGNORE_TOTALS_IF_STATEMENT';

export function fetchShowsChange(payload) {
  return ({
    type: FETCH_SHOWS_CHANGE,
    payload,
  });
}

export function fetching(payload) {
  return ({
    type: FETCHING,
    payload,
  });
}

export function fetchCountriesChange(payload) {
  return ({
    type: COUNTRIES_FETCHED,
    payload,
  });
}

export function fetchTotalsChange(payload) {
  return ({
    type: FETCH_SHOW_TOTAL_CHANGE,
    payload,
  });
}

export function fetchDeletedShowsTotals(payload) {
  return ({
    type: FETCH_DELETED_SHOW_TOTAL_CHANGE,
    payload,
  });
}
export function ignoreTotalsIfStatement(payload) {
  return ({
    type: IGNORE_TOTALS_IF_STATEMENT,
    payload,
  });
}

export const fetchCountries = () => (dispatch) => {
  const requestObj = {
    ...API_REQUEST_OBJECT,
    method: 'GET',
    headers: {
      ...API_REQUEST_HEADERS,
    },
  };

  return fetch(`${NETFLIX_API_URL}/countries`, requestObj)
    .then((response) => Promise.resolve(response.json())).then((data) => {
      const mappedCountries = [];

      data.results.map((val) => mappedCountries.push({
        key: val.id,
        value: val.id,
        flag: val.countrycode.toLowerCase(),
        text: val.country.trim(),
      }));
      dispatch(fetchCountriesChange(mappedCountries));
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(err);
    });
};

/**
 * Fetches active netflix shows. Countrylist default id is for the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @returns {function(*): Promise<unknown>}
 */
export const fetchActualShows = (offset = 0, limit = 10, countryList = 67, query = 'filterBy= New last 24 hours') => (dispatch) => {
  const requestObj = {
    ...API_REQUEST_OBJECT,
    method: 'GET',
    headers: {
      ...API_REQUEST_HEADERS,
    },
  };

  dispatch(fetching(true));
  return fetch(`${NETFLIX_API_URL}/search?${query}&offset=${offset}&limit=${limit}&countrylist=${countryList}`, requestObj)
    .then((response) => Promise.resolve(response.json())).then((data) => {
      dispatch(fetchShowsChange(data.results));
      if (offset === 0) {
        dispatch(fetchTotalsChange(data.total));
      }
      dispatch(fetching(false));
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(err);
    });
};

/**
 * Fetches deleted netflix shows. Default for countryList is the id of the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @returns {function(*=): Promise<unknown>}
 */
export const fetchDeletedShows = (offset = 0,
  limit = 10,
  countryList = 67) => (dispatch) => {
  const requestObj = {
    ...API_REQUEST_OBJECT,
    method: 'GET',
    headers: {
      ...API_REQUEST_HEADERS,
    },
  };
  dispatch(fetching(true));
  return fetch(`${NETFLIX_API_URL}expiring?offset=${offset}&limit=${limit}&countrylist=${countryList}`, requestObj)
    .then((response) => Promise.resolve(response.json())).then((data) => {
      /**
       * due to the api not showing actual title details in the expiring endpoint,
       * we need to do this longer way of feching them.
      */
      const { results, total } = data;
      const sortedByExpireDate = results.sort((a, b) => (
        new Date(a.expiredate) - new Date(b.expiredate)));
      const promises = sortedByExpireDate.map((val) => fetch(`${NETFLIX_API_URL}title?netflixid=${val.netflixid}`, requestObj).then((response) => Promise.resolve(response.json())).then((response) => {
        const show = response.results[0];
        return {
          title: show.title,
          img: show.img,
          year: show.year,
          synopsis: show.synopsis,
          expireDate: val.expiredate,
        };
      }));
      Promise.all(promises).then((res) => {
        dispatch(fetchShowsChange(res));
        if (offset === 0) {
          dispatch(fetchTotalsChange(total));
        }
        dispatch(fetching(false));
      });
      return Promise.resolve(data);
    }).catch((err) => {
      console.error(err);
    });
};

export const initialState = {
  fetching: false,
  shows: [],
  totalShows: 0,
  totalShowsDeleted: 0,
  countries: [],
};

export default function netflixReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: action.payload };
    case FETCH_SHOWS_CHANGE:
      return { ...state, shows: action.payload };
    case FETCH_SHOW_TOTAL_CHANGE:
      return { ...state, totalShows: action.payload };
    case COUNTRIES_FETCHED:
      return { ...state, countries: action.payload };
    default:
      return { ...state };
  }
}

import moment from "moment";
import {NETFLIX_API_URL, API_REQUEST_HEADERS, API_REQUEST_OBJECT} from '../constants/api'

export const FETCH_SHOWS_CHANGE = 'FETCH_SHOWS_CHANGE';

export const COUNTRIES_FETCHED = 'COUNTRIES_FETCHED'
export const FETCHING = 'FETCHING'

export function fetchShowsChange(payload) {
    return ({
        type: FETCH_SHOWS_CHANGE,
        payload,
    });
}

export function fetching(payload) {
    return ({
        type: FETCHING,
        payload
    })
}

export function fetchCountriesChange(payload) {
    console.log(payload)
    return ({
        type: COUNTRIES_FETCHED,
        payload
    })
}

export const fetchCountries = () => {

    return (dispatch) => {
        let requestObj = {
            ...API_REQUEST_OBJECT,
            method: "GET",
            headers: {
                ...API_REQUEST_HEADERS
            }
        }

        return fetch(`${NETFLIX_API_URL}/countries`, requestObj)
            .then(response => {
                return Promise.resolve(response.json())
            }).then(data => {
                let mappedCountries = [];

                data.results.map((val) => {
                    mappedCountries.push({
                        key: val.id,
                        value: val.id,
                        flag: val.countrycode.toLowerCase(),
                        text: val.country.trim()
                    })
                })
                dispatch(fetchCountriesChange(mappedCountries))
                return Promise.resolve(data)
            }).catch(err => {
                console.error(err)
            })

    }
};

/**
 * Fetches active netflix shows. Countrylist default id is for the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @returns {function(*): Promise<unknown>}
 */
export const fetchActualShows = (offset = 0, limit = 10, countryList = 67, date = false) => {

    return (dispatch) => {
        let requestObj = {
            ...API_REQUEST_OBJECT,
            method: "GET",
            headers: {
                ...API_REQUEST_HEADERS
            }
        }

        if(!date){
            date = moment().subtract(7, "days").format('YYYY-MM-DD')
        }
        dispatch(fetching(true))
        return fetch(`${NETFLIX_API_URL}/search?filterby=New last 24 hours&offset=${offset}&limit=${limit}&countrylist=${countryList}`, requestObj)
            .then(response => {
                return Promise.resolve(response.json())
            }).then(data => {
                dispatch(fetchShowsChange(data.results))

                dispatch(fetching(false))
                return Promise.resolve(data)
            }).catch(err => {
                console.error(err)
            })
    }
};

/**
 * Fetches deleted netflix shows. Default for countryList is the id of the Netherlands
 * @param offset
 * @param limit
 * @param countryList
 * @param date
 * @returns {function(*=): Promise<unknown>}
 */
export const fetchDeletedShows = (offset = 0,
                                  limit = 10,
                                  countryList = 67,
                                  date = false
                                ) => {

    return (dispatch) => {
        console.log(date)
        let requestObj = {
            ...API_REQUEST_OBJECT,
            method: "GET",
            headers: {
                ...API_REQUEST_HEADERS
            }
        }
        if(!date){
            date = moment().subtract(1, "months").format('YYYY-MM-DD')
        }
        dispatch(fetching(true))
        return fetch(`${NETFLIX_API_URL}titlesdel?offset=${offset}&limit=${limit}&countrylist=${countryList}&date=${date}`, requestObj)
            .then(response => {
                return Promise.resolve(response.json())
            }).then(data => {
                /**
                 * due to the api not showing actual title details in the titlesdel endpoint we need to do this longer way of feching them.
                 */
                let promises = data.results.map((val, key) => {
                    return fetch(`${NETFLIX_API_URL}title?netflixid=${val.netflixid}`, requestObj).then(response => {
                        return Promise.resolve(response.json())
                    }).then(response => {
                        let show = response.results[0];
                        return {
                            title: show.title,
                            img: show.img,
                            year: show.year,
                            synopsis: show.synopsis
                        }
                    })
                })
                Promise.all(promises).then(res => {
                    dispatch(fetchShowsChange(res))
                    dispatch(fetching(false))
                })
                return Promise.resolve(data)
            }).catch(err => {
                console.error(err)
            })
    }
};

export const initialState = {
    fetching: false,
    shows: [],
    countries: []
};

export default function netflixReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING:
            console.log(action.payload)
            return {...state, fetching: action.payload};
        case FETCH_SHOWS_CHANGE:
            return {...state, shows: action.payload};
        case COUNTRIES_FETCHED:
            return {...state, countries: action.payload};
        default:
            return {...state};
    }
}

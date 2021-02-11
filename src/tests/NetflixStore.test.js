import reducer from '../store/netflix.js'
import * as netflixStore from '../store/netflix.js'

describe('Netflix reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                fetching: false,
                shows: [],
                countries: []
            })
    })

    it('should handle FETCH_SHOWS_CHANGE', () => {
        const payload = [
            {
                title: "Breaking bad",
                img: "https://lorem.pixel/?width=300&height=300",
                year: "2013",
                synopsis: "Breaking bad is about a Science teacher who creates meth inside a caravan",
            }
        ]
        expect(
            reducer([], {
                type: netflixStore.FETCH_SHOWS_CHANGE,
                payload
            })
        ).toEqual({
            "shows": [
                {
                    title: "Breaking bad",
                    img: "https://lorem.pixel/?width=300&height=300",
                    year: "2013",
                    synopsis: "Breaking bad is about a Science teacher who creates meth inside a caravan",
                }
            ]
        })
    })

    it('should handle COUNTRIES_FETCHED', () => {
        const payload = [
            {
                key: 67,
                value: "Netherlands",
                flag: "NL",
                text: "Netherlands"
            }
        ]
        expect(
            reducer([], {
                type: netflixStore.COUNTRIES_FETCHED,
                payload
            })
        ).toEqual({
            "countries": [
                {
                    key: 67,
                    value: "Netherlands",
                    flag: "NL",
                    text: "Netherlands"
                }
            ]
        })
    })
})
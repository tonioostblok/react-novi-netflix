import reducer from '../store/authentication.js'
import * as authenticationStore from '../store/authentication.js'

describe('Authentication reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            username:'',
            password:'',
            user: {
                username:'',
                password:'',
                country: ''
            }
            })
    })

    it('should handle USERNAME_CHANGE', () => {
        const payload = "username"
        expect(
            reducer([], {
                type: authenticationStore.USERNAME_CHANGE,
                payload
            })
        ).toEqual({
            username: "username",
        })
    })


    it('should handle PASSWORD_CHANGE', () => {
        const payload = "password"
        expect(
            reducer([], {
                type: authenticationStore.PASSWORD_CHANGE,
                payload
            })
        ).toEqual({
            password: "password",
        })
    })

    it('should handle LOGIN_CHANGE', () => {
        const payload = {
            username:'Toni',
            password:'RocketScienceIsNotEasy!',
            country: '67'
        }
        expect(
            reducer([], {
                type: authenticationStore.LOGIN_CHANGE,
                payload
            })
        ).toEqual({
            user: {
                username:'Toni',
                password:'RocketScienceIsNotEasy!',
                country: '67'
            }
        })
    })
})
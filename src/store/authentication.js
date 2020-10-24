import firebase from '../constants/Firebase';

export const LOGIN_CHANGE = 'LOGIN_CHANGE';
export const USERNAME_CHANGE = 'USERNAME_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';

export function loginChange(payload) {
  return ({
    type: LOGIN_CHANGE,
    payload,
  });
}

export function userNameChange(payload) {
  return ({
    type: USERNAME_CHANGE,
    payload,
  });
}
export function passwordChange(payload) {
  return ({
    type: PASSWORD_CHANGE,
    payload,
  });
}

// export const users = firebase.database().collection('users');

export const login = (username, password) => (dispatch) => {
  firebase.firestore().collection('users').where('username', '==', username).get()
    .then((query) => {
      query.forEach((doc) => {
        const user = doc.data();
        if (user.password === password) {
          localStorage.setItem('user_id', doc.id);
          dispatch(loginChange(user));
        }
      });
    });
};
export const updateUserName = (username) => (dispatch) => {
  dispatch(userNameChange(username));
};
export const updatePassword = (password) => (dispatch) => {
  dispatch(passwordChange(password));
};
export const initialState = {
  username: '',
  password: '',
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHANGE:
      return { ...state, ...action.payload };
    case USERNAME_CHANGE:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    default:
      return { ...state };
  }
}

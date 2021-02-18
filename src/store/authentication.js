import firebase from '../constants/Firebase';

export const LOGIN_CHANGE = 'LOGIN_CHANGE';
export const USERNAME_CHANGE = 'USERNAME_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
export const MESSAGE_CHANGE = 'MESSAGE_CHANGE';

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

export function message(payload) {
  return ({
    type: MESSAGE_CHANGE,
    payload,
  });
}

// export const users = firebase.database().collection('users');

export const getMe = (hash) => (dispatch) => {
  firebase.firestore().collection('users').where(firebase.firestore.FieldPath.documentId(), '==', hash).get()
    .then((query) => {
      query.forEach((doc) => {
        const user = doc.data();
        dispatch(loginChange(user));
      });
    });
};

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
      if (!localStorage.getItem('user_id')) {
        dispatch(message('The username / password provided was incorrect, please try again.'));
      }
    });
};

export const registerUser = (registerObject) => (dispatch) => {
  firebase.firestore().collection('users').add({
    username: registerObject.username,
    password: registerObject.password,
    country: registerObject.country,
  });
  dispatch(message('Successfully registered, you can now log in!.'));
};

export const updateUser = (updateValues) => (dispatch) => {
  firebase.firestore().collection('users').doc(localStorage.getItem('user_id')).set(updateValues);
  dispatch(message('Successfully updated your account information.'));
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
  message: '',
  user: {
    username: '',
    password: '',
    country: '',
  },
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_CHANGE:
      return { ...state, message: action.payload };
    case LOGIN_CHANGE:
      return { ...state, user: action.payload };
    case USERNAME_CHANGE:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    default:
      return { ...state };
  }
}

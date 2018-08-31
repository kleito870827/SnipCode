import { firebase, googleAuthProvider } from '../../firebase/firebase';

// AUTHERROR
export const authError = (error) => ({
  type: 'AUTHERROR',
  error
});

// REMOVEAUTHERROR
export const removeAuthError = () => ({
  type: 'REMOVEAUTHERROR'
})

// LOGIN
export const login = (uid) => ({
  type: 'LOGIN',
  uid
});


export const startLoginWithGoogle = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
    .then(() => {
      dispatch(removeAuthError());
    })
    .catch(error => {
      dispatch(authError(error.message));
    })
  }
}

export const startSignUpWithEmailPassword = (email, password) => {
  return (dispatch) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(removeAuthError());
    })
    .catch(error => {
      dispatch(authError(error.message))
    })
  }
}

export const startLogInWithEmailPassword = (email, password) => {
  return (dispatch) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(removeAuthError());
    })
    .catch(error => {
      dispatch(authError(error.message))
    })
  }
}

// LOGOUT
export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}

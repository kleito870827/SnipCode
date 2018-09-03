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
export const login = (uid, userName, photoURL) => ({
  type: 'LOGIN',
  uid,
  userName,
  photoURL
});

// EDIT_USER_NAME
export const editUserName = (userName) => ({
  type: 'EDIT_USER_NAME',
  userName
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

export const startSignUpWithEmailPassword = (email, password, userName) => {
  return (dispatch) => {
    dispatch(editUserName(userName));
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: userName,
        photoURL: '/images/no_user.jpg'
      }).then(() => {
          console.log('updateProfile');
        dispatch(removeAuthError());
      })
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

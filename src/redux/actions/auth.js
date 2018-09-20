import database, { firebase, googleAuthProvider } from '../../firebase/firebase';

// ADDSNIPPETAMOUNT
export const addSnippetAmount = (snippet) => ({
  type: 'ADDSNIPPETAMOUNT',
  snippet
})

// AUTHERROR
export const authError = (error) => ({
  type: 'AUTHERROR',
  error
});

// REMOVEAUTHERROR
export const removeAuthError = () => ({
  type: 'REMOVEAUTHERROR'
})

// SUCCESSFUL
export const successful = (successful) => ({
  type: 'SUCCESSFUL',
  successful
});

// REMOVESUCCESSFUL
export const removeSuccessful = () => ({
  type: 'REMOVESUCCESSFUL'
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

export const fbUpdateUserName = (userName, userId) => {
  return (dispatch) => {
    return firebase.auth().currentUser.updateProfile({
      displayName: userName
    }).then(() => {
      database.ref(`user/${userId}/userSetting`).update({userName})
      .then(() => {
        dispatch(editUserName(userName));
        dispatch(successful('Your user name have been updated successfully'));
        dispatch(removeAuthError());
      })
      .catch((error) => {
        dispatch(removeSuccessful());
        dispatch(authError(error.message));
      })
    }).catch((error) => {
      dispatch(removeSuccessful());
      dispatch(authError(error.message));
    })
  }
}

// EDIT_USER_IMAGE_URL
export const editUserImageUrl = (imageUrl) => ({
  type: 'EDIT_USER_IMAGE_URL',
  imageUrl
})

export const fbUpdateImageUrl = (image, userId) => {
  return (dispatch) => {
    const metadata = {
      contentType: image.type
    };
    return firebase.storage().ref().child(userId).put(image, metadata)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        firebase.auth().currentUser.updateProfile({
          photoURL: url
        }).then(() => {
          database.ref(`user/${userId}/userSetting`).update({photoURL: url})
          .then(() => {
            dispatch(editUserImageUrl(url));
            dispatch(successful('Your profile photo have been updated successfully'));
            dispatch(removeAuthError());
          })
          .catch((error) => {
            dispatch(removeSuccessful());
            dispatch(authError(error.message));
          })
        }).catch((error) => {
          dispatch(removeSuccessful());
          dispatch(authError(error.message));
        });
      }).catch((error) => {
        dispatch(removeSuccessful());
        dispatch(authError(error.message));
      });
  }
}

export const fbUpdatePassword = (newPassword) => {
  return (dispatch) => {
    return firebase.auth().currentUser.updatePassword(newPassword)
    .then(() => {
      dispatch(successful('Your password have been updated successfully'));
      dispatch(removeAuthError());
    }).catch((error) => {
      dispatch(removeSuccessful());
      dispatch(authError(error.message));
    })
  }
}


export const startLoginWithGoogle = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
    .then(() => {
      dispatch(removeAuthError());
    })
    .catch(error => {
      dispatch(removeSuccessful());
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
      dispatch(removeSuccessful());
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
      dispatch(removeSuccessful());
      dispatch(authError(error.message))
    })
  }
}

// Send a password reset email
export const fbsendPasswordResetEmail = (email) => {
  return (dispatch) => {
    return firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      dispatch(successful('Email has been sent to reset your password'));
      dispatch(removeAuthError());
    }).catch((error) => {
      dispatch(removeSuccessful());
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

import uuid from 'uuid';
import database, { firebase } from '../../firebase/firebase';
import moment from 'moment';

// ADD_SNIP
export const addSnip = (snippet = {}) => ({
  type: 'ADD_SNIP',
  snippet
});

// FB_ADD_SNIP
export const fbAddSnip = (snipData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const {
      title = '',
      code = '',
      date = moment().format('MM/DD/YYYY'),
      privacy = false,
      category = '',
      language = '',
      user = uid
    } = snipData;

    const snippet = { title, code, date, privacy, category, language, user };

    if(privacy){
      return database.ref(`user/${uid}/snippet`).push(snippet).then((ref) => {
        dispatch(addSnip({
          id: ref.key,
          ...snippet
        }))
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      return database.ref('public').push(snippet).then((ref) => {
        dispatch(addSnip({
          id: ref.key,
          ...snippet
        }))
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}

// REMOVE_SNIP
export const removeSnip = (id) => ({
  type: 'REMOVE_SNIP',
  id
});

// FB_REMOVE_SNIP
export const fbRemoveSnip = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`user/${uid}/snippet/${id}`).remove().then(() => {
      dispatch(removeSnip(id));
    });
  }
}

// EDIT_SNIP
export const editSnip = (id, update) => ({
  type: 'EDIT_SNIP',
  id,
  update
});

const moveFbRecord = (oldRef, newRef, update, id, dispatch, privacy) => {
   return database.ref(oldRef).once('value').then(snap => {
     if(privacy){
       // console.log('only update', oldRef);
       return database.ref(oldRef).update(update);
     }else{
       // console.log('set other ref', newRef);
       return database.ref(newRef).update(update);
     }
   }).then(() => {
      dispatch(editSnip(id, update));
      if(privacy){
        return database.ref(newRef).remove();
      }else{
        return database.ref(oldRef).remove();
      }
      console.log('Done!');
   }).catch(err => {
        console.log(err.message);
   });
}

// FB_EDIT_SNIP
export const fbEditSnip = (id, snipUpdate) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      code = '',
      privacy = false,
      category = '',
      language = '',
      user = uid
    } = snipUpdate;

    const update = { title, code, privacy, category, language, user };
    console.log(update);
    // console.log(privacy);
    // if(!privacy){
    //   console.log('no private');
    //   moveFbRecord(`public/${id}`, `user/${uid}/snippet/${id}`, update, id, dispatch, private);
    // }else{
    //   console.log('private');
      moveFbRecord(`user/${uid}/snippet/${id}`, `public/${id}`, update, id, dispatch, privacy);
    // }
    // return database.ref(`user/${uid}/snippet/${id}`).update(update).then(() => {
    //   dispatch(editSnip(id, update))
    // })
    // return database.ref(`user/${uid}/snippet/${id}`).once('value').then((snap) => {
    //   // dispatch(editSnip(id, update))
    //   return database.ref(`public/${id}`).set(snap.val());
    // }).then(() => {
    //   return database.ref(`user/${uid}/snippet/${id}`).remove()
    // }).then(() => {
    //   console.log('done');
    // }).catch(err => {
    //   console.log(err);
    // })
  }
}


// SET_SNIP
export const setSnip = (snippets) => ({
  type: 'SET_SNIP',
  snippets
});


// FB_SET_SNIP
export const fbSetSnip = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // console.log(uid);
    const privateSnippet = [];
    const publicSnippet = [];
    let finishSnippet = [];

    return database.ref(`user/${uid}/snippet`).once('value').then((snapshot) => {

      snapshot.forEach((childSnapshot) => {
        // console.log(childSnapshot.val());
        privateSnippet.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      // console.log('snippet', snippet);
    }).then(() => {
       database.ref('public').once('value').then((snapshot) => {

        snapshot.forEach((childSnapshot) => {
          let userId = childSnapshot.val().user;
          let userName = '';
          let photoURL = '';
          database.ref(`user/${userId}/userSetting`).once('value').then((snap) => {
            userName = snap.val().userName ? snap.val().userName : 'Annonymous';
            photoURL = snap.val().photoURL ? snap.val().photoURL : '/images/no_user.jpg';
          }).then(() => {
            if(uid === userId){
              publicSnippet.unshift({
                id: childSnapshot.key,
                ...childSnapshot.val(),
                userName,
                photoURL
              });
            }else{
              publicSnippet.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
                userName,
                photoURL
              });
            }
          }).then(() => {
            finishSnippet = [...privateSnippet, ...publicSnippet]
            dispatch(setSnip(finishSnippet));
          })
          // console.log(firebase.auth().currentUser.displayName);
        });
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

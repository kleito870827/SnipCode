import uuid from 'uuid';
import database from '../../firebase/firebase';
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
      category = [],
      language = ''
    } = snipData;

    const snippet = { title, code, date, privacy, category, language };
    
    return database.ref(`user/${uid}/snippet`).push(snippet).then((ref) => {
      dispatch(addSnip({
        id: ref.key,
        ...snippet
      }))
    })
    .catch((err) => {
      console.log(err);
    });
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

// FB_EDIT_SNIP
export const fbEditSnip = (id, snipUpdate) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      code = '',
      privacy = false,
      category = [],
      language = ''
    } = snipUpdate;

    const update = { title, code, privacy, category, language };
    return database.ref(`user/${uid}/snippet/${id}`).update(update).then(() => {
      dispatch(editSnip(id, update))
    })
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
    return database.ref(`user/${uid}/snippet`).once('value').then((snapshot) => {
      const snippet = [];

      snapshot.forEach((childSnapshot) => {
        snippet.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setSnip(snippet));
    })
  }
}

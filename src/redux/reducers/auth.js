const defaultState = {
  uid: '',
  userName: '',
  authError: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userName: action.userName,
        uid: action.uid,
        photoURL: action.photoURL

      };
    case 'EDIT_USER_NAME':
      return {
        ...state,
        userName: action.userName
      }
    case 'LOGOUT':
      return {
        uid: '',
        userName: '',
        authError: ''
      };
    case 'AUTHERROR':
      return {
        ...state,
        authError: action.error
      }
    case 'REMOVEAUTHERROR':
      return {
        ...state,
        authError: ''
      }
    default:
      return state;
  }
}

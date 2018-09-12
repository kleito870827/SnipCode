const defaultState = {
  uid: '',
  userName: '',
  authError: '',
  successful: ''
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
    case 'EDIT_USER_IMAGE_URL':
      return {
        ...state,
        photoURL: action.imageUrl
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
    case 'SUCCESSFUL':
      return {
        ...state,
        successful: action.successful
      }
    case 'REMOVESUCCESSFUL':
      return {
        ...state,
        successful: ''
      }
    default:
      return state;
  }
}

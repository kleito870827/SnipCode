const defaultState = {
  uid: '',
  authError: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        uid: '',
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

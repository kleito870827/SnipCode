const currentError = {
  error: ''
};

export default (state = currentError, action) => {
  switch (action.type) {
    case 'EDIT_ERROR':
      return {
        error: action.error
      }
    case 'CLEAR_ERROR':
      return {
        error: ''
      }
    default :
      return state;
  }
}

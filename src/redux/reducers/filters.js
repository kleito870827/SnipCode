const filterReducerDefaultState = {
  keyword: '',
  language: '',
  currentCategory: '',
  category: []
}

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'EDIT_FILTER_KEYWORD':
      return {
        ...state,
        keyword: action.keyword
      };
    case 'EDIT_FILTER_LANGUAGE':
      return {
        ...state,
        language: action.language
      };
    case 'EDIT_CURRENT_FILTER_CATEGORY':
      return {
        ...state,
        currentCategory: action.category
      }
    case 'ADD_FILTER_CATEGORIES':
      return {
        ...state,
        category: state.category.concat(action.category)
      };
    case 'REMOVE_CURRENT_FILTER_CATEGORY':
      return {
        ...state,
        category: state.category.filter((e, i) => i != action.position)
      };
    default:
    return state;
  }
}

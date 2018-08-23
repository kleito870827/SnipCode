const currentSnippetReducerDefaultState = {
    title: '',
    code: '',
    date: 0,
    privacy: false,
    currentCategory: '',
    category: [],
    currentLanguage: '',
    language: []
}

export default (state = currentSnippetReducerDefaultState, action) => {
  switch (action.type) {
    case 'CLEAR_CURRENT_SNIP':
      return currentSnippetReducerDefaultState;
    case 'SET_CURRENT_SNIP':
      return {
        ...state,
        ...action.current
      };
    case 'EDIT_CURRENT_SNIP_TITLE':
      return {
        ...state,
        title: action.title
      };
      case 'EDIT_CURRENT_SNIP_CODE':
        return {
          ...state,
          code: action.code
        };
      case 'EDIT_CURRENT_SNIP_PRIVACY':
        return {
          ...state,
          privacy: action.privacy
        };
      case 'EDIT_CURRENT_SNIP_CATEGORY':
        return {
          ...state,
          currentCategory: action.category
        };
      case 'ADD_CURRENT_SNIP_CATEGORY':
        return {
          ...state,
          category: state.category.concat(action.category)
        };
      case 'EDIT_CURRENT_SNIP_LANGUAGE':
        return {
          ...state,
          currentLanguage: action.language
        };
      case 'ADD_CURRENT_SNIP_LANGUAGE':
        return {
          ...state,
          language: state.language.concat(action.language)
        };
    default:
      return state;
  }
}

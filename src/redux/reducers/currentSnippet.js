const currentSnippetReducerDefaultState = {
    title: '',
    code: '',
    privacy: false,
    currentCategory: '',
    category: '',
    language: '',
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
      case 'REMOVE_CURRENT_SNIP_CATEGORY':
        return {
          ...state,
          category: state.category.filter((e, i) => i !== action.position)
        }
      // case 'EDIT_CURRENT_SNIP_LANGUAGE':
      //   return {
      //     ...state,
      //     currentLanguage: action.language
      //   };
      case 'EDIT_CURRENT_SNIP_LANGUAGE':
        return {
          ...state,
          language: action.language
        };
        case 'EDIT_CURRENT_SNIP_ERROR':
          return {
            ...state,
            error: action.error
          }
    default:
      return state;
  }
}

const snippetReducerDefaultState = {
  snippetArray: []
};

export default (state = snippetReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SNIP':
      return {
        snippetArray: [action.snippet, ...state.snippetArray]
      };
    case 'SET_SNIP':
      return {
          snippetArray: action.snippets
      }
    case 'REMOVE_SNIP':
      const removeSnip = state.snippetArray.filter(({id}) => id !== action.id);
      return {
        snippetArray: removeSnip
      }
    case 'EDIT_SNIP':
      const editSnip = state.snippetArray.map((snip) => {
        if(snip.id === action.id){
          return {
            ...snip,
            ...action.update
          }
        }else{
          return snip;
        }
      })
      return {
        snippetArray:  editSnip
      }
    default:
      return state;
  }
};

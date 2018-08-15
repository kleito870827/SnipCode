const snippetReducerDefaultState = {
  snippets: []
};

export default (state = snippetReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SNIP':
      return {
        snippets: [...state.snippets, action.snippet]
      };
    default:
      return state;
  }
};

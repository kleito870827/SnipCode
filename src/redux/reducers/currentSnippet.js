const currentSnippetReducerDefaultState = {
  currentSnippet: {
    title: '',
    code: '',
    date: 0,
    privacy: false,
    category: ''
  }
}

export default (state = currentSnippetReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

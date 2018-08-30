// SET_CURRENT_SNIP
export const setCurrentSnip = (current) => ({
  type: 'SET_CURRENT_SNIP',
  current
})

// EDIT_CURRENT_SNIP_TITLE
export const editCurrentSnipTilte = (title) => ({
  type: 'EDIT_CURRENT_SNIP_TITLE',
  title
});

// EDIT_CURRENT_SNIP_CODE
export const editCurrentSnipCode = (code) => ({
  type: 'EDIT_CURRENT_SNIP_CODE',
  code
});

// EDIT_CURRENT_SNIP_PRIVACY
export const editCurrentSnipPrivacy = (privacy) => ({
  type: 'EDIT_CURRENT_SNIP_PRIVACY',
  privacy
});

// EDIT_CURRENT_SNIP_CATEGORY
export const editCurrentSnipCategory = (category) => ({
  type: 'EDIT_CURRENT_SNIP_CATEGORY',
  category
});

// ADD_CURRENT_SNIP_CATEGORY
export const addCurrentSnipCategory = (category) => ({
  type: 'ADD_CURRENT_SNIP_CATEGORY',
  category
});

// REMOVE_CURRENT_SNIP_CATEGORY
export const removeCurrentSnipCategory = (position) => ({
  type: 'REMOVE_CURRENT_SNIP_CATEGORY',
  position
})

// EDIT_CURRENT_SNIP_LANGUAGE
export const editCurrentSnipLanguage = (language) => ({
  type: 'EDIT_CURRENT_SNIP_LANGUAGE',
  language
});

// // ADD_CURRENT_SNIP_LANGUAGE
// export const addCurrentSnipLanguage = (language) => ({
//   type: 'ADD_CURRENT_SNIP_LANGUAGE',
//   language
// });

// CLEAR_CURRENT_SNIP
export const clearCurrentSnip = () => ({
  type: 'CLEAR_CURRENT_SNIP'
});

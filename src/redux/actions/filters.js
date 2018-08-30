// EDIT_FILTER_KEYWORD
export const editFilterKeyword = (keyword) => ({
  type: 'EDIT_FILTER_KEYWORD',
  keyword
});

// EDIT_FILTER_LANGUAGE
export const editFilterLanguage = (language) => ({
  type: 'EDIT_FILTER_LANGUAGE',
  language
});

// ADD_FILTER_CATEGORIES
export const addFilterCategories = (category) => ({
  type: 'ADD_FILTER_CATEGORIES',
  category
});

// REMOVE_CURRENT_FILTER_CATEGORY
export const removeCurrentFilterCategory = (position) => ({
  type: 'REMOVE_CURRENT_FILTER_CATEGORY',
  position
})

// EDIT_CURRENT_FILTER_CATEGORY
export const editCurrentFilterCategories = (category) => ({
  type: 'EDIT_CURRENT_FILTER_CATEGORY',
  category
})

import uuid from 'uuid';

// ADD_SNIP
export const addSnip = ({
  title = '',
  code = '',
  date = 0,
  privacy = false,
  category = ''
} = {}) => ({
  type: 'ADD_SNIP',
  snippet: {
    id: uuid(),
    title,
    code,
    date,
    privacy,
    category
  }
});

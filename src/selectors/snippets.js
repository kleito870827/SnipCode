export default (snippets, {keyword, category, language}) => {
  // console.log(snippets[0].title);
  return snippets.filter((snip) => {
    const keywordFilter = snip.title.toLowerCase().includes(keyword);
    const languageFilter = snip.language.toLowerCase().includes(language);
    const categoryFilter = category.length > 0 ? snip.category.some(r => category.indexOf(r) >= 0) : true;
    console.log(categoryFilter);
    return keywordFilter && languageFilter && categoryFilter;
  });
};

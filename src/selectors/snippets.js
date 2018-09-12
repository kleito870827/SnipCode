export default (snippets, {keyword, category, language}) => {
  // console.log(snippets[0].title);
  return snippets.filter((snip) => {
    const keywordFilter = snip.title.toLowerCase().includes(keyword.toLowerCase());
    const languageFilter = snip.language.toLowerCase().includes(language.toLowerCase());
    let categoryFilter = true;
    // console.log(!!snip.category);
    if(category.length > 0){
      categoryFilter = category.length && !!snip.category ?
      snip.category.some(r => {
        return category.indexOf(r) >= 0
      })
      : false;
    }else{
      categoryFilter = true;
    }
    // const categoryFilter = true;
    // console.log(categoryFilter);
    return keywordFilter && languageFilter && categoryFilter;
  });
};

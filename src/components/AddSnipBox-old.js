import React from 'react';

const AddSnipBox = (props) => (
  <div className="add-snip-box">
    <div className="add-snip-box__title">
      <label htmlFor="title">Title <span className="required">*</span></label>
      <input id="title" type="text" onChange={props.OnChangeTitle} value={props.currentTitle} />
    </div>
    <div className="add-snip-box__code">
      <label htmlFor="code">Code <span className="required">*</span></label>
      <textarea id="code" rows="10" cols="50" onChange={props.OnChangeCode} value={props.currentCode}></textarea>
    </div>
    <div className="add-snip-box__language">
      <label htmlFor="language">Language</label>
      <input id="language" type="text" onChange={props.OnChangeLanguage} value={props.currentLanguage} />
    </div>
    <div className="add-snip-box__categories">
      <label htmlFor="category">Add Category</label>
      <div className="add-snip-box__categories__input-btn">
        <input id="category" type="text" onKeyDown={props.OnKeyDownCategory} onChange={props.OnChangeCategory} value={props.currentCategory} />
        <input type="button" onClick={props.OnClickAddCategoty} value="Add Category"/>
      </div>
      {props.category && (
        <ul className="add-snip-box__categories__ul">
          {props.category.map((e, i) => {
            return <li key={i}><div><span>{e}</span><span onClick={() => props.OnClickRemoveCategory(i)}><i className="fa fa-trash-o" aria-hidden="true"></i></span></div></li>
          })}
        </ul>
      )}
    </div>
    <div className="add-snip-box__add-snip">
      <input type="button" onClick={props.OnClickAddSnip} value="Create New Snippet" />
    </div>
    <div className="add-snip-box__error">
      <p className="error">{props.error}</p>
    </div>
  </div>
);

export default AddSnipBox;

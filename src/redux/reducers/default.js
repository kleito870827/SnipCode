const defaultState = { state: 'Success' };

export default ( state = defaultState, action ) => {
  switch( action.type ){
    default:
      return state;
  }
};

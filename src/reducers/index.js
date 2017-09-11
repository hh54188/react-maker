const reducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT': return { counter: state.counter + 1 };
    case 'FETCH_DATA_COMPLETE': console.log(action.payload); return state; break;
    case 'FETCH_DATA_ERROR': console.log(action.payload); return state; break;
    default: return state;
  }
}

export default reducer;
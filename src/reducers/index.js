const initialState = {
  beat : {}
};

function beatupReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return Object.assign({}, state);
  }
}

export default beatupReducer;

const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Test-01",
  address: {
    street: "Sepakat 2",
    city: "Pontianak",
    state: "KalBar",
  },
};

//STORE
const STREET_UPDATED = "STREET_UPDATED";

//ACTION
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

//REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = redux.legacy_createStore(reducer);

console.log(`Initial State`, store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`Updated State`, store.getState());
});

store.dispatch(updateStreet("456 "));

unsubscribe();

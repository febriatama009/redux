const redux = require("redux");

//store
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//action
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

//reducer
//use to specify how the app changes in response to actions sent to the store

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCream: 10,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
        //use .payload in any addtional action
      };
    default:
      return state;
  }
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
        //use .payload in any addtional action
      };
    default:
      return state;
  }
};

//combine all reducers that exist
const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

console.log(`------Initial Stock-----`);

const store = createStore(rootReducers, applyMiddleware(logger)); //hold the state
console.log(`Intital state : `, store.getState()); //allow access to state via getState()

//dipasang - event listener
const unsubscribe = store.subscribe(() => {}); //register listener via subscribe

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

console.log(``);
console.log(`------Cake Decrease-----`);

actions.orderCake();
actions.orderCake();
actions.orderCake();

console.log(``);
console.log(`------Cake Restock-----`);

actions.restockCake(1);
actions.restockCake(2);
actions.restockCake(3);

console.log(``);
console.log(`------IceCream Decrease-----`);

actions.orderIceCream(2);
actions.orderIceCream(1);
actions.orderIceCream(3);

console.log(``);
console.log(`------IceCream Restock-----`);

actions.restockIceCream(1);
actions.restockIceCream(2);
actions.restockIceCream(3);

// store.dispatch(orderCake()); //update the state
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(1));
// store.dispatch(restockCake(2));
// store.dispatch(restockCake(3));

unsubscribe(); //dilepas

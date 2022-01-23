import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { epicMiddleware, RootEpic } from "./epics";
import { initialState, RootReducer } from "./reducers";
export * from "./facades";

const composeEnhancer = composeWithDevTools({
  name: "reign-challenge",
});

const Store = createStore(
  RootReducer,

  initialState as any,

  composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(RootEpic);
export default Store;

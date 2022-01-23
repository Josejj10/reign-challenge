import { combineEpics, createEpicMiddleware } from "redux-observable";
import { NewsEpics } from "./news";

export const RootEpic = combineEpics(NewsEpics);

export const epicMiddleware = createEpicMiddleware();

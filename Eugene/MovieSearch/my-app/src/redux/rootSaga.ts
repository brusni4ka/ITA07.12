import { all } from "redux-saga/effects";
import { moviesSaga } from "./sagas/moviesSaga";

export default function* rootSaga() {
  yield all([moviesSaga()]);
}

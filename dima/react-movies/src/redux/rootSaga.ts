import moviesSaga from "./moviesSagas";
import movieSaga from "./movieSaga";
import { all } from "redux-saga/effects";
export default function* rootSaga() {
  return yield all([moviesSaga, movieSaga]);
}

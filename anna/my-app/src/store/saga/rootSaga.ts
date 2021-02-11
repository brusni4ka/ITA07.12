import { all}  from 'redux-saga/effects';
import { moviesSagas} from './moviesSaga';
import { movieSagas} from './movieSaga';

export default function* rootSaga() {
  yield all([
    moviesSagas(),
    movieSagas()
  ])

}


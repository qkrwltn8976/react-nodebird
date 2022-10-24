import { all, call, fork, take } from "redux-saga/effects";

// function* logIn() {
//   yield call(loginApi()); // call - 동기, fork - 빋
// }
// function* watchLogin() {
//   yield take("LOG_IN", logIn);
// }
export default function* rootSaga() {
  //   yield all([fork(watchLogin)]);
}

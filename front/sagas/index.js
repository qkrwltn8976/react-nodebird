import userSaga from "./user";
import postSaga from "./post";
import { all, fork } from "redux-saga/effects";

// eventListener와 비슷한 역할
// fork(call): 함수 실행, all: 동시 실행
export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}

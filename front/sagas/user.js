import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function loginAPI(data) {
  return axios.post("/API/login", data);
}

function logOutAPI() {
  return axios.post("/API/login");
}

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data); // call - 동기 함수 호출 (await/then), fork - 비동기 함수 호출
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    // put: dispatch
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  // take: 일회성
  // takeLatest: 프론트 기준 여러 번 요청 호출 시에 마지막 요청만 실행 (응답만 취소되고 요청은 취소되지 않음)
  //             중복 요청은 서버에서 검사
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}

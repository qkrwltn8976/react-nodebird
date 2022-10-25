import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function addPostAPI(data) {
  return axios.post("/API/login", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  // throttle: 특정 시간 내의 요청 한번만 보내도록
  yield takeLatest("ADD_POST_REQUEST", addPost);
}
export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}

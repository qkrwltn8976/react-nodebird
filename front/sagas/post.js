import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  // throttle: 특정 시간 내의 요청 한번만 보내도록
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  // throttle: 특정 시간 내의 요청 한번만 보내도록
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}

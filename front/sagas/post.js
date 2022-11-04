import axios from "axios";
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import shortId from "shortid";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
function loadPostsAPI(data) {
  return axios.get("/api/post", data);
}
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function removePostAPI(data) {
  return axios.delete("/api/post", data);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* loadPosts(action) {
  try {
    yield delay(1000);
    // const result = yield call(loadPostsAPI, action.data);
    console.log(generateDummyPost(10));
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: { id, content: action.data },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    // const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addComment(action) {
  console.log(action, "##");
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  // throttle: 특정 시간 내의 요청 한번만 보내도록
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  // throttle: 특정 시간 내의 요청 한번만 보내도록
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}

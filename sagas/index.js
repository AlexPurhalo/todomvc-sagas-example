import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

export function* addTodos(action) {
  const { text } = action

  try {
    const todo = yield call(
      api, 
      '/todos', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text }) 
      }
    )

    yield put({ type: "ADD_TODO_SUCCEEDED", payload: todo });
  } catch (e) {
    yield put({ type: "ADD_TODO_FAILED", message: e.message });
  }
}

export function* mySaga() {
  yield* takeLatest("ADD_TODO_REQUESTED", addTodos);
}

function api(url, opts) {
  return fetch(url, opts)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      return resp;
    });
}
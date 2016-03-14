import { takeLatest } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import * as ActionTypes from '../constants/ActionTypes'
import watchAddTodo from './add-todo'
import watchEditTodo from './edit-todo'
import watchDeleteTodo from './delete-todo'
import watchFetchTodos from './fetch-todos'
import watchCompleteTodo from './complete-todo'
import watchClearCompletedTodos from './clear-completed'

export function* completeAllTodos(action) {
  // todo pass all todos
  const { id, completed: c } = action

  try {
    const todo = yield call(
      api, 
      '/complete-all', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ''
      }
    )

    yield put({ type: ActionTypes.COMPLETE_ALL_SUCCEEDED })
  } catch (e) {
    yield put({ type: ActionTypes.COMPLETE_TODO_FAILED, id, c })
  }
}

function api(url, opts) {
  return fetch(url, opts)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (resp) {
      return resp
    })
}

export default function* watchMany() {
  yield [
    fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchFetchTodos),
    fork(watchDeleteTodo),
    fork(watchCompleteTodo),
    takeLatest(ActionTypes.COMPLETE_ALL_REQUESTED, completeAllTodos),
    fork(watchClearCompletedTodos)
  ]
}

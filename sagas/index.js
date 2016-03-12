import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as ActionTypes from '../constants/ActionTypes'

export function* addTodo(action) {
  const { text: t } = action

  // why does this get called on init?
  if (!t) return

  try {
    const todo = yield call(
      api, 
      '/add-todo', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: t }) 
      }
    )

    const { _id: id, text } = todo

    yield put({ type: ActionTypes.ADD_TODO_SUCCEEDED, id, text })
  } catch (e) {
    yield put({ type: ActionTypes.ADD_TODO_FAILED, message: e.message })
  }
}

export function* editTodo(action) {
  const { id, text } = action

  // why does this get called on init?
  if (!id) return

  try {
    const todo = yield call(
      api, 
      '/edit-todo', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, text: text }) 
      }
    )

    yield put({ type: ActionTypes.EDIT_TODO_SUCCEEDED, payload: todo })
  } catch (e) {
    yield put({ type: ActionTypes.EDIT_TODO_FAILED, id, text })
  }
}

export function* deleteTodo(action) {
  const { id, text } = action

  // why does this get called on init?
  if (!id) return

  try {
    const todo = yield call(
      api, 
      '/delete-todo', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id }) 
      }
    )

    yield put({ type: ActionTypes.DELETE_TODO_SUCCEEDED, id })
  } catch (e) {
    yield put({ type: ActionTypes.DELETE_TODO_FAILED, id, text })
  }
}

export function* addSaga() {
  yield* takeLatest(ActionTypes.ADD_TODO_REQUESTED, addTodo)
}

export function* editSaga() {
  yield* takeLatest(ActionTypes.EDIT_TODO_REQUESTED, editTodo)
}

export function* deleteSaga() {
  yield* takeLatest(ActionTypes.DELETE_TODO_REQUESTED, deleteTodo)
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
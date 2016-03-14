import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

function* deleteTodo(action) {
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
        body: JSON.stringify({ id }) 
      }
    )

    yield put({ type: ActionTypes.DELETE_TODO_SUCCEEDED, id })
  } catch (e) {
    yield put({ type: ActionTypes.DELETE_TODO_FAILED, id, text })
  }
}

export default function* watchDeleteTodo() {
  yield* takeLatest(ActionTypes.DELETE_TODO_REQUESTED, deleteTodo)
}

import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

function* editTodo(action) {
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
        body: JSON.stringify({ id, text }) 
      }
    )

    yield put({ type: ActionTypes.EDIT_TODO_SUCCEEDED, payload: todo })
  } catch (e) {
    yield put({ type: ActionTypes.EDIT_TODO_FAILED, id, text })
  }
}

export default function* watchEditTodo() {
  yield* takeLatest(ActionTypes.EDIT_TODO_REQUESTED, editTodo)
}

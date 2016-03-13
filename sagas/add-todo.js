import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { put } from 'redux-saga/effects'

export default function* addTodo(action) {
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

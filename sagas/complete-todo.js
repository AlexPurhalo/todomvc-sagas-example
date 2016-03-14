import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

function* completeTodo(action) {
  const { id, completed: c } = action

  try {
    const todo = yield call(
      api, 
      '/complete-todo', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }) 
      }
    )

    const { completed } = todo

    yield put({ type: ActionTypes.COMPLETE_TODO_SUCCEEDED, id, completed })
  } catch (e) {
    yield put({ type: ActionTypes.COMPLETE_TODO_FAILED, id, c })
  }
}

export default function* completeDeleteTodo() {
  yield* takeLatest(ActionTypes.COMPLETE_TODO_REQUESTED, completeTodo)
}

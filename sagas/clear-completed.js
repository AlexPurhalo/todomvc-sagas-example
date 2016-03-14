import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

function* clearCompletedTodos(action) {
  try {
    const todo = yield call(
      api, 
      '/clear-completed', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ''
      }
    )

    yield put({ type: ActionTypes.CLEAR_COMPLETED_SUCCEEDED })
  } catch (e) {
    yield put({ type: ActionTypes.CLEAR_COMPLETED_FAILED })
  }
}

export default function* watchClearCompletedTodos() {
  yield* takeLatest(ActionTypes.CLEAR_COMPLETED_REQUESTED, clearCompletedTodos)
}

import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

function* completeAllTodos(action) {
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
    yield put({ type: ActionTypes.COMPLETE_ALL_FAILED, id, c })
  }
}

export default function* watchCompleteAllTodos() {
  yield* takeLatest(ActionTypes.COMPLETE_ALL_REQUESTED, completeAllTodos)
}

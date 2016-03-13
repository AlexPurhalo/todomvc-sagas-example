import * as ActionTypes from '../constants/ActionTypes'
import api from './api'
import { put } from 'redux-saga/effects'

export default function* fetchAllTodos(action) {
  try {
    const todos = yield call(
      api, 
      '/fetch-todos', 
      { 
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: '' 
      }
    )

    yield put({ type: ActionTypes.FETCH_TODOS_SUCCEEDED, todos })
  } catch (e) {
    yield put({ type: ActionTypes.FETCH_TODOS_FAILED, message: e.message })
  }
}
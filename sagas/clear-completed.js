import * as ActionTypes from '../constants/ActionTypes'
import api from './api'

export default function* clearCompletedTodos(action) {
  // todo pass all todos
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
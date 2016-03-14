import { put } from 'redux-saga/effects'
import { fetchTodos } from '../actions'

export default function* bootstrap() {
  yield put(fetchTodos())
}
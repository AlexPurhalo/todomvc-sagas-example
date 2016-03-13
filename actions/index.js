import * as ActionTypes from '../constants/ActionTypes'

export const fetchTodos = () => {
  return {
    type: ActionTypes.FETCH_TODOS_REQUESTED
  }
}
export const addTodo = (text) => {
  return {
    type: ActionTypes.ADD_TODO_REQUESTED,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: ActionTypes.SET_VISIBILITY_FILTER,
    filter
  }
}

export const deleteTodo = (id, text) => {
  return {
    type: ActionTypes.DELETE_TODO_REQUESTED,
    id,
    text
  }
}

export const editTodo = (id, text) => {
  return { 
    type: ActionTypes.EDIT_TODO_REQUESTED, 
    id, 
    text 
  }
}

export const completeTodo = (id, completed) => {
  return { 
    type: ActionTypes.COMPLETE_TODO_REQUESTED, 
    id,
    completed
  }
}

export const clearCompleted = () => {
  return {
    type: ActionTypes.CLEAR_COMPLETED_REQUESTED
  }
}

export const completeAll = () => {
  return { 
    type: ActionTypes.COMPLETE_ALL_REQUESTED
  }
}

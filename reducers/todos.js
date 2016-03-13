import * as ActionTypes from '../constants/ActionTypes'

const todo = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS_SUCCEEDED:
      return {
        id: state.id,
        text: state.text,
        completed: false
      }
    case ActionTypes.ADD_TODO_SUCCEEDED:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case ActionTypes.EDIT_TODO_REQUESTED:
      return Object.assign({}, 
        state, 
        { text: action.text }
      )
    case ActionTypes.COMPLETE_TODO_REQUESTED:
      return Object.assign({}, 
        state, 
        { completed: !state.completed }
      )
    case ActionTypes.COMPLETE_ALL_REQUESTED:
      return Object.assign({},
        state,
        { completed: action.completed }
      )
    default:
      return state
  }
}

const initialState = [ ]

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS_SUCCEEDED:
      return action.todos.map(t =>
          todo(t, action)
      )
    case ActionTypes.ADD_TODO_SUCCEEDED:
      return [
        ...state,
        todo(state, action)
      ]
    case ActionTypes.DELETE_TODO_REQUESTED:
      return state.filter(todo =>
        todo.id !== action.id
      )
    case ActionTypes.EDIT_TODO_REQUESTED:
      return state.map(t =>
        t.id === action.id ?
          todo(t, action) :
          t
      )
    case ActionTypes.COMPLETE_TODO_REQUESTED:
      return state.map(t =>
        t.id === action.id ?
          todo(t, action) :
          t
      )
    case ActionTypes.CLEAR_COMPLETED_REQUESTED:
      return state.filter(todo => !todo.completed)
    case ActionTypes.COMPLETE_ALL_REQUESTED:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(t => 
        todo(
          t, 
          { type: action.type, completed: !areAllMarked }
        )
      )
    default:
      return state
  }
}

export default todos

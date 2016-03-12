import * as ActionTypes from '../constants/ActionTypes'

const todo = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO_SUCCEEDED:
      return {
        id: action.payload._id,
        text: action.payload.text,
        completed: false
      }
    case ActionTypes.EDIT_TODO:
      return Object.assign({}, 
        state, 
        { text: action.text }
      )
    case ActionTypes.COMPLETE_TODO:
      return Object.assign({}, 
        state, 
        { completed: !state.completed }
      )
    case ActionTypes.COMPLETE_ALL:
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
    case ActionTypes.ADD_TODO_SUCCEEDED:
      return [
        ...state,
        todo(state, action)
      ]
    case ActionTypes.DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )
    case ActionTypes.EDIT_TODO:
      return state.map(t =>
        t.id === action.id ?
          todo(t, action) :
          t
      )
    case ActionTypes.COMPLETE_TODO:
      return state.map(t =>
        t.id === action.id ?
          todo(t, action) :
          t
      )
    case ActionTypes.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed)
    case ActionTypes.COMPLETE_ALL:
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

import expect from 'expect'
import * as actions from '../../actions'
import * as ActionTypes from '../../constants/ActionTypes'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO_REQUESTED action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: ActionTypes.ADD_TODO_REQUESTED,
      text: 'Use Redux'
    })
  })

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: ActionTypes.SET_VISIBILITY_FILTER,
      filter: 'active'
    })
  })

  it('deleteTodo should create DELETE_TODO_REQUESTED action', () => {
    expect(actions.deleteTodo(1, 'Use Redux')).toEqual({
      type: ActionTypes.DELETE_TODO_REQUESTED,
      id: 1,
      text: 'Use Redux'
    })
  })

  it('editTodo should create EDIT_TODO_REQUESTED action', () => {
    expect(actions.editTodo(1, 'Use Redux')).toEqual({
      type: ActionTypes.EDIT_TODO_REQUESTED,
      id: 1,
      text: 'Use Redux'
    })
  })

  it('completeTodo should create COMPLETE_TODO_REQUESTED action', () => {
    expect(actions.completeTodo(1, false)).toEqual({
      type: ActionTypes.COMPLETE_TODO_REQUESTED,
      id: 1,
      completed: false
    })
  })

  it('clearCompleted should create CLEAR_COMPLETED_REQUESTED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: ActionTypes.CLEAR_COMPLETED_REQUESTED
    })
  })

  it('completeAll should create COMPLETE_ALL_REQUESTED action', () => {
    expect(actions.completeAll()).toEqual({
      type: ActionTypes.COMPLETE_ALL_REQUESTED
    })
  })
})

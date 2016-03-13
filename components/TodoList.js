import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

class TodoList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const {
      completedCount, 
      todos, 
      deleteTodo, 
      editTodo, 
      completeTodo,
      completeAll 
    } = this.props;

    return (
      <section className="main">
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={() => completeAll()} />

        <ul className="todo-list">
          {todos.map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={() => deleteTodo(todo.id, todo.text)}
              editTodo={(text) => editTodo(todo.id, text)}
              completeTodo={() => completeTodo(todo.id, todo.completed)}
            />
          )}
        </ul>
      </section>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired
}

export default TodoList

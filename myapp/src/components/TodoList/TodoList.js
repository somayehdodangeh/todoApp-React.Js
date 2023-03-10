import React, { Component } from 'react'
import Todo from "../Todo/Todo"
import './TodoList.css';


export default class TodoList extends Component {

  constructor(props){
    super(props)
    this.state={
      todos :[],
      todoTitle : '',
      status :'all'
    }

    this.todoTitleHandler=this.todoTitleHandler.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo=this.removeTodo.bind(this)
    this.editTodo=this.editTodo.bind(this)
    this.statusHandler=this.statusHandler.bind(this)
  }

  todoTitleHandler(event){
    console.log(event.target.value);

    this.setState({
      todoTitle: event.target.value
    })
    
  }

  addTodo(event){
    event.preventDefault();
     if (!this.state.todoTitle.length) return;

   let  newTodoObject = {
      id: this.state.todos.length + 1,
      title : this.state.todoTitle,
      completed : false
    }

    this.setState (prevState => {
      return {
        todos : [...prevState.todos, newTodoObject],
        todoTitle : '',
      }
    })
  }


  removeTodo(todoId){
    console.log(todoId);
    let newTodo= this.state.todos.filter (todo => {
      return todo.id !== todoId
    })
    console.log(newTodo);
    this.setState({
      todos: newTodo
    })

  }

  editTodo(todoId){
    console.log(todoId);

    let newTodos= [...this.state.todos]

    newTodos.forEach (todo => {
           if (todo.id === todoId){
             todo.completed = !todo.completed  
}
    })
    console.log(newTodos);
    this.setState({todos : newTodos})
  }


  statusHandler(event){
    this.setState({
      status : event.target.value
    })
  }


  render() {
    return (
      <>
        <form onSubmit={this.addTodo}>
            <input class="todo-input" type="text" maxLength="40" value={this.state.todoTitle}
             onChange={this.todoTitleHandler} />
           <button class="todo-button" type="submit"> + </button>
           <div class="select">
            <select name="todos" class="filter-todo" onChange= {this.statusHandler}>
                <option value="all">All</option>
                <option value="completed">completed</option>
                <option value="uncompleted">uncompleted</option>

            </select>

           </div>

        </form>

        <div className="todo-container">
          <ul className="todo-list">

          {this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed).map ( todo => (
              <Todo {...todo} key={todo.id}  onRemove={this.removeTodo} onEdit= {this.editTodo}/>
            ))}  

         {this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.completed).map ( todo => (
              <Todo {...todo} key={todo.id}  onRemove={this.removeTodo} onEdit= {this.editTodo}/>
            ))}  

            {this.state.status=== 'all' && this.state.todos.map(todo => (
              <Todo {...todo} key={todo.id}  onRemove={this.removeTodo} onEdit= {this.editTodo}/>
            ))}

          </ul>
        </div>
      </>
    )
  }
}

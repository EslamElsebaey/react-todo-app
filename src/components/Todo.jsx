import React from 'react'
import FeatherIcon from 'feather-icons-react';

function Todo({todo , toggleDone , deleteTodo , editTodo , mode , bookmarkTodo}) {
  return (
    <div className={`todos-todo ${todo.done ? `done` : ``} ` } >
      <div className="todos-todo_icon" onClick={()=>toggleDone(todo.id)}>  <FeatherIcon icon={todo.done ? "check-circle" : "circle"} size="22" />   </div>
      <div className="todos-todo_text"> {todo.title}</div>
      {mode !== "edit" ? (  <div className="todos-todo_cta">  
      <div onClick={()=> bookmarkTodo(todo.id)}  className="todos-todo_cta-bookmark">
      <FeatherIcon size="23" className={todo.pinned ? "isPinned" : ""}  icon="bookmark" />
      </div>
      <div className="todos-todo_cta-edit" onClick={ ()=> editTodo(todo)}>
      <FeatherIcon icon="edit" size="23" />
      </div>
      <div onClick={()=> deleteTodo(todo.id)} className="todos-todo_cta-delete">
      <FeatherIcon icon="trash-2" size="23" />
      </div>
      </div>) : ""}
    
    </div>
  )
}

export default Todo

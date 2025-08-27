import React, { useState  } from 'react'
import Todos from './../components/Todos';
import TodosForm from './../components/TodosForm';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/themes/default.rtl.css';
import 'alertifyjs/build/css/alertify.rtl.css';
import sound from "../assets/complete-task.mp3"


// alertify js edit

alertify.defaults.glossary.ok = 'موافق';
alertify.defaults.glossary.cancel = 'إلغاء';


const initialData = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []


function TodoList() {



const [todos , setTodos] = useState(initialData);
// mode  =>  add , filter , edit
const [mode , setMode] = useState("add");
const [activeTodo , setActiveTodo] = useState(null);
 

// set to local 
function setToLocal (){
  localStorage.setItem("todos" , JSON.stringify(todos))
}

// Toggle done in Todo
// play sound when done
function playSound (){
  new Audio(sound).play()
}
function toggleDone (id){
 let newTodos = todos.map(todo => {
  if(todo.id === id){
    todo.done = !todo.done
    if(todo.done){
      playSound()
    }
  }
  return todo
 })

 setTodos(newTodos)
}

// Delete Todo 
function deleteTodo (id){
  alertify.confirm(   "حذف مهمة", 
    "هل تريد حذف المهمة ؟", function(){
      let newTodos = todos.filter(todo =>  todo.id !== id )
      setTodos(newTodos)
    }, function(){});
 
}





// Add Todo 
function addNewTodo (title , id){
  if(mode !== "edit"){
    const newTodo = {
      id : Math.random() ,
      title : title , 
      done : false , 
      pinned : false
    }
    const existingPinnedTodos = todos.filter((todo) => todo.pinned === true);
   let newtodos = todos.filter(todo => todo.pinned === false);  
     if (existingPinnedTodos.length > 0) {
      setTodos([...existingPinnedTodos , newTodo , ...newtodos])
    } else {
      setTodos((data) => {
        return [newTodo , ...data ];
      });
    }
  }else if (mode === "edit"){
    const newTodos = todos.map(td => {
      if(td.id ===  activeTodo.id){
         td.title = title
      }
      return td
    })
    setTodos(newTodos)
    setMode("add");
  }
 

}



// Filter Todos
function toggleFilter(){
  if(mode === "edit"){
    return
  }
  if(mode === "filter"){
    setMode("add")
  }else {
    setMode("filter")
  }
}


// bookmark todo 

function bookmarkTodo (id) {
  const todoToBookmark = todos.find(todo => todo.id === id);
  todoToBookmark.pinned = !todoToBookmark.pinned;
  let todosWithBookmarked = todos.filter(todo => todo.pinned === true);
  const todosWithoutBookmarked = todos.filter(todo => todo.pinned === false);
  setTodos([...todosWithBookmarked ,  ...todosWithoutBookmarked]) 
}




// Edit todo

function editTodo(todo) {
  setMode("edit");
  setActiveTodo(todo);
}

let currentTodos = [...todos];

if(mode === "filter"){
  currentTodos =  todos.filter(todo => !todo.done );
}

if(mode === "edit" && activeTodo){
  currentTodos = [activeTodo]
}


setToLocal()




  return (
    <>
      <header>
      <h1>قائمة المهام ({todos.length})</h1>
    </header>
    <main>
        <div className='container'>
      <div className="todos">
      <TodosForm 
        activeTodo={activeTodo}
        mode={mode}
        addNewTodo={addNewTodo}
        toggleFilter={toggleFilter}/>
      <Todos
        mode={mode}
        editTodo={editTodo} 
        deleteTodo={deleteTodo} 
        toggleDone={toggleDone}
        bookmarkTodo ={bookmarkTodo}
        todos= {currentTodos} />
      </div>
        </div>
    </main>
    </>
    
    
  )
}

export default TodoList

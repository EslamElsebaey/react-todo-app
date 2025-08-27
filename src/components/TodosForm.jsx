import React, {  useState  } from 'react'
import FeatherIcon from 'feather-icons-react';

function TodosForm({addNewTodo , toggleFilter , mode , activeTodo}) {
 
  
  const [title, setTitle] = useState("");
  const [editRender, setEditRender] = useState(false)
 
 


 
    if(mode === "edit" && !editRender){
      setTitle(activeTodo.title);
      setEditRender(true)
    }
  

 
    
 

  function handleTitleChange(e) {
    setTitle(e.target.value)  ;
    
  }



  function handleAddNewTodo(){
    setEditRender(false)
    if(!title.trim()){
      return
    }
    addNewTodo(title)
    setTitle('')
   
  }


  const handleKeyUpToAddNewTodo = (event) => {
    if(!title.trim()){
      return
    }
    if (event.key === 'Enter') {
      addNewTodo(title)
      setTitle('')
    }
  }

  return (
    <div className='todos-form'>
      <div title='Filter todos' onClick={toggleFilter}  className={`todos-form_icon ${mode === "filter" ? "active" : ""} `}>
      <FeatherIcon icon="circle" />
      </div>
      <div className='todos-form_form'>
        <input onKeyUp={handleKeyUpToAddNewTodo}  value= {title} onChange={handleTitleChange} type="text" placeholder='اضف مهمة جديدة' />
      </div>
      <div className='todos-form_submit'>
        <button disabled = {!title.trim()} onClick={ () => handleAddNewTodo()} className='btn '> {mode === "edit" ? "تعديل" : "اضافة"} </button>
      </div>
    
    </div>
  )
}

export default TodosForm

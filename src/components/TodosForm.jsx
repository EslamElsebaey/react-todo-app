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
          if (!event.shiftKey) {
              // Enter عادي → اضيف تودو
              addNewTodo(title);
              setTitle('');
              event.preventDefault(); // منع أي سلوك افتراضي
          }
          // لو Shift + Enter → خليها تعمل سطر جديد طبيعي
          // مش محتاج تعمل حاجة، default behavior هيمشي
      }
  }

  return (
    <div className='todos-form'>
      <div title='Filter todos' onClick={toggleFilter}  className={`todos-form_icon ${mode === "filter" ? "active" : ""} `}>
      <FeatherIcon icon="circle" />
      </div>
      <div className='todos-form_form'>
        <textarea onKeyUp={handleKeyUpToAddNewTodo}  value= {title} onChange={handleTitleChange}  placeholder='اضف مهمة جديدة' />
      </div>
      <div className='todos-form_submit'>
        <button disabled = {!title.trim()} onClick={ () => handleAddNewTodo()} className='btn '> {mode === "edit" ? "تعديل" : "اضافة"} </button>
      </div>
    
    </div>
  )
}

export default TodosForm

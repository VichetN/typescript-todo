import React, { useState } from 'react';
import './App.css';
import { InputField, TodoList } from './components';
import { TodoModel } from './models/todoModel';
import { DragDropContext,DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<TodoModel[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoModel[]>([])

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo('')
    }
  }

  const onDragEnd = (result:DropResult)=>{
    const {source, destination} = result

    if(!destination)return

    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return
    }
    
    let add, active=todos, completed=completedTodos;

    if(source.droppableId === 'TodosList'){
      add = active.splice(source.index,1)[0]
      active = [...active]
    }else{
      add = completed.splice(source.index,1)[0]
      completed = [...completed]
    }

    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index,0,{...add,isDone:false})
    }else{
      completed.splice(destination.index,0,{...add,isDone:true})
    }

    setCompletedTodos([...completed])
    setTodos([...active])

  }

  return (
    <DragDropContext  onDragEnd={onDragEnd} >
      <div className="App">
        <span className='heading'>Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAddTodo} />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />

      </div>
    </DragDropContext>
  );
}

export default App;

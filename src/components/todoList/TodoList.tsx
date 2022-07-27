import React from 'react'
import { TodoModel } from '../../models/todoModel'
import { SingleTodo } from '../'
import { Droppable } from 'react-beautiful-dnd'

import './styles.css'

interface Props {
    todos: TodoModel[],
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
    completedTodos: TodoModel[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
}

const TodoList = ({ todos, setTodos,completedTodos,setCompletedTodos }: Props) => {
    return (
        <div className='container'>
            <Droppable droppableId="TodosList">
                {(provided,snapshot) => (
                    <div 
                    className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    >
                        <span className="todos__heading">
                            Active Tasks
                        </span>
                        {todos.map((todo,index) => (
                            <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
                
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div className={`todos remove  ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Completed Tasks
                        </span>
                        {completedTodos.map((todo,index) => (
                            <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    )
}

export default TodoList
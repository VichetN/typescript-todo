import React, { useState } from 'react'
import { TodoModel } from '../../models/todoModel'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

import './styles.css'

interface Props {
    index: number,
    todo: TodoModel,
    todos: TodoModel[],
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDelete = (id: unknown) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleDone = (id: unknown) => {
        setTodos(todos.map(todo => ({ ...todo, isDone: todo.id === id ? !todo.isDone : todo.isDone })))
    }

    const handleEdit = (e: React.FormEvent, id: unknown) => {
        e.preventDefault()
        setTodos(todos.map(todo => ({ ...todo, todo: todo.id === id ? editTodo : todo.todo })))
        setIsEditing(false)
    }

    return (
        <Draggable draggableId={`draggable-${todo.id}`} index={index}>
            {
                (provided, snapshot) => (
                    <form 
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                    onSubmit={(e) => handleEdit(e, todo.id)} 
                    {...provided.draggableProps }
                    {...provided.dragHandleProps }
                    ref={provided.innerRef}
                    >

                        {
                            isEditing ?
                                (<input autoFocus className='todos__single--text' onChange={(e) => setEditTodo(e.target.value)} value={editTodo} />)
                                :
                                todo.isDone ?
                                    (<s className='todos__single--text'>{todo.todo}</s>)
                                    :
                                    (<span className='todos__single--text'>{todo.todo}</span>)
                        }

                        <div>
                            <span className='icon' onClick={() => {
                                if (isEditing && todo.isDone) {
                                    return
                                }
                                setIsEditing(!isEditing)
                            }}>
                                <AiFillEdit />
                            </span>
                            <span className='icon' onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            {/* <span className='icon' onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span> */}
                        </div>
                    </form >
                )
            }

        </Draggable>

    )
}

export default SingleTodo
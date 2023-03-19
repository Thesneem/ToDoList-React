import React, { useState } from 'react'
// import { Button } from 'react-bootstrap';
import './todo.css'
import { TiTickOutline } from 'react-icons/ti';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';



const Todo = () => {

  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(0)
  const date = Date()
  const storeTodos = () => {
    if (input !== '') {
      setTodos([...todos, { listItem: input, id: Date.now(), status: false }])
      console.log(todos)
      setInput('')
    }
    if (editId) {
      console.log(editId + 'JIj')
      const editTodo = todos.find((toDo) => toDo.id === editId)
      const updateTodo = todos.map((todo) => todo.id === editTodo.id ?
        (todo = { id: todo.id, listItem: input })
        : (todo = { id: todo.id, listItem: todo.listItem }))
      console.log(updateTodo + 'khkhkl')

      setTodos(updateTodo)
      setEditId(0)
      setInput('')

    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const Delete = (id) => {

    setTodos(todos.filter((data) => data.id !== id)

    )

  }

  const Complete = (id) => {
    let complete = todos.map((data) => {
      if (data.id === id) {
        return ({ ...data, status: !data.status })
      }
      return data
    })
    setTodos(complete)
  }
  const Edit = (id) => {
    const editTodo = todos.find((data) => data.id === id)
    setInput(editTodo.listItem)
    setEditId(editTodo.id)
  }

  return (
    <div className='container'>
      <h2 className='text-white'>ToDo List <span>-{new Date(date).toLocaleDateString()}</span></h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type='text' value={input} placeholder='Enter your task' className='form-control' onChange={(event) => setInput(event.target.value)} />
        <button onClick={storeTodos}>{editId ? 'Edit' : '+'}</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((item) => (
              <li className='list-items'>
                <div className='list-item-list' id={item.status ? 'list-item' : ''}>{item.listItem}</div>
                <span>
                  <TiTickOutline className='list-item-icon' id='complete' title='Complete' onClick={() => Complete(item.id)} />
                  <FaRegEdit className='list-item-icon' id='edit' title='Edit' onClick={() => Edit(item.id)} />
                  <MdOutlineDelete className='list-item-icon' id='delete' title='Delete' onClick={() => Delete(item.id)} />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todo
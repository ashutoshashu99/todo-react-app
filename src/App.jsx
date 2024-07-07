import { useState, useEffect } from 'react'
import { TodoProvider, TodoContext, useTodo } from './todoContext/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItems from './components/TodoItems'

function App() {
  const  [todos, setTodos]  = useState([])  

  //adding a todo in array
  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo}, ...prev])
  }


  //marking complete in array 
  // const toggleCompleted = (id)=>{
  //   todos.map((todo)=>{
  //     if(todo.id===id){
  //       setCompleted({completed:true, ...todo})
  //     }
  //    })
  // }
  const toggleCompleted = (id)=>{
    setTodos((prev)=> 
      prev.map((prevtodo)=>
        prevtodo.id===id ? {...prevtodo, completed: !prevtodo.completed} : prevtodo)

    )
  }
  
  
  //update
 const updateTodo = (id, todo)=>{
   setTodos((prev)=>prev.map((prevtodo)=> (prevtodo.id===id ? todo : prevtodo)))
 } 

 const deleteTodo = (id)=>{
  setTodos((prev)=>prev.filter((prevtodo)=> prevtodo.id != id ))
 }


 //localStorage

 useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])


  return (
    <TodoProvider value={{todos, addTodo, toggleCompleted, updateTodo, deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-9 ">
        <div className=" w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your To-Do  </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItems todo={todo}/>
              </div>
            ))}

          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

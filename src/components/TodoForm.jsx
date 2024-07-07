import React, { useState } from 'react'
import { useTodo } from '../todoContext/TodoContext'

function TodoForm() {
    const [todo, setTodo]=useState("")
    const {addTodo} = useTodo()
    
    const add = (event)=>{
        event.preventDefault()

        if(!todo) return
        
        addTodo({todo:todo, completed:false})
        // console.log(todos); 
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    )
}

export default TodoForm

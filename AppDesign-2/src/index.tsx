import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import FlavorForm from './flavorForm'
import Carousel from './ClickMove'

import Tabs from './Tab'

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
    text : string
    complete : boolean
}

// interface ITodo2 extends ITodo {
//     tags : string
// }

export default function App(): JSX.Element {
    const [value,setValue] = useState<string>('')
    const [todos, setTodos] = useState<ITodo[]>([])

    // debugger // help us to debug the code, with the console open

    // const sum = (a:number,b:number):number => a + b

    const handleSubmit = (e:FormElem):void => {
        e.preventDefault()
        addTodo(value)
        setValue('')
    }

    const addTodo = (text : string):void => {
        const newTodos : ITodo[] = [...todos, {text,complete:false}]
        setTodos(newTodos)
    }

    const completeTodo = (index:number):void => {
        const newTodos:ITodo[] = [...todos]
        newTodos[index].complete = !newTodos[index].complete
        setTodos(newTodos)
    }

    const removeTodo = (index:number):void => {
        const newTodos:ITodo[] = [...todos]
        newTodos.splice(index,1) // [0,1,2,3].splice(2,1)
        setTodos(newTodos)
    }

    console.log(todos)

    return (
        <>
        <Fragment>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
                <button type="submit">Add Todo</button>
            </form>
            <section>
                {todos.map((todo : ITodo, index : number) => (
                    <Fragment key = {index}>
                        <div style={{textDecoration:todo.complete ? 'line-through': ''}}>{todo.text}</div>
                        <button type='button' onClick = {() => completeTodo(index)}>
                            {' '}
                            {todo.complete ? 'Incomplete' : 'Complete'}
                            {' '}
                        </button>
                        <button type='button' onClick = {() => removeTodo(index)}>
                            &times;
                        </button>
                    </Fragment>
                ))}
            </section>
        </Fragment>
        <Fragment>
            <h1>
                Flavor Form
            </h1>
            <FlavorForm/>
        </Fragment>
        <Fragment>
            <Carousel width={50} height={50} >
            <image>a</image>
            <image>b</image>
            </Carousel>
        </Fragment>
        <Tabs>
            <Tabs.Title>Title</Tabs.Title>
            <Tabs.Item id = "1">item1</Tabs.Item>
            <Tabs.Item id = "2">item2</Tabs.Item>
        </Tabs>
        </>
    )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />,root)
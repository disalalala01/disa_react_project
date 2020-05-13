 import React,{useEffect} from 'react';
 import TodoList from './Todo/TodoList'
 import Context from './context'
import Loader from './Loader'
import Modal from './Model/Modal'

const AddTodo = React.lazy(() =>  new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./Todo/AddTodo'))
  }, 1000)
}))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  // let todos = [
  //   {id: 1, completed: false, title: 'Buy BRED'},
  //   {id: 2, completed: false, title: 'Buy Butter'},
  //   {id: 3, completed: false, title: 'Buy Milk'},
  // ]

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 1000)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  )
  }

function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id  !==  id))
}

function addTodo(title) {
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    completed: false
  }]))
}

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.lenth ? (
          <TodoList todos={todos} onToggle={toggleTodo}/>
        ) : loading ? null : (
          <p>NO Todos!</p>
        ) }
        <TodoList todos={todos} onToggle={toggleTodo}/>
      </div>
    </Context.Provider>
  )
}

export default App;

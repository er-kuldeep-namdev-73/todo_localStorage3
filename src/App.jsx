import React, { useState, useEffect, useRef } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Add from './Components/Add'
import Completed from './Components/Completed'
import Pending from './Components/Pending'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Show from './Components/Show'
const App = () => {

  const [todoData, setTodoData] = useState([])
  const [check, setCheck] = useState(true)
  const[copyTodoData,setTodoCopyData]=useState([...todoData])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todoData"))
    if (data) {
      setTodoData(data)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData))
  }, [todoData])



  return (
    <div className='container'>
      <Add todoData={todoData} setTodoData={setTodoData} copyTodoData={copyTodoData} setTodoCopyData={setTodoCopyData}/>
      <Show todoData={todoData} setTodoData={setTodoData} check={check} copyTodoData={copyTodoData} setTodoCopyData={setTodoCopyData}/>
      {/* <div className='row'>
        <div className='col-6 border-end border-2 border-dark'>
          <Pending todoData={todoData} setTodoData={setTodoData} check={check} />
        </div>
        <div className='col-6'>
          <Completed todoData={todoData} setTodoData={setTodoData} check={check} />
        </div>
      </div> */}
      <ToastContainer />
    </div>
  )
}

export default App
import React from 'react'
import Show from './Show'
import { Button } from '@mui/material'

const Completed = ({ todoData, check, setTodoData }) => {

  let completedData = todoData.filter(todo => todo.status);

  function handleAllDelete() {
   let allDel=window.confirm("Do You want to Delete All Item !")
   if(allDel){
    let clearData = todoData.filter((todo) => {
      return todo.status === false
    })
    setTodoData(clearData)
   }
  }

  return (
    <div className='bg-dark m-5 text-light rounded p-1'>
      <p className='fs-5 float-start m-2'>Completed</p>
      {
        completedData.length !== 0 &&
        <>
          <div className='d-inline'>
            <Button variant="contained" color="success" className="ms-5 float-end m-2" onClick={handleAllDelete}>Clear All Completed Task</Button>
          </div>
        </>
      }
      <Show todoData={todoData} check={check} list={completedData} setTodoData={setTodoData} />
    </div>
  )
}

export default Completed
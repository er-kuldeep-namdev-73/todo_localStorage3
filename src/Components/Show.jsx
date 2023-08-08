import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'

const Show = ({ todoData, setTodoData, copyTodoData, setTodoCopyData }) => {
    if (todoData.length == 0 && copyTodoData.length == 0)
        return;

    const [archiveData, setArchiveData] = useState([])

    let completedData = todoData.filter(todo => todo.status);


    const handleStatusChange = (e, id) => {
        let copyTodoData = [...todoData]
        copyTodoData.map(todo => {
            if (todo.id === id) {
                todo.status = !todo.status
            }
        })
        setTodoData(copyTodoData)
        setTodoCopyData(copyTodoData)
    }

    function handleAllDelete() {
        let allDel = window.confirm("Do You want to Delete All Item !")
        if (allDel) {
            let clearData = todoData.filter((todo) => {
                return todo.status === false
            })
            setArchiveData(todoData.filter((todo) => {
                return todo.status !== false
            }))
            setTodoData(clearData)
            setTodoCopyData(clearData)
        }
    }

    function handleArchieve() {
        setTodoData([...todoData, ...archiveData])
        setArchiveData([])
        setTodoCopyData([...todoData, ...archiveData])
    }

    function handleDelete(e, id) {
        let del = window.confirm(`Do You Want to Delete this Item!`)
        if (del) {
            let removeData = [...todoData];
            removeData = removeData.filter((todo) => {
                return todo.id !== id
            })
            setTodoData(removeData)
            setTodoCopyData(removeData)
        }
    }
    function handleCompleted() {
        let copyTodoData = [...todoData]
        copyTodoData = copyTodoData.filter((todo) => {
            return todo.status === true
        })
        setTodoCopyData(copyTodoData)
    }
    function handleAllData() {
        let copyTodoData = [...todoData]
        setTodoCopyData(copyTodoData)
    }

    function handlePending() {
        let copyTodoData = [...todoData]
        copyTodoData = copyTodoData.filter((todo) => {
            return todo.status !== true
        })
        setTodoCopyData(copyTodoData)
    }

    function handleChangeSelect(e){
        let copyTodoData = [...todoData]
        if(e.target.value){
            copyTodoData = copyTodoData.filter((todo) => {
                return todo.priority === e.target.value
            })
            setTodoCopyData(copyTodoData)
        }
    }
    function handleChangeInput(e){
        let copyTodoData = [...todoData]
        setTimeout(()=>{
            if(e.target.value){
                copyTodoData = copyTodoData.filter((todo) => {
                    return todo.title === e.target.value
                })
                setTodoCopyData(copyTodoData)
            }
        },1000)
    }
    useEffect(() => {
        handleAllData()
    }, [])

    return (
        <>

            <div className='bg-dark mt-5 text-light rounded p-3'>
               <div className="justify-content-start d-flex">
               {
                archiveData.length!==0 && <Button variant='contained' color="success" className="mt-2 mb-3 float-start" onClick={handleArchieve}>Archived</Button> 
               }
                <Button className="mt-2 ms-1 mb-3" onClick={handleAllData} style={{ cursor: "pointer", color: "white" }}>all</Button>
                <Button className="mt-2 ms-1 mb-3" onClick={handleCompleted} style={{ cursor: "pointer", color: "white" }}>Completed</Button>
                <Button className='mt-2 ms-1 mb-3' onClick={handlePending} style={{ cursor: "pointer", color: "white" }}>Pending</Button>
                <select className='form-select w-25 mt-2 ms-1 mb-3 bg-dark text-light' onClick={handleChangeSelect}>
                    <option selected disabled>---Please Select Priority---</option>
                    <option value="high" className='text-danger'>High</option>
                    <option value="medium" className='text-warning'>Medium</option>
                    <option value="low" className='text-success'>Low</option>
                </select>
                <input type="text" className="form-control w-25 mt-2 ms-1 mb-3 bg-dark text-light" onChange={handleChangeInput}/>
                {/* <Button className="mt-2 ms-1 mb-3" style={{ cursor: "pointer" , color: "white"}}>Search</Button> */}
                {
                    completedData.length !== 0 &&
                    <>
                        <div className='d-inline'>
                            <Button variant="contained" color="error" className="float-end my-2 ms-1" onClick={handleAllDelete}>Clear All Completed Task</Button>
                        </div>
                    </>
                }
                </div>
                <table className='table table-striped rounded'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Completed</th>
                            <th>Item Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        copyTodoData.length !== 0 && copyTodoData.map((data, index) => {
                            return (
                                <tbody key={index + 1}>
                                    <tr key={index + 2} title={`priority : ${data.priority}`}>
                                        <td key={index + 3}>{index + 1}</td>
                                        <td key={index + 4}><input type="checkbox" onChange={(e) => handleStatusChange(e, data.id)} checked={data.status} /></td>
                                        <td key={index + 5} >{
                                            data.priority === "high" ? <p className='fs-5 text-danger'>{data.title}</p> : data.priority === "medium" ? <p className='fs-5 text-warning'>{data.title}</p> : data.priority === "low" ? <p className='fs-5 text-success'>{data.title}</p> : <p>{data.title}</p>
                                        }</td>
                                        <td>
                                            {
                                                data.status === false ? <p>Pending</p> : <p>Completed</p>
                                            }
                                        </td>
                                        {
                                            data.status === false ? <td><button key={index} className='btn btn-danger' onClick={(e) => handleDelete(e, data.id)}>Delete</button></td> : <td></td>
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
                <p className='m-3'>{todoData.length} item(s) left</p>
            </div>
        </>
    )
}

export default Show
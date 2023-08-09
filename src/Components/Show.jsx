import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArchiveIcon from '@mui/icons-material/Archive';


const Show = ({ todoData, setTodoData, copyTodoData, setTodoCopyData, archiveData, setArchiveData }) => {

    if (todoData.length == 0 && copyTodoData.length == 0)
        return;

    //start State
    const [searchData, setSearchData] = useState({
        priority: "",
        title: "",
        tab: ''
    })
    //end State

    //start status filter
    let completedData = todoData.filter(todo => todo.status);
    //end status filter

    //start handleStatusChange function
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
    //End handleStatusChange function


    //Start AllDelete function
    function handleAllDelete() {
        let allDel = window.confirm(`Do You want to Delete {}  Item !`)
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
        console.log(archiveData);
    }
    //End AllDelete function

    //Start Archieve function
    function handleArchieve() {
        setTodoData([...todoData, ...archiveData])
        setArchiveData([])
        setTodoCopyData([...todoData, ...archiveData])
    }
    //End Archieve function

    //Start Delete Function
    function handleDelete(e, id, title) {
        // console.log(title)
        let del = window.confirm(`Do You Want to Delete ${title} Item!`)
        if (del) {
            let removeData = [...todoData];
            removeData = removeData.filter((todo) => {
                return todo.id !== id
            })
            setTodoData(removeData)
            setTodoCopyData(removeData)
        }
    }
    //End Delete function

    //Start completed show function
    function handleCompleted() {
        let copyTodoData = [...todoData]
        copyTodoData = copyTodoData.filter((todo) => {
            return todo.status === true
        })
        setTodoCopyData(copyTodoData)
        setSearchData({ ...searchData, tab: "completed" })
    }
    //end completed show function

    //start AllData function
    function handleAllData(e) {
        let copyTodoData = [...todoData]
        setTodoCopyData(copyTodoData)
        setSearchData({ ...searchData, tab: "all" })

        // console.log(value)
    }
    //End AllData function

    //Start Pending function
    function handlePending() {
        let copyTodoData = [...todoData]
        copyTodoData = copyTodoData.filter((todo) => {
            return todo.status !== true
        })
        setTodoCopyData(copyTodoData)
        setSearchData({ ...searchData, tab: "pending" })

    }
    //end pending function

    //Start SelectChanges function
    // function handleChangeSelect(e){
    //     let copyTodoData = [...todoData]
    //     // console.log(e.target.value)
    //     // if(e.target.value === "selected1"){
    //         // setSearchData({...searchData,[e.target.name]:e.target.value})
    //         // handleAllData()
    //         // setTodoData(copyTodoData)
    //     // }
    //     // else if(e.target.value){
    //         // copyTodoData = copyTodoData.filter((todo) => {
    //         //     return todo.priority === e.target.value
    //         // })
    //         setSearchData({...searchData,[e.target.name]:e.target.value})
    //         setTodoCopyData(copyTodoData)
    //     // }

    // }
    //End SelectChanges function

    //Start handleChangeInput Function
    function handleChange(e) {
        // let copyTodoData = [...todoData]
        // console.log(e.target.value)
        // if(e.target.value){
        //     copyTodoData = copyTodoData.filter((todo) => {
        //         return todo.title === e.target.value
        //     })
        // setTodoCopyData(copyTodoData)
        setSearchData({ ...searchData, [e.target.name]: e.target.value })

        // }
        // else if(e.target.value===""){
        //     handleAllData()
        // }
    }
    //End handleChangeInput Function

    //start Search Function
    function handleSearch() {
        // console.log(copyTodoData)
        let copyData = [...copyTodoData];



        if (searchData.tab === "all") {
            copyData = [...todoData]
        }

        else if (searchData.tab === "completed") {
            copyData = [...todoData.filter(todo => todo.status === true)]
        }
        else {
            copyData = [...todoData.filter(todo => todo.status === false)]

        }
        if (searchData.title && searchData.priority) {
            setTodoCopyData(copyData.filter((todo) => {
                return todo.title.toLowerCase().includes(searchData.title.toLowerCase()) && todo.priority === searchData.priority
            }))
        }
        else if (searchData.title) {
            setTodoCopyData(copyData.filter((todo) => {
                return todo.title.toLowerCase().includes(searchData.title.toLowerCase())
            }))
        }
        else if (searchData.priority) {
            setTodoCopyData(copyData.filter((todo) => {
                return todo.priority === searchData.priority
            }))
        }
        // console.log(searchData)
    }
    //End Search function
    useEffect(() => {
        handleAllData()
    }, [])

    return (
        <>

            <div className='bg-dark mt-5 text-light rounded p-3'>
                <div className="justify-content-start d-flex">
                    {
                        archiveData.length !== 0 && <Button variant='contained' color="success" className="mt-2 mb-3 float-start" onClick={handleArchieve} endIcon={<ArchiveIcon />}>Archived {archiveData.length}</Button>
                    }
                    <Button className="mt-2 mb-3 btn btn-danger" onClick={handleAllData} style={{ cursor: "pointer", color: "white" }} value="all">all</Button>
                    <Button className="mt-2  mb-3" onClick={handleCompleted} style={{ cursor: "pointer", color: "white" }}>Completed</Button>
                    <Button className='mt-2  mb-3' onClick={handlePending} style={{ cursor: "pointer", color: "white" }}>Pending</Button>
                    <select className='form-select w-25 mt-2  mb-3 bg-dark text-light' onChange={handleChange} name="priority">
                        <option value="selected1" selected disabled>---Please Select Priority---</option>
                        <option value="high" className='text-danger'>High</option>
                        <option value="medium" className='text-warning'>Medium</option>
                        <option value="low" className='text-success'>Low</option>
                    </select>
                    <input type="text" className="form-control w-25 mt-2 ms-1 mb-3 " onChange={handleChange} name="title" placeholder='Enter Item Name for Search' />
                    <Button className="mt-2 ms-1 mb-3" style={{ cursor: "pointer" }} variant='contained' onClick={handleSearch} endIcon={<SearchIcon />}>Search</Button>
                    {
                        completedData.length !== 0 &&
                        <>
                            <div className='d-inline'>
                                <Button variant="contained" color="error" className="my-2 ms-1" onClick={handleAllDelete} endIcon={<DeleteIcon />}>Clear All Completed {completedData.length}</Button>
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
                        copyTodoData.length !== 0 ? copyTodoData.map((data, index) => {
                            return (
                                <tbody key={index + 1}>
                                    <tr key={index + 2} title={`priority : ${data.priority}`}>
                                        <td key={index + 3}>{index + 1}</td>
                                        <td key={index + 4}><input type="checkbox" onChange={(e) => handleStatusChange(e, data.id)} checked={data.status} /></td>
                                        <td key={index + 5} >{
                                            data.status === false
                                                ?
                                                data.priority === "high" ? <p className='fs-5 text-danger'>{data.title}</p> : data.priority === "medium" ? <p className='fs-5 text-warning'>{data.title}</p> : data.priority === "low" ? <p className='fs-5 text-success'>{data.title}</p> : <p>{data.title}</p> :
                                                data.priority === "high" ? <strike className='fs-5 text-danger'>{data.title}</strike> : data.priority === "medium" ? <strike className='fs-5 text-warning'>{data.title}</strike> : data.priority === "low" ? <strike className='fs-5 text-success'>{data.title}</strike> : <strike>{data.title}</strike>
                                        }</td>
                                        <td>
                                            {
                                                data.status === false ? <p>Pending</p> : <p>Completed</p>
                                            }
                                        </td>
                                        {
                                            data.status === false ? <td><Button key={index} color='error' onClick={(e) => handleDelete(e, data.id, data.title)} endIcon={<DeleteIcon />} variant='contained'>Delete</Button></td> : <td></td>
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                            : <tbody>
                                <tr>
                                    <td colSpan={5}>
                                        <p className='text-center fs-4 m-5 p-5'>No Data Found</p>
                                    </td>
                                </tr>
                            </tbody>
                    }
                </table>
                <p className='m-3'>{copyTodoData.length} item(s) left</p>
            </div>
        </>
    )
}

export default Show
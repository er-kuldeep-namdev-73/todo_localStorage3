import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const Add = ({ todoData, setTodoData, copyTodoData, setTodoCopyData }) => {

    //State for add Value
    const [value1, setValue1] = useState({
        title: "",
        priority: "",
        status: false
    })

    //state for render priority
    const [render, setRender] = useState(false)

    //start function handleChange
    function handleChange(e) {
        setValue1({ ...value1, [e.target.name]: e.target.value, status: false })
    }
    //End function handleChange

    //Start function AddItem for Submit the data
    const handleAddItem = (e) => {
        e.preventDefault();
        e.target.reset();
        if (value1.priority === "") {
            toast.error("Please Choose the Priority Option")
        }
        else {
            let index = todoData.slice(-1)[0]?.id
            if (index) {
                setTodoData([...todoData, { ...value1, id: ++index }]);
                setTodoCopyData([...copyTodoData, { ...value1, id: ++index }])

            }
            else {
                setTodoData([...todoData, { ...value1, id: 1 }]);
                setTodoCopyData([...copyTodoData, { ...value1, id: 1 }])

            }
        }
        setValue1({
            title: "",
            priority: "",
            status: false
        })
        setRender(true)
        setTimeout(() => {
            setRender(false)
        }, 10)
    }

    //End function AddItem for submit the  data

    return (
        <div className='w-50'>
            {/* Start form */}
            <form className='bg-light m-5 border-3 border w-75 rounded form-control' onSubmit={handleAddItem}>
                <div className='p-3'>
                    <label className='text-start mb-2 fs-5 text-primary'>Add Item</label><br />
                    {/* <input id="addItem" name="title" placeholder="Please Enter the Item" className='w-100 form-control' onChange={(e) => handleChange(e)} /> */}
                    <input id="addItem" label="Add Item" variant="standard" className='w-100 form-control bg-light' name="title" onChange={(e) => handleChange(e)} required placeholder='Enter Todo Item Name'/><br />
                    <label className='mt-2 fs-5 text-primary'>Priority *</label>
                    {
                        !render &&
                        <select className='form-select bg-dark text-light' onChange={(e) => handleChange(e)} name="priority" title="It's a required field">
                            <option disabled selected className='text-light' value={"select"} >---Please Select Priority---</option>
                            <option value={"high"} className='text-danger'>high</option>
                            <option value={"medium"} className='text-warning'>medium</option>
                            <option value={"low"} className='text-success'>low</option>
                        </select>
                    }
                    <Button className='mt-2 w-50' variant='contained' type
                        ="submit">Add Item</Button>
                </div>
            </form>
            {/* end form */}
        </div>
    )
}

export default Add
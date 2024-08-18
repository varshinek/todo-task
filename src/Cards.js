
import React, { useState } from 'react'
import './Cards.css'

function Cards(props) {

    const id= props.id;

    const [edit,setEdit] = useState (true)
    const [selectedValue,setSelectedValue] = useState (props.task)
    
    const changeEdit = () => {
        setEdit(!edit);
    }

    const setTaskStyle = {
        backgroundColor :  selectedValue == "true" ? "green" : "red",
        color:"black",
        fontWeight:"700"
    }

  return (
    <div className='container-for-cards'>
        <div className='Card-Details'>
            <h3>Task Name : {props.name}</h3>
            <p><b>Task Discription : </b>{props.disc}</p>
        </div>
        <div className='Card-functions'>
        <div className='Select-function'>
            <label htmlFor='select_tag'><b>Status : </b></label>
            <select disabled={edit} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} style={setTaskStyle} id='select_tag'>
                <option value="false">Not Completed</option>
                <option value="true">Completed</option>
            </select >
        </div>
        <div className='Card-buttons'>
            { edit ? <button onClick={()=> changeEdit()} style={{backgroundColor:"gold"}}>Edit</button> :
            <button onClick={()=>{ changeEdit(); props.handleEdit(id,selectedValue)}} style={{backgroundColor:"rgb(37, 219, 37)"}}>Update</button> }
            <button onClick={()=>props.handleDelete(id)} style={{backgroundColor: "crimson"}}>Delete</button>
        </div>
        </div>
    </div>
  )
}

export default Cards

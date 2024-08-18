
import React, { useEffect } from 'react'
import { useState } from 'react'
import { data } from './App'
import Cards from './Cards'
import './Input.css'
import './Filter.css'
import './Task.css'

function Tasks() {

    const [displayData,setDisplayData] = useState(data)
    const [filterStart,setFilterStart] = useState(true)
    const [filterDataLast,setFilterDataLast] = useState("")
    const [filterButtonDisable,setFilterButtonDisable] = useState(true)

    const [name,setName] = useState("")
    const [disc,setDisc] = useState("")
    const [filterCards,setFilterCards] = useState("all")

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDisc = (event) => {
        setDisc(event.target.value)
    }

    const handleClickAdd = () => {
        if(name == "" || disc == ""){
            alert("Need to fill details before submit")
            return
        }
        else{
            const todo_data = {
                id: displayData.length == 0 ? 1 : displayData [displayData.length -1].id + 1,
                name,
                disc,
                task: "false"
            }
            const newToDoList = [...displayData, todo_data];
            setDisplayData(newToDoList)
        }
    }

    const handleDelete = (id) =>{
        const afterDelete = displayData.filter((ele)=> ele.id != id)
        setDisplayData(afterDelete)
    }

    const handleEdit = (id,selectedValue) => {
        setDisplayData (
            displayData.map((ele)=>{
                if(ele.id == id){
                    return {...ele, task : selectedValue}
                }
                else {
                    return ele;
                }
            })
        )}

    const filterElements = (filterCards) => {
        setFilterButtonDisable(!filterButtonDisable)
        const beforefilterdata = displayData;
        
        if(filterCards == "true" || filterCards == "false"){
            setFilterStart(false)
            const filter_data_true = beforefilterdata.filter((ele)=>ele.task == filterCards);
            setFilterDataLast(filter_data_true)
        }
        else {
            if(filterCards == "all"){
                setFilterStart(!filterStart)
            }
        }
    } 

    const setFilterStyle = {
        backgroundColor :  filterCards == "true" ? "green" : filterCards == "false"? "red": "white",
        color:"black",
        fontWeight:"700"
    }

  return (
    <>
        <div className='top-layer-inputs'>
            <div style={{display: "inline"}}>
            <label htmlFor='to-doname'><b>To Do Name : </b></label>
            <input type='text' id='to-doname' onChange={handleChangeName} placeholder='To-Do Name'/>
            </div>
            <div style={{display: "inline"}} className='Disc-Class'>
            <label htmlFor='to-dodisc'><b>Discription : </b></label>
            <input type='text' id='to-dodisc' onChange={handleChangeDisc} placeholder='To-Do Disc'/>
            </div>
            <div style={{display: "inline"}} className='task-add-button'>
            <button onClick={handleClickAdd} className='Add-Button'>Add To Do</button>
            </div>
        </div>
        <div className='filter-cards'>
            <div className='filter-card-text'>
                <h3>My To Do Lists</h3>
            </div>
            <div className='filter-cards-function'>
            <select value={filterCards} onChange={(e) => {setFilterCards(e.target.value); setFilterButtonDisable(!filterButtonDisable)}} style={setFilterStyle}>
                <option value="all">All</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
            </select>
            <button  onClick={()=> filterElements(filterCards)} className='filter-button' disabled={filterButtonDisable}>Filter</button>
            </div>
        </div>
        {filterStart ? <div className='Card-Container'>
            {displayData.map((ele)=>(
                <Cards key={ele.id} name={ele.name} disc={ele.disc} 
                id={ele.id} task={ele.task} handleDelete={handleDelete}
                handleEdit={handleEdit}
                />
            ))} 
        </div> : <div className='Card-Container'>
            {filterDataLast.map((ele)=>(
                <Cards key={ele.id} name={ele.name} disc={ele.disc} 
                id={ele.id} task={ele.task} handleDelete={handleDelete}
                handleEdit={handleEdit}
                />
            ))} 
        </div> }
    </>
  )
}

export default Tasks

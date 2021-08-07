import React, { useState } from 'react'
import './todo.css'

const Todo = () => {
    const [data, setData] = useState("") //for add items.
    const [items,setItems] = useState([]) //To add items without deleting the previous one unless user delete it.

    const addItem = () =>{                  // add the items function
        if(!data)
        {
            alert("please fill something")
        }
        else{
            setItems([...items,data])   /// ... is a spread operator. It means that the data 
            setData("");                    //  of previous state should be include and data= what are the data? 
        }
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h1> Todo List </h1>
                    <div className="addItems">
                        <input type="text"
                            placeholder="Add items" className="form-control"
                            value={data}  // data is empty at first, since useState("its empty in above code"), its initial data
                            onChange={(event) => {
                                setData(event.target.value) //event.target.value = text entered in the search input/
                        
                            }} />
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>

                    <div className="showItems">
                        {items.map((curElem,index)=>{
                            return(
                                <div className="eachItem" key={index}>
                                <h3>{curElem}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" ></i>
                                    <i className="far fa-trash-alt add-btn" ></i>
                                </div>
                            </div>
                            )

                        })}
                        
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove all">
                            <span>CHECK LIST</span></button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo

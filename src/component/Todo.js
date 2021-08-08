import React, { useState,useEffect } from 'react'
import './todo.css'

// To get items from local storage back

const getLocalData =() =>{
    const lists = localStorage.getItem("mytodolist")

    if(lists)
    {
        return JSON.parse(lists) //JSon.parse is used to get data on array.
    }
    else{
        return[];
    }
}

const Todo = () => {
    const [data, setData] = useState("") //for add items.
    const [items, setItems] = useState(getLocalData()) //To add items without deleting the previous one unless user delete it.
                                              // getliocaldata is used to get the data.
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);



    const addItem = () => {                  // add the items function
        if (!data) {
            alert("please fill something")
        }
        else if (data && toggleButton) {
            setItems(
              items.map((curElem) => {
                if (curElem.id === isEditItem) {
                  return { ...curElem, name: data };
                }
                return curElem;
              })
            );
      
            setData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const newData = {
                id: new Date().getTime().toString(),
                name: data,
            }
            setItems([...items, newData])   /// ... is a spread operator. It means that the data 
            setData("");                    //  of previous state should be include and data= what are the data? 
        }
    }
    //To edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
          return curElem.id === index; //matching the curelem id from localstorage to index
        });
        setData(item_todo_edited.name); //to place the data got after matching in placeholder (to show name)
        setIsEditItem(index);
        setToggleButton(true);
      };

    
    //to delete items

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;

        });
        setItems(updatedItem)

    }

    // to remove all items

    const removeAll = (index)=>
    {
        setItems([])
    }

    // to add items on local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items )) // mytodolist = key and items=value but items is array and we
                                                    // need to pass string so we will use Json.stringify
    }, [items])  //When the values of items are changed then useEffect will run 
                      // and data will be added in localstorage(it will on the key value pair and only string can be pass)

    
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
                            {toggleButton ? ( <i className="far fa-edit add-btn" onClick={addItem}></i> )
                                        :  (  <i className="fa fa-plus add-btn" onClick={addItem}></i> )
                        }
                      
                    </div>

                   { /* showing items */  }

                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" 
                                         onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}>
                                        </i>
                                    </div>
                                </div>
                            )

                        })}

                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove all"
                        onClick={removeAll}>
                            <span>CHECK LIST</span></button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo

import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";


function Dates(props){

    var datetime=new Date(props.date);

    return(
        <div>
            <p className="font-bold">Due on: </p>     
            <div className="flex flex-row">
                <p>Date: {`${datetime.getDate()}-${datetime.getMonth()}-${datetime.getFullYear()}`}</p>
                <p>Time: {`${datetime.getHours()}:${datetime.getMinutes()}`}</p>
            </div> 
        </div>
    )

}


function TodoApp(){
    const {user}=useAuthContext();
    const [todo,setTodo]=useState({task:"" , due:"" , desc:""});
    const [allTodo,setAllTodo]=useState([]);
    
    const refTask=useRef(null);
    const refDue=useRef(null);
    const refDesc=useRef(null);
    const navigate=useNavigate();

    const handleLogout=(e)=>{
        e.preventDefault();
        navigate('/');
    };

    const handleShow=(e)=>{
        console.log(user);
        fetch("http://localhost:5000/tasks",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setAllTodo(data);
        })


    }

    const handleSubmit= (e)=>{
        e.preventDefault();

        console.log(JSON.stringify(todo));

        fetch("http://localhost:5000/tasks",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(todo)
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setAllTodo(data);
        })

        refTask.current.value="";
        refDue.current.value="";
        refDesc.current.value="";
        setTodo({task:"" , due:"" , desc:""});
    }

    const handleDelete=(e,index)=>{
        e.preventDefault();
        console.log(index);
        const deldata={ _id:index};
        
        fetch("http://localhost:5000/removetask",{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(deldata)
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setAllTodo(data);
        })
    }

    return(
        <div className= "screen" >
            <div className="grid grid-cols-2 min-[1000px]:divide-x-4 divide-[#a009bf] min-[1000px]:min-h-[72vh] max-[1000px]:block max-[1000px]:divide-y-4 " >
                <div className="flex flex-col">
                    <h1>Enter Todo list</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="task">Task Priority</label>
                            <select defaultValue={"selected"} className="block max-w-[300px] appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" ref={refTask} onChange={e=>(setTodo({...todo,task:e.target.value}))} name="task" id="task">
                                <option value="selected"  disabled={true}>--Please Select --</option>
                                <option value="c1">Urgent and important task</option>
                                <option value="c2">Not urgent but important task</option>
                                <option value="c3">Not important but urgent task</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="due">Due Date</label>
                            <input ref={refDue} onChange={e=>setTodo({...todo,due:e.target.value})} className="block max-w-[300px] appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" id="due" name="due" />
                        </div>
                        <div className="flex flex-col mr-4">
                            <label htmlFor="desc">Description</label>
                            <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={refDesc} onChange={e=>setTodo({...todo,desc:e.target.value})} name="desc" id="desc" cols="30" rows="4"></textarea>
                            <button disabled={!todo.task || !todo.due || !todo.desc} type="submit" className="action-button my-4">Add Task</button>
                        </div>
                    </form>
                </div>
                <div className="" >
                    <div className="flex flex-row ">
                        <h1 className="grow">Display Todo list</h1>
                        <button onClick={handleShow} className="action-button mx-[10px] my-[10px] ">Show</button>
                        <button onClick={handleLogout} className="action-button mx-[10px] my-[10px] ">Logout</button>
                    </div>
                    <div className="flex flex-col">
                        {allTodo.map((ele,index)=>(
                            <div className="flex flex-col mx-2 my-2 border-8 border-[#401074] bg-[#f0f8ff] rounded-[20px]" key={ele._id}>
                                <div className="flex flex-row ">
                                    <div className="grow ">
                                        {ele.task==="c1"?<p className="text-center text-2xl my-4 font-bold text-red-400">Urgent and important task</p>:ele.task==="c2"?<p className="text-center text-2xl my-4 font-bold text-green-600">Not urgent but important task</p>:<p className="text-center text-2xl my-4 font-bold text-blue-400">Not important but urgent task</p>}
                                    </div>

                                    <Dates date={ele.due}/>
                                    <button onClick={(e)=> handleDelete(e,ele._id)} className="bg-red-400 rounded-full grow-0 max-h-[40px] w-[40px] text-white hover:bg-red-800">X</button>
                                </div>
                                <p className="text-justify mx-4 font-bold">Description:</p>
                                <p className="text-justify my-2 mx-4">{ele.desc}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
};

export default TodoApp;
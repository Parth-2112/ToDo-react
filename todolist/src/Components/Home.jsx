import React, { useEffect, useState } from 'react'
import Task from './Task'

const Home = () => {
  
    const initialArray = localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")) : [];
    const [tasks, setTasks] = useState(initialArray);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
  

    const submitHandler = (e) => {
        e.preventDefault();
        setTasks([...tasks,{title,desc}]);
        // localStorage.setItem("tasks", JSON.stringify(tasks));
        setTitle("");
        setDesc("");
    };

    const deleteTask = (index) => {
        const filteredArr = tasks.filter((val,i)=>{
            return i!==index;
        });
        setTasks(filteredArr);
    }

    useEffect(()=>{

        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);

    return (
    <div className="container">
        <form onSubmit={submitHandler}>
            <input 
                type="text" 
                placeholder="Add new task" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
                placeholder='Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}></textarea>
            <button type="submit">ADD</button>
        </form>

        {
            tasks.map((item, index) =>(
                <Task 
                    key={index} 
                    title={item.title} 
                    description={item.desc}
                    deleteTask={deleteTask}
                    index={index}    
                    />
            ))
        }
        
    </div>
  )
}

export default Home
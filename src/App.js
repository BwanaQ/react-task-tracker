import {useState, useEffect} from 'react'
import Header from './components/Header';
import './App.css';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = ()=> {
  const[showAddTask,setShowAddTask]= useState(false)
  const [tasks, setTasks]= useState([])
  const baseUrl = 'http://localhost:5000/tasks/'
  useEffect(()=>{
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // Fetch Tasks
  const fetchTasks = async()=>{
    const res = await fetch(baseUrl)
    const data = await res.json()
    return data
  }


  // Fetch Task
  const fetchTask = async (id)=>{
    const res = await fetch(`${baseUrl}${id}`)
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async (task)=>{
    const res = await fetch(baseUrl,{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])
  }
  //Delete Task
  const deleteTask= async (id)=>{
    await fetch(`${baseUrl}${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task)=> task.id!==id))
  }
  
  //Toggle reminder

  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`${baseUrl}${id}`,{
      method: 'PUT',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    setTasks(
      tasks.map((task)=>
      task.id === id ? {...task, reminder: data.reminder}: task
    ))
  }
  return (
    <div className="container">
      <Header 
        onAdd = {()=>setShowAddTask(!showAddTask)}
        showAdd={showAddTask} 
      />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:'No Tasks'}
    </div>
  );
}

export default App;

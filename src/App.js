import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import Addform from "./Components/Addform";
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Footer from "./Components/Footer";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(() => {
    async function getTasks () {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTasks()
  }, [])

  //fetch tasks 
  async function fetchTasks () {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    
    return data 
  }

  //fetch task 
  async function fetchTask (id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    
    return data 
  }


  //add task
async function addTask (task) {
  const res = await fetch("http://localhost:5000/tasks", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  }
 )
  const data = await res.json()

  setTask([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) +1
  // const newTask = {id , ...task}
  // setTask([...tasks, newTask])
}

async function deleteTask  (id) {
  await fetch (`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

setTask(tasks.filter((value) => value.id !== id))
console.log(tasks)
}

async function toggleReminder (id) {
  const taskToToggle = await fetchTask(id)
  const upTask = {...taskToToggle, 
  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
  {method: 'PUT',
headers: {
  'Content-type': 'application/json'
},
body: JSON.stringify(upTask)
})

const data = await res.json()


setTask(tasks.map((task) => task.id === id  ? {...task, reminder : !task.reminder} : task ))
}

function Addtask() {
  setShowAddTask(!showAddTask)
  
}
  return (
    <Router>
    <div className="container">
       <Header onAdd={Addtask} showAdd={showAddTask}/>
       <Routes>
       <Route path="/" element={  
         <>
          {showAddTask && <Addform onAdd={addTask}/>} 
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder}/>
      ) : ('YOU DON`T HAVE ANY TASK')
      } 
        </>
        }
    />
    <Route path="/about" element={<About />} />
    </Routes>
  
    <Footer />
    </div>
    </Router>
  );
}

export default App;

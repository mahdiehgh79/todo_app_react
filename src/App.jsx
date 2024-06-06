import { useEffect, useState } from 'react'
import './App.css'
import Task from './task'
import TaskForm from './taskForm'

function App() {
  const[tasks,setTasks] = useState([])

  useEffect(() => {
    if (tasks.length === 0) return
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks)
  },[])

  const AddTask = (name) => {
    setTasks(prev => {
      return [...prev, {name:name,done:false}]
    })
  }

  const removeTask = (Indextoremove) => {
       setTasks(prev => {
        return prev.filter((taskObject,Index) => {
          return Index !== Indextoremove 
        })
       })
  }

  const updateTaskDone = (taskIndex, newDone) => {
       setTasks(prev => {
        const newTasks = [...prev]
        newTasks[taskIndex].done = newDone
        return newTasks
       })
  }

  const numberCompelet = tasks.filter(t => t.done).length
  const numberTotal = tasks.length

  const getMassage = () => {
    const percentage = numberCompelet/numberTotal * 100
    if(percentage === 0){
      return 'try to do at least one'
    }
    if(percentage === 100){
      return 'nice job for today'
    }
    return 'keep it going ...'
  }

  const renameTask = (index,newName) => {
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks[index].name = newName
      return newTasks
    })
  }
  return (
    <main>
      <h1>{numberCompelet}/{numberTotal} compelete</h1>
      <h2>{getMassage()}</h2>
      <TaskForm onAdd={AddTask}/>
      {
        tasks.map((task,index) => (
          <Task {...task} 
          onRename={(newName) => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}/>
        ))
      }
    </main>
  )
}

export default App

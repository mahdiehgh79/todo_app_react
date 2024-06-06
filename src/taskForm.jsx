import { useState } from "react"

const TaskForm = ({onAdd}) => {
    const [taskName,setTaskName] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault()
      onAdd(taskName)
    }
    return(
      <form onSubmit={handleSubmit}>
         <button>+</button>
         <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="new Task ..."/>
      </form>
    )
}
export default TaskForm
import Task from "./Task"

function Tasks ({tasks, onDelete, onToggle}) {
   
    const Tasks = tasks.map((task, index) => {
        return(
            <Task key={index} task={task} onDelete={() => onDelete(task.id)} onToggle={() => onToggle(task.id)}/>
        )
       
    })
    return( 
        <>
        {Tasks}
        
        </>
    )
}

export default Tasks 
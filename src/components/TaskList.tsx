import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle == '') return 

    const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))

    const updateList = [...tasks] 
  
    updateList.push({
      id: id,
      title: newTaskTitle,
      isComplete: false,
    })

    setNewTaskTitle('') 

    setTasks(updateList)
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newArray = tasks.map(task => {
      if(task.id == id) {
        task.isComplete = !task.isComplete
      }
      return task
    })
    
    setTasks(newArray)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const tasksCopy = [...tasks]
    const index = tasksCopy.map(function(e) { return e.id }).indexOf(id);

    if (index !== -1) {
      tasksCopy.splice(index, 1)
      setTasks(tasksCopy)
    }
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
import {
  saveTask, 
  getTasks, 
  onGetTasks, 
  deleteTask, 
  getTask,
  updateTask
} from './firebase.js'

const taskFrom = document.getElementById("task-from");
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = '';

window.addEventListener("DOMContentLoaded", async() => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      
      tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.descripcion}</p>
          <div>
            <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
            <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>
          </div>
        </div>
      `;
    });


    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({target:{dataset}}) => {
        deleteTask(dataset.id)
      })
    })

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();

        taskFrom['task-title'].value = task.title
        taskFrom['task-descripcion'].value = task.descripcion

        editStatus = true
        id = doc.id

        taskFrom['btn-task-save'].innerText = 'Update'
      });
    })

  });
});

taskFrom.addEventListener("submit",(e) => {
  e.preventDefault();

  const title = taskFrom["task-title"];
  const descripcion = taskFrom["task-descripcion"];

  if (!editStatus){
    saveTask(title.value, descripcion.value);
  }else{
    updateTask(id, {title:title.value, descripcion:descripcion.value,})

    editStatus = false
  }

  taskFrom.reset()
});

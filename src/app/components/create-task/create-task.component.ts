import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItem } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  newTask: TaskItem = { id: 0, title:'', description:'', isCompleted: false};
  showNotification = false;

  constructor( private taskService: TaskService, private router: Router) { }


  //Función para guadar las tareas, aparece una notificación si se guarda satisfactoriamente y además se envía a la vista de tareas.
  addTask(): void{
    if(!this.newTask.title.trim()) return;
    this.taskService.addTask(this.newTask).subscribe({
      next: ( )=> {
        this.showNotification = true;
        setTimeout(()=>{
          this.showNotification = false;
          this.router.navigate(['/task-list'])
        }, 3000)
      },
      error: err => console.error('Error al agregar tarea', err)
    })
  }
}

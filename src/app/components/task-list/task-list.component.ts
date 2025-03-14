import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItem } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  showDeleteNotification = false;
  showDeleteModal = false;
  taskToDelete: number | null = null;

  constructor(private taskService: TaskService) {}

  //Al crear el componente lo primero que mostraremos son las tareas creadas.
  ngOnInit(): void {
    this.loadTasks();
  }

  // Método que llama la Api de getTasks para tarer las tareas guardadas.
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: TaskItem[]) => {
      this.tasks = tasks;
    });
  }

  // Método que nos ayuda a abrir el modal y tomar el Id de la tarea para eliminarla
  openConfirmModal(taskId: number) {
    this.taskToDelete = taskId;
    this.showDeleteModal = true;
  }

  // Cambia el valor del show modal a false para que se cierre.
  closeConfirmModal() {
    this.showDeleteModal = false;
    this.taskToDelete = null;
  }

  // Llamada a la API deleteTask para eliminar una tarea especifica, además mostramos una notificación para confirmar la eliminación de la tarea.
  deleteConfirmedTask() {
    if (this.taskToDelete !== null) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== this.taskToDelete);
        this.showDeleteNotification = true
        setTimeout(()=>{
          this.showDeleteNotification = false;
        }, 3000)
        this.closeConfirmModal();
      });
    }
  }
  
  // Llamada a la API para actualizar la tarea si se cambia el estado
  checkBoxChange(task: TaskItem): void {
    this.taskService.updateTask(task).subscribe();
  }
}

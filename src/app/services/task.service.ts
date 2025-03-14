import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskItem } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

  /**
   * URL base de la API para las tareas.
   */
  private apiUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de tareas desde la API
   * @returns Un Observable con un Array de TaskItem
   */
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener tareas', error);
        return throwError(() => new Error('Error al obtener tareas'));
      })
    );
  }
  /**
   * 
   * @param task Objeto de la tarea que vamos a agregar
   * @returns Observable con la tarea creada
   */
  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  /**
   * 
   * @param task Objeto de la tarea con los datos actualizados, en este caso el atributo isCompleted para saber si está completada o pendiente
   */
  updateTask(task: TaskItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  /**
   * 
   * @param id Identificador de la tarea que eliminaremos
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
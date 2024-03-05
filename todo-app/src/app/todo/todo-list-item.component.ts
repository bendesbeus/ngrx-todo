import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { Todo } from "./todo.component";
import { AppStore } from "../app.state";
import { removeTodo, toggleTodo } from "./store/todo.actions";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule],
  template: ` @if (todo) {
    <div>
      <input type="checkbox" [checked]="todo.done" (change)="onToggleTodo(todo.id)" />
      {{ todo.name }}
      <button (click)="onDeleteTodo(todo.id)">Delete</button>
    </div>
    }`
})
export class TodoListItemComponent {
  private readonly store = inject(Store<AppStore>);

  @Input() todo?: Todo;
  onDeleteTodo(id: number) {
    this.store.dispatch(removeTodo({id}));
  }

  onToggleTodo(id: number) {
    this.store.dispatch(toggleTodo({id}));
  }
}

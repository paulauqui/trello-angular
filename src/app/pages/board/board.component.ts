import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToDo, Column } from './../../models/todo.model';
import { TodoDialogComponent } from './../../components/todo-dialog/todo-dialog.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, NavbarComponent],
  templateUrl: './board.component.html',
  styles: `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
  `,
})
export class BoardComponent {
  columns: Column[] = [
    {
      title: 'ToDo',
      todos: [
        {
          id: '1',
          title: 'Task 1',
        },
        {
          id: '2',
          title: 'Task 2',
        },
        {
          id: '3',
          title: 'Task 3',
        },
      ],
    },
    {
      title: 'Doing',
      todos: [
        {
          id: '1',
          title: 'Task doing 1',
        },
        {
          id: '2',
          title: 'Task doing 2',
        },
        {
          id: '3',
          title: 'Task doing 3',
        },
      ],
    },
    {
      title: 'Done',
      todos: [
        {
          id: '1',
          title: 'Task done 1',
        },
        {
          id: '2',
          title: 'Task done 2',
        },
        {
          id: '3',
          title: 'Task done 3',
        },
      ],
    },
  ];

  constructor(private dialog: Dialog) {}

  ngOnInit() {}

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: [],
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      minHeight: '50%',
      autoFocus: false,
      data: {
        todo: todo,
      },
    });

    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }
}

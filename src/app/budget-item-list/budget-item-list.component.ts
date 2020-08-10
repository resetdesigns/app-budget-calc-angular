import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
})
export class BudgetItemListComponent implements OnInit {
  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  constructor(public dialogRef: MatDialog) {}

  ngOnInit(): void {}

  onDeleteButtonClick(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    // show the edit modal
    let dialogRef = this.dialogRef.open(EditItemModalComponent, {
      width: '600px',
      height: '400px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // check if result has a value
      if (result) {
        this.update.emit({
          old: item,
          new: result,
        });
      }
    });
  }
}

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}

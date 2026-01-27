import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.css']
})
export class SoaComponent {

  @Input() form!: FormGroup;
  @Input() total = 0;

  @Output() onSave = new EventEmitter<void>();

  save() {
    this.onSave.emit();
  }
}


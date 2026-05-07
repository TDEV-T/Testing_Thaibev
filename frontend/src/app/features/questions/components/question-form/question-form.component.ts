import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../../../models/question.model';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full max-w-2xl border border-slate-300 bg-white shadow-sm min-h-[400px]">
      <div class="bg-green-600 text-white py-1 px-3 text-xs text-center font-medium">IT 08-2</div>

      <form #questionForm="ngForm" class="p-8 space-y-6">
        <div class="grid grid-cols-[100px_1fr] items-center gap-4">
          <label class="text-sm font-medium text-slate-700">คำถาม</label>
          <div class="flex flex-col gap-1">
            <input
              type="text"
              name="text"
              required
              #textInput="ngModel"
              [(ngModel)]="question.text"
              [class.border-red-500]="textInput.invalid && textInput.touched"
              class="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
            <span *ngIf="textInput.invalid && textInput.touched" class="text-xs text-red-500"
              >กรุณากรอกคำถาม</span
            >
          </div>
        </div>

        <div class="grid grid-cols-[100px_1fr] items-center gap-4" *ngFor="let i of [1, 2, 3, 4]">
          <label class="text-sm font-medium text-slate-700">คำตอบ {{ i }}</label>
          <div class="flex flex-col gap-1 w-full">
            <input
              type="text"
              [name]="'option' + i"
              required
              #optInput="ngModel"
              [(ngModel)]="question['option' + i]"
              [class.border-red-500]="optInput.invalid && optInput.touched"
              class="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex justify-center gap-4 pt-6">
          <button
            type="submit"
            [disabled]="questionForm.invalid"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 px-8 rounded shadow-sm transition-colors"
            (click)="onSave.emit(question)"
          >
            บันทึก
          </button>
          <button
            type="button"
            class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded shadow-sm transition-colors"
            (click)="onCancel.emit()"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  `,
})
export class QuestionFormComponent {
  question: any = { text: '', option1: '', option2: '', option3: '', option4: '' };
  @Output() onSave = new EventEmitter<Question>();
  @Output() onCancel = new EventEmitter<void>();
}

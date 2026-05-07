import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../../../models/question.model';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full min-w-[400px] max-auto border border-slate-300 bg-white shadow-sm  min-h-[400px]"
    >
      <div class="bg-green-600 text-white py-1 px-3 text-xs text-center font-medium">IT 08-1</div>
      <div class="p-6">
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded shadow-sm transition-colors mb-6"
          (click)="onAdd.emit()"
        >
          เพิ่มข้อสอบ
        </button>
        <div class="space-y-8">
          <div
            *ngFor="let q of questions; let i = index"
            class="border-b border-slate-100 pb-6 last:border-0"
          >
            <div class="flex items-center gap-4 mb-3">
              <span class="text-lg font-semibold text-slate-800"
                >{{ q.sequence_number }}. {{ q.text }}</span
              >
              <button
                class="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded shadow-sm transition-colors"
                (click)="onDelete.emit(q.id)"
              >
                ลบ
              </button>
            </div>
            <div class="pl-6 space-y-2">
              <div
                class="flex items-center gap-3 text-slate-600"
                *ngFor="let opt of [q.option1, q.option2, q.option3, q.option4]"
              >
                <input type="radio" [name]="'q' + q.id" disabled class="accent-green-600" />
                <span>{{ opt }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class QuestionListComponent {
  @Input() questions: Question[] = [];
  @Output() onAdd = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<number | undefined>();
}

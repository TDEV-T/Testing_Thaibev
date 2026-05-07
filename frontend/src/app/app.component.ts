import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './services/question.service';
import { Question } from './models/question.model';
import { QuestionListComponent } from './features/questions/components/question-list/question-list.component';
import { QuestionFormComponent } from './features/questions/components/question-form/question-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionListComponent, QuestionFormComponent],
  template: `
    <div class="min-h-screen bg-slate-50 flex justify-center p-8">
      <app-question-list
        *ngIf="view === 'list'"
        [questions]="questions"
        (onAdd)="openAddView()"
        (onDelete)="deleteQuestion($event)"
      >
      </app-question-list>

      <app-question-form
        *ngIf="view === 'add'"
        (onSave)="saveQuestion($event)"
        (onCancel)="view = 'list'"
      >
      </app-question-form>
    </div>
  `,
})
export class AppComponent implements OnInit {
  view: 'list' | 'add' = 'list';
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  openAddView() {
    this.view = 'add';
  }

  saveQuestion(question: Question) {
    this.questionService.addQuestion(question).subscribe(() => {
      this.loadQuestions();
      this.view = 'list';
    });
  }

  deleteQuestion(id: number | undefined) {
    if (id === undefined) return;
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.loadQuestions();
    });
  }
}

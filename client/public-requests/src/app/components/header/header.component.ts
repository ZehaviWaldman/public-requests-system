import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RequestFormComponent } from '../request-form/request-form.component';
import { RequestListComponent } from '../request-list/request-list.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Request } from '../../interfaces/request.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule,
    ReactiveFormsModule,
    RequestFormComponent,
    RequestListComponent
  ]
})
export class HeaderComponent implements OnInit {
  requests: Request[] = [];
  displayedColumns: string[] = ['name', 'subject', 'content', 'createdAt'];
  activeTab: 'form' | 'list' = 'form';
  menuOpen = false;

  requestForm: FormGroup;
  errorMsg: string = '';

    addRequestFromChild(newRequest: Request) {
      this.requestsService.addRequest(newRequest)
        .pipe(
          catchError(err => {
            this.errorMsg = 'שגיאה בהוספת הבקשה';
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            this.activeTab = 'list';
            this.loadRequests();
          }
        });
    }

  constructor(
    private requestsService: RequestsService,
    private fb: FormBuilder
  ) {
    // יצירת טופס עם ולידציות
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  // טעינת רשימת הבקשות מהשרת עם טיפול בשגיאות
  loadRequests(): void {
    this.requestsService.getRequests()
      .pipe(
        catchError(err => {
          this.errorMsg = 'שגיאה בטעינת הבקשות';
          return of([]);
        })
      )
      .subscribe(data => this.requests = data);
  }

  // הוספת בקשה חדשה עם טיפול בשגיאות וטעינה מחדש של הרשימה
  addRequest(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    const newRequest: Request = this.requestForm.value;
    this.requestsService.addRequest(newRequest)
      .pipe(
        catchError(err => {
          this.errorMsg = 'שגיאה בהוספת הבקשה';
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          this.requestForm.reset();
          this.activeTab = 'list';
          this.loadRequests(); // טען מחדש את הרשימה
        }
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
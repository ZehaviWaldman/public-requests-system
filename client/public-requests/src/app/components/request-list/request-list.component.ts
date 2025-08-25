import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Request } from '../../interfaces/request.interface';
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DatePipe
  ]
})
export class RequestListComponent {
  @Input() requests: Request[] = [];
  @Input() displayedColumns: string[] = ['name', 'subject', 'content', 'createdAt'];
}

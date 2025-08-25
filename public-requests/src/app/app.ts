import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequestsComponent } from "./components/requests/requests.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RequestsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'public-requests';
}

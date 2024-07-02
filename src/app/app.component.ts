import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-solution';
}

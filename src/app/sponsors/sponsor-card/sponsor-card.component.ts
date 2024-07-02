import { Component, Input } from '@angular/core';
import { Sponsor } from '../../models/sponsor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-sponsor-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './sponsor-card.component.html',
  styleUrl: './sponsor-card.component.scss'
})
export class SponsorCardComponent {
  @Input() sponsor !: Sponsor



  displayEmail(email: string) {
    if (email.length > 25) {
      return email.substring(0, 15) + '...'
    }
    return email
  }
}

import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SponsorService } from '../services/sponsor.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Sponsor } from '../models/sponsor';
import { SponsorCardComponent } from './sponsor-card/sponsor-card.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  providers: [SponsorService],
  imports: [SponsorCardComponent],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss'
})
export class SponsorsComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>()
  sponsorService = inject(SponsorService)
  sponsors = signal<Sponsor[]>([])
  constructor() { }


  ngOnInit(): void {
    this.getSponsors()
  }

  getSponsors() {
    this.sponsorService.getSponsor().pipe(
      tap(data => {
        this.sponsors.set(data.data)
      }),
      takeUntil(this._unsubscribe$)
    ).subscribe()
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }
}

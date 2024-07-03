import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SponsorService } from '../services/sponsor.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Sponsor } from '../models/sponsor';
import { SponsorCardComponent } from './sponsor-card/sponsor-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  providers: [SponsorService],
  imports: [SponsorCardComponent, MatFormFieldModule, MatInputModule, MatIconModule, NgxPaginationModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss'
})
export class SponsorsComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>()
  p: number = 1;
  sponsorService = inject(SponsorService)
  sponsors = signal<Sponsor[]>([])
  searchedSponsors = signal<Sponsor[]>([])

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

  onSearch(value: string) {
    if (value.length) {

      let searchedSponsor: Sponsor[] = [];
      this.sponsors().forEach(sponsor => {
        if (sponsor.sponsor_name.includes(value)) {
          searchedSponsor.push(sponsor)
        }
      })
      console.log('🔥', searchedSponsor);

      this.searchedSponsors.set(searchedSponsor)
    } else {
      this.searchedSponsors.set([])
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }
}

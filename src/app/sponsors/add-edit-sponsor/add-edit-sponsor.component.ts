import { Component, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { SponsorService } from '../../services/sponsor.service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-add-edit-sponsor',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './add-edit-sponsor.component.html',
  styleUrl: './add-edit-sponsor.component.scss'
})
export class AddEditSponsorComponent implements OnDestroy {

  _unsubscribe$ = new Subject<boolean>()
  sponsorService = inject(SponsorService)
  fb = inject(UntypedFormBuilder);
  router = inject(Router);
  matSnack = inject(MatSnackBar)
  isLoading = false
  sponsorForm = this.fb.group({
    sponsor_name: ['', [Validators.required]],
    sponsor_type: ['', [Validators.required]],
    sponsor_ID: ['', [Validators.required]],
    address: ['', [Validators.required]],

    postal_code: ['', [Validators.required]],
    max_limit: [0, [Validators.required]],
    financial_limit: [0, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    time_limit: [0, [Validators.required, Validators.min(1), Validators.max(27)]],
    sponsor_contact_officer: [[]]
  })



  save() {
    if (this.sponsorForm.invalid) {
      this.sponsorForm.markAllAsTouched()
      this.matSnack.open('invalid data provided', '', { duration: 500 })
      return
    }
    this.isLoading = true
    this.sponsorService.addSponsor(this.sponsorForm.value)
      .pipe(tap(data => {
        this.matSnack.open('Sponsor created successfully', '', { duration: 500 })
        this.router.navigate([''])
      }), takeUntil(this._unsubscribe$), finalize(() => {
        this.isLoading = false
      })).subscribe()
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SoaService } from './services/soa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  // default load
  private readonly defaultId = 6792;

  constructor(private fb: FormBuilder, private soaService: SoaService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.defaultId],
      date: [''],
      payor: ['', Validators.required],
      address: [''],
      particulars: [''],
      period: [''],

      radioLicense: [0],
      rocCert: [0],
      surchargeAmateur: [0],
      dst: [0],

      remarks: ['']
    });

    this.loadSoa(this.defaultId);
  }

  loadSoa(id: number): void {
    this.loading = true;

    this.soaService.getById(id).subscribe({
      next: (db: any) => {
        // NOTE: Use the actual returned keys from API
        this.form.patchValue({
          id: db.id ?? db.ID ?? id,
          date: db.dateIssued ?? db.DateIssued ?? '',
          payor: db.licensee ?? db.LICENSEE ?? '',
          address: db.address ?? db.Address ?? '',
          particulars: db.particulars ?? db.Particulars ?? '',
          period: db.periodCovered ?? db.PeriodCovered ?? '',

          // ✅ use RSL or ROC based on what your backend returns
          radioLicense: +(db.rslRadioStation ?? db.rocRadioStation ?? 0),
          rocCert: +(db.rocOperatorFee ?? 0),
          surchargeAmateur: +(db.rslSurcharge ?? db.rocSurcharge ?? 0),
          dst: +(db.dst ?? db.DST ?? 0),

          remarks: db.remarksNote ?? db.REMARKS_NOTE ?? db['REMARKS/NOTE'] ?? ''
        });

        this.loading = false;
      },
      error: (err: any) => {
        console.error('SOA load error', err);
        this.loading = false;
      }
    });
  }

  get total(): number {
    const f = this.form.value as any;
    return (+f.radioLicense || 0) + (+f.rocCert || 0) + (+f.surchargeAmateur || 0) + (+f.dst || 0);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Please fill required fields.');
      return;
    }

    const f = this.form.value as any;

    const payload = {
      id: +f.id,
      dateIssued: f.date || null,
      licensee: f.payor || null,
      address: f.address || null,
      particulars: f.particulars || null,
      periodCovered: f.period || null,

      // ✅ match backend property names
      rslRadioStation: +f.radioLicense || 0,
      rocOperatorFee: +f.rocCert || 0,
      rslSurcharge: +f.surchargeAmateur || 0,
      dst: +f.dst || 0,

      remarksNote: f.remarks || null,
      totalAmount: this.total
    };

    this.loading = true;

    this.soaService.update(+payload.id, payload).subscribe({
      next: () => {
        this.loading = false;
        alert('SOA Saved');
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Save error', err);
        alert('Save failed. Check console.');
      }
    });
  }
}




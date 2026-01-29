import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SoaService } from './services/soa.service';
import { SoaDetail } from './models/soa-detail.model';
import { SoaFormComponent } from "./components/soa-form/soa-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form!: FormGroup;
  details: SoaDetail[] = [];

  constructor(
    private fb: FormBuilder,
    private soaService: SoaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({

      // HEADER
      id: ['6792'],
      date: [''],
      payor: [''],
      address: [''],
      particulars: [''],
      period: [''],

      soaSeries: [''],
      serialNo: [''],
      isMobile: [false],

      txnType: [''],
      licenseType: [''],

      // LICENSE FEES
      permitPurchase: [''],
      filingFeeLicense: [''],
      permitPossess: [''],
      constructionFee: [''],
      radioLicense: [''],
      inspectionFeeLicense: [''],
      suf: [''],
      fines: [''],
      surchargeLicense: [''],

      // PERMITS
      permitFees: [''],
      inspectionFeePermit: [''],
      filingFeePermit: [''],
      surchargePermit: [''],

      // AMATEUR
      amateurRadio: [0],
      rocCert: [0],
      applicationFee: [''],
      filingFeeAmateur: [''],
      seminarFee: [''],
      surchargeAmateur: [0],

      // OTHER
      dst: [0],

      remarks: [''],
      assessmentNote: [''],
      preparedBy: [''],
      approvedBy: [''],
      orNo: [''],
      datePaid: ['']
    });

    // LOAD EXISTING SOA
    this.loadSoa(6792);
  }

  loadSoa(id: number): void {

    // SOA HEADER
    this.soaService.getSoa(id).subscribe({
      next: soa => this.form.patchValue(soa),
      error: err => console.error('SOA load error', err)
    });

    // SOA DETAILS
    this.soaService.getSoaDetails(id).subscribe({
      next: details => {
        this.details = details;

        // auto-map detail amounts into form fields
        details.forEach(d => {
          if (this.form.contains(d.field)) {
            this.form.get(d.field)?.setValue(d.amount);
          }
        });
      },
      error: err => console.error('SOA details error', err)
    });
  }

  get total(): number {
    const f = this.form.value;
    return (
      (+f.amateurRadio || 0) +
      (+f.rocCert || 0) +
      (+f.surchargeAmateur || 0) +
      (+f.dst || 0)
    );
  }

  save(): void {
    console.log('FINAL SOA PAYLOAD', {
      header: this.form.value,
      details: this.details
    });
    alert('SOA Saved');
  }
}
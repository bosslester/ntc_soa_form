import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({

      // HEADER
      id: ['6792'],
      date: ['2025-08-14'],
      payor: [''],
      address: [''],
      particulars: [''],
      period: [''],

      soaSeries: ['2025-08-327M'],
      serialNo: ['327'],
      isMobile: [true],

      txnType: ['New'],
      licenseType: ['ROC'],

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
      amateurRadio: [432],
      rocCert: [180],
      applicationFee: [''],
      filingFeeAmateur: [''],
      seminarFee: [''],
      surchargeAmateur: [102],

      // OTHER
      dst: [30],

      remarks: [''],
      assessmentNote: [''],

      preparedBy: [''],
      approvedBy: [''],

      orNo: [''],
      datePaid: ['']
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

  save() {
    console.log(this.form.value);
    alert('SOA Saved');
  }
}

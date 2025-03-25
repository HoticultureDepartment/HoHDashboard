import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-beneficiary',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.css'
})
export class BeneficiaryComponent {
  BeneficiaryForm: FormGroup;

  constructor() {
    this.BeneficiaryForm = new FormGroup({
      beneficiaryName: new FormControl(''),
      fatherName: new FormControl(''),
      fyYear: new FormControl(''),
      schemeName: new FormControl(''),
      componantName: new FormControl(''),
      villageName: new FormControl(''),
      blockName: new FormControl(''),
      districtName: new FormControl(''),
      mobileNo: new FormControl(''),
      panCard: new FormControl(''),
      familyID: new FormControl(''),
      claimID: new FormControl(''),
      category: new FormControl(''),
      gender: new FormControl(''),
      areaNosPerUnit: new FormControl(''),
      subsidyAmountToFarmer: new FormControl(''),
      accountNumber: new FormControl(''),
      ifsC_Code: new FormControl(''),
      uidByDepartment: new FormControl(''),
      cropName: new FormControl(''),
      transactionType: new FormControl('')
    })
  }
}

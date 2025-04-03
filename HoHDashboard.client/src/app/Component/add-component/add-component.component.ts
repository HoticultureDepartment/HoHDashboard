import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FetchAPIsService } from '../../fetch-apis.service';
import { format } from 'highcharts';

@Component({
  selector: 'app-add-component',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-component.component.html',
  styleUrl: './add-component.component.css'
})
export class AddComponentComponent {
  componentList: any = [];
  componentForm: any = FormGroup;
  componentFormValues: any;


  constructor(private fetchApi: FetchAPIsService) {
    this.componentForm = new FormGroup({
      ComponentName: new FormControl('', [Validators.required]),
      ComponentCode: new FormControl('', [Validators.required])
    });
  }
  AddComponent() {
    if (!this.componentForm.invalid) {
      this.componentFormValues = { ...this.componentForm.value }
      if (this.componentFormValues) {
        this.fetchApi.AddComponent(this.componentFormValues).subscribe((res: any) => {
          if (res.success) {
            window.alert(res.message);
            this.GetComponentList();
          }
        }, (err: any) => { console.log(err) })
      }
    }
  }

  public GetComponentList() {
    this.fetchApi.Components().subscribe((res: any) => {
      this.componentList = res;
      console.table(this.componentList)
    }, (err: any) => { console.log(err) })
  }

  ngOnInit() {
    this.GetComponentList();
  }
}

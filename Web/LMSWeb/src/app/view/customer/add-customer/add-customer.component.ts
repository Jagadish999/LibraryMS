import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  // For form selections and password view and hide
  isLinear = true;
  hidePassword: boolean = true;
  includePassword: boolean = true;

  // Form Details first
  customerDetailForm_1: FormGroup;
  customerDetailForm_2: FormGroup;

  // membership type, userType and payment type received form customer components
  membershipTypes: any;
  userTypes: any;
  paymentTypes: any;

  // When user selects specific membership types
  selectedMemberShip: any;

  constructor(
    public cs: CustomerService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCustomerComponent>,
  ) {

    this.customerDetailForm_1 = this.fb.group({});
    this.customerDetailForm_2 = this.fb.group({});
  }

  ngOnInit(): void {

    this.initializeRequiredData();
    this.initializeFormDetails();
  }

  initializeRequiredData() {

    this.membershipTypes = this.data.memberType;
    this.userTypes = this.data.userType;
    this.paymentTypes = this.data.paymentType;

    if (this.data.mode.toLowerCase() === 'edit') {

      this.includePassword = false;
      this.selectedMemberShip = this.data.memberType[0];
    }
  }

  // Exclude password field while updating
  initializeFormDetails() {

    if (this.data.mode.toLowerCase() === 'add') {

      this.customerDetailForm_1 = this.fb.group({
        fullName: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
        email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        password: this.fb.control('', [Validators.required, Validators.maxLength(25)]),
        userName: this.fb.control('', [Validators.required, Validators.maxLength(25)]),
        phone: this.fb.control('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d+$/)])
      });

      this.customerDetailForm_2 = this.fb.group({
        membershipType: this.fb.control('', [Validators.required])
      });
    }
    else if (this.data.mode.toLowerCase() === 'edit') {

      this.customerDetailForm_1 = this.fb.group({
        fullName: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
        email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        userName: this.fb.control('', [Validators.required, Validators.maxLength(25)]),
        phone: this.fb.control('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d+$/)])
      });

      this.customerDetailForm_2 = this.fb.group({
        membershipType: this.fb.control('', [Validators.required])
      });
    }

    if (this.data.mode.toLowerCase() === 'edit') {

      this.customerDetailForm_1.get('fullName')?.setValue(this.data.currentUserDetail.fullName);
      this.customerDetailForm_1.get('email')?.setValue(this.data.currentUserDetail.email);
      this.customerDetailForm_1.get('userName')?.setValue(this.data.currentUserDetail.userName);
      this.customerDetailForm_1.get('phone')?.setValue(this.data.currentUserDetail.phone);
      this.customerDetailForm_2.get('membershipType')?.setValue(this.selectedMemberShip.membershipTypeName)
    }
  }

  membershipSel(type: any) {

    this.selectedMemberShip = type;
  }

  save() {

    const currentUser: any = localStorage.getItem('user');

    let json: any;

    if(this.data.mode.toLowerCase() === 'add'){

      json = {
        fullName: this.customerDetailForm_1.get('fullName')?.value,
        email: this.customerDetailForm_1.get('email')?.value,
        password: this.customerDetailForm_1.get('password')?.value,
        phone: this.customerDetailForm_1.get('phone')?.value,
        userType: this.userTypes[0].userTypeId,
        membershipId: this.selectedMemberShip.membershipTypeId,
        paymentType: this.paymentTypes[0].paymentTypeId,
        userPersonId: JSON.parse(currentUser).userId,
        userName: this.customerDetailForm_1.get('userName')?.value
      };
    }
    else{
    json = {
      fullName: this.customerDetailForm_1.get('fullName')?.value,
      email: this.customerDetailForm_1.get('email')?.value,
      phone: this.customerDetailForm_1.get('phone')?.value,
      userName: this.customerDetailForm_1.get('userName')?.value
    };
    }


    console.log(json);

    this.cs.setUser(json).subscribe(
      res => {
        console.log(res)

        if (res) {
          this.snackBar.open("New User Inserted", "OK");
          this.dialogRef.close(res[0]);
        }
      },
      error => {
        this.snackBar.open("Invalid User Details", "OK")
      }
    )
  }
}

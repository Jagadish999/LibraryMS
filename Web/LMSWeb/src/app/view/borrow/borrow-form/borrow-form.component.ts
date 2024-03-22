import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowService } from '../borrow.service';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-borrow-form',
  templateUrl: './borrow-form.component.html',
  styleUrls: ['./borrow-form.component.scss']
})
export class BorrowFormComponent implements OnInit {

  borrowFormBuilder: FormGroup;

  bookDetails: any;
  userDetails: any;

  selectedUser: any;

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BorrowFormComponent>,
    public bs: BorrowService,
    public cs: CustomerService
  ) {
    if (this.data.mode.toLowerCase() === 'add') {

      console.log("From initialized");
      this.borrowFormBuilder = this.fb.group({
        bookName: fb.control('', [Validators.required]),
        userName: fb.control('', [Validators.required])
      });
    } else {
      this.borrowFormBuilder = this.fb.group({});
    }
  }


  ngOnInit(): void {

    console.log(this.data);
    this.bookDetails = this.data.bookDetails;
    this.userDetails = this.data.userDetails;

    this.borrowFormBuilder.get('bookName')?.setValue(this.bookDetails.title);
    this.borrowFormBuilder.get('userName')?.setValue(this.userDetails[0].userName);

    this.selectedUser = this.userDetails[0];
  }

  userSelected(userDetails: any) {
    this.selectedUser = userDetails;
  }

  save() {
    const currentUser: any = localStorage.getItem('user');
    const json = {
      userId: this.selectedUser.userId,
      bookId: this.bookDetails.bookId,
      userPersonId: JSON.parse(currentUser).userId
    }

    console.log(json);

    this.bs.setBorrowDetail(json).subscribe(res => {
      if (res) {
        this.snackBar.open("Book Successfully Issued", "OK");

        this.dialogRef.close(res);
      }
    })
  }

}

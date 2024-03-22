import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../customer/customer.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.scss']
})
export class IssueBookComponent implements OnInit {


  // For gathering data
  borrowFormBuilder: FormGroup;

  // For selectgin required data
  bookDetails: any;
  userDetails: any;

  selectedUser: any;

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IssueBookComponent>,
    public cs: CustomerService,
    public bs: BookService
  ) {

    this.borrowFormBuilder = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeRequiredData();
    this.initializeForm();

  }

  initializeRequiredData() {

    this.bookDetails = this.data.bookDetails;

    const json = {};
    this.cs.getCustomer(json).subscribe(res => {

      this.userDetails = res.data;
      console.log(this.userDetails);
    });

  }

  // Initialize book details
  initializeForm() {

    this.borrowFormBuilder = this.fb.group({

      bookName: this.fb.control('', [Validators.required]),
      userName: this.fb.control('', [Validators.required])
    });

    this.borrowFormBuilder.get('bookName')?.setValue(this.bookDetails.title);
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

    this.bs.setBorrowDetail(json).subscribe(res => {
      if (res) {

        console.log(res)
        if(res[0].error){
          this.snackBar.open(res[0].error, "OK");
        }
        else{
          this.snackBar.open("Book Successfully Issued", "OK");
          this.dialogRef.close(res);
        }
      }
    })
  }


}

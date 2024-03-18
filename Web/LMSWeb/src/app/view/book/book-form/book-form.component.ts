import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  formMode: string = '';

  bookDetailForm: FormGroup;

  constructor(
    public bs: BookService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookFormComponent>,
  ) {
    this.bookDetailForm = this.fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      genre: fb.control('', [Validators.required]),
      totalQuantity: fb.control('', [Validators.required, this.validateNumber()]),
      availableQuantity: fb.control('', [Validators.required, this.validateNumber()])
    });
  }

  ngOnInit(): void {
  }


  validateNumber(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {

        return null;
      }

      const isValid = !isNaN(Number(value));
      return isValid ? null : { 'notANumber': true };
    };
  }



  save() {

    let currentUser: any = localStorage.getItem('user');
    let json:any;

    if(this.data.mode.toLowerCase() === 'add'){

      //{"title": "title 1","author": "Author 1","genre": 12,"totalQuantity": 12,"availableQuantity": 12,"userPersonId": 1}
      json = {
        title: this.bookDetailForm.get('title')?.value,
        author: this.bookDetailForm.get('author')?.value,
        genre: this.bookDetailForm.get('genre')?.value,
        totalQuantity: this.bookDetailForm.get('totalQuantity')?.value,
        availableQuantity: this.bookDetailForm.get('availableQuantity')?.value,
        userPersonId: JSON.parse(currentUser).userId
      }
    }

    this.bs.setBook(json).subscribe(
      res => {
        this.snackBar.open(res[0].title + " Inserted", "OK");
        this.dialogRef.close(res[0]);
      },
      error => {
        this.snackBar.open("Error Inserting Book", "OK");
      }
    );
  }

}

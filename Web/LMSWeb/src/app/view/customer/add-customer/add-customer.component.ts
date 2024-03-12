import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  typeDetail: any = [
    {
      memberType: "VIP",
      membershipTypeId: 1,
      paymentType: 4,
      price: 1000
    },
    {
      memberType: "REGULAR",
      membershipTypeId: 2,
      paymentType: 3,
      price: 800
    }
  ];

  selectedMembershipType = this.typeDetail[0];

  // Set payment manually
  formObject: any = {
    fullName: '111',
    email: '222',
    password: '333',
    userName: '444',
    phone: '555',
    userType: 2,
    membershipType: '',
    paymentType:  '',
    userPersonId: ''
  }
  constructor(public cs: CustomerService) { 


    console.log(this.selectedMembershipType.memberType);
  }

  ngOnInit(): void {

    this.selectedMembershipType = this.typeDetail[0];
    this.formObject.membershipType = this.selectedMembershipType.memberType;
    this.formObject.paymentType = this.selectedMembershipType.paymentType;

    console.log(this.formObject);
  }

  save() {

    console.log(this.formObject);
    this.cs.setUser(this.formObject).subscribe(res => {
      console.log(res);
    })
  }

  paymentOptSel(payment: string) {

    let specificTypes: any = this.typeDetail.find((eachType: any) => eachType.memberType === payment)

    this.formObject.membershipType = specificTypes.membershipTypeId;

    const currentUser: any = localStorage.getItem('user');
    this.formObject.userPersonId = JSON.parse(currentUser).userId;

    console.log(this.formObject);
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList:EmployeeModel[] = [];
  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){ 
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
     }
  }
  reset(){
    this.employeeObj = new EmployeeModel();
    this.createForm()
  }
  createForm(){
    this.employeeForm = new FormGroup({
     empid: new FormControl(this.employeeObj.empId),
     name: new FormControl(this.employeeObj.name,[Validators.required]),
     city: new FormControl(this.employeeObj.city),
     state: new FormControl(this.employeeObj.state),
     email: new FormControl(this.employeeObj.email),
     contactNo: new FormControl(this.employeeObj.contactNo),
     address: new FormControl(this.employeeObj.address),
     pincode: new FormControl(this.employeeObj.pincode,[Validators.required,Validators.minLength(6)]),
    })
  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){ 
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length +1);
      this.employeeList.unshift(this.employeeForm.value);
     }else{
      this.employeeList.unshift(this.employeeForm.value);
     }
     localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
     this.reset()
  }

  onEdit(item:EmployeeModel){
    this.employeeObj = item;
    this.createForm()
    }
  onUpdate() {
    const record =this.employeeList.find(m=>m.empId == this.employeeForm.controls['empid'].value);
    if(record != undefined) {
      record.name = this.employeeForm.controls['name'].value
      record.city = this.employeeForm.controls['city'].value
      record.state = this.employeeForm.controls['state'].value
      record.email = this.employeeForm.controls['email'].value
      record.contactNo = this.employeeForm.controls['contactNo'].value
      record.address = this.employeeForm.controls['address'].value
      record.pincode = this.employeeForm.controls['pincode'].value
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.reset()
  }
  onDelete(id:number){
    const isDelete = confirm("Are you sure want to Delete");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1)
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }
  }
}

export class EmployeeModel{
    empId: number;
    name: string;
    city: string;
    state: string;
    email: string;
    contactNo: string;
    address: string;
    pincode: string;

    constructor(){
        this.empId = 1;
        this.name = '';
        this.city = '';
        this.state = '';
        this.email = '';
        this.contactNo = '';
        this.address = '';
        this.pincode = '';
    }
}
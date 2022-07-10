import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,private api : ApiService,private dialogRef:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public editData : any) { }

  actionBtn : string = "Save";

  
  userForm =new FormGroup({
    id : new FormControl(''),
    name : new FormControl('',Validators.required),
    email : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    dob : new FormControl('',Validators.required),
    age : new FormControl(''),
    salary : new FormControl('',Validators.required),
    status : new FormControl('',Validators.required)
  })

  get id(){
    return this.userForm.controls['id']
  }
  get userName(){
    return this.userForm.controls['name']
  }
  get userEmail(){
    return this.userForm.controls['email']
  }
  get userDob(){
    return this.userForm.controls['dob']
  }
  get userAge(){
    return this.userForm.controls['age']
  }
  get userSalary(){
    return this.userForm.controls['salary']
  }
  get userStatus(){
    return this.userForm.controls['status']
  }

  //get tasktitle() { return this.taskform.controls['title'] }


  // userForm !: FormGroup 
  

  ngOnInit(): void {
    // console.log(this.editData);
    // console.log(this.editData.id);
    
    this.getDate();

    if(this.editData){
      this.actionBtn="Update"
      this.userForm.controls['id'].setValue(this.editData.id);
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['dob'].setValue(this.editData.dob);
      this.userForm.controls['age'].setValue(this.editData.age);
      this.userForm.controls['salary'].setValue(this.editData.salary);
      this.userForm.controls['status'].setValue(this.editData.status)
    }
    // this.userForm = this.formBuilder.group({
    //   name : ['',Validators.required],
    //   email : ['',Validators.required],
    //   dob : ['',Validators.required],
    //   age : ['',Validators.required],
    //   salary : ['',Validators.required],
    //   status : ['',Validators.required],
      
    // })
  }

  
  addUser(){  
    if(!this.editData){
      if(this.userForm.valid){
        this.userForm.value.age = this.getAge(this.userForm.value.dob);
        this.api.postUser(this.userForm.value).subscribe({
          next:(res)=>{
            alert("user added successfully");
            this.userForm.reset();
            this.dialogRef.close('save');
          },error:()=>{
            alert("something went wrong");
          }
        })
      }
    }else{
      this.updateUser();
    } 
  }

  updateUser(){
    this.userForm.value.age = this.getAge(this.userForm.value.dob)
    this.api.putUser(this.userForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("User Details Updated successfully");
        this.userForm.reset();
        this.dialogRef.close('update')
      },error:()=>{
        alert("Error While Updating The Records");
      }
    })
  }
  getAge(dateString:any) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  minDate: any;

  getDate() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    if(toDate < 10){
      toDate = "0" + toDate;
    }
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year: any = date.getFullYear();
    console.log(toDate);
    this.minDate = year + "-" + month + "-" + toDate;
  }
}

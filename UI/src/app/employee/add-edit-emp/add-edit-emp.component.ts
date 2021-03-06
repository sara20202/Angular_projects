import { Component, OnInit ,Input} from '@angular/core';
import {SharedService} from "../../shared.service";
import {FormControl, FormGroup, Validators , FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  public myGroup: any;


  constructor(private service:SharedService) { }
  @Input() emp:any;
  EmployeeId: string | undefined;
  EmployeeName: string | undefined;
  Department: string | undefined;
  DateOfJoining: string | undefined;
  PhotoFileName:string |undefined;
  PhotoFilePath:string | undefined;

  DepartmentsList:any[] | undefined;



  ngOnInit(): void {
    this.loadDepartmentList();
    // this.myGroup = new FormGroup({
    //   firstName: new FormControl(this.myGroup,
    //     [Validators.required,
    //       Validators.minLength(4),
    //     ]),
    //
    // })

    this.myGroup = new FormGroup({
      name: new FormControl(  '', Validators.minLength(2),
              )
    });
  }
  log(x:any){
    console.log(x);
  }
  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }
  addEmployee(){
    let val = {
      EmployeeId:this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });

  }
  updateEmployee(){
    let val = {
      EmployeeId:this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  uploadPhoto(event: any){
    let file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

  // getErrors() {
  //
  // }

}

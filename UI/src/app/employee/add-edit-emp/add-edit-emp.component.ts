import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  EmployeeId: string | undefined;
  EmployeeName: string | undefined;
  Department: string | undefined;
  DateOfJoining: string | undefined;
  PhotoFileName: string | undefined;
  PhotoFilePath: string | undefined;
  DepartmentsList: any[] | undefined;
  ActivateAddEditEmpComp: boolean = false;
  EmployeeList: any = [];

  constructor(private service: SharedService) {
  }

  ngOnInit(): void {
    this.loadDepartmentList();

  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentsList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    })
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });

    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
    });

    this.closeClick();
    this.ActivateAddEditEmpComp = false;
  }

  uploadPhoto(event: { target: { file: any[]; }; }) {
    var file = event.target.file[0];
    const formData: FormData = new FormData();
    formData.append('UploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    })
  }


  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();

  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
      // this.DepartmentsList=data;
    });
  }

}

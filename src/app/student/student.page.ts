import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { StudentService } from '../student.service';

interface Student {
  id: number;
  name: string;
  grade: number;
  isProjectDone: boolean;
  comment: string;
}
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
id:number
student:Student[] =[
  {id:0,name:"",grade:0,isProjectDone:false,comment:""}
]
  constructor(private studentService:StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.id =parseInt( this.route.snapshot.paramMap.get('id'))
    console.log(this.id)
    this.findById()
    console.log(this.student)
  }

  findById(){
    this.studentService.ajaxGet().subscribe((result:Student[]) =>{
      this.student[0]=result[this.id-1]
    })
  }
}

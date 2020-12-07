import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TestComponent } from '../components/test/test.component';
import { StudentService } from '../student.service';

interface Student {
  id: number;
  name: string;
  grade: number;
  isProjectDone: boolean;
  comment: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  students: Student[] = [
    { id: 15, name: "Hugo", grade: 12, isProjectDone: false, comment: "Appliqué, attentif" },
    { id: 232, name: "Noémie", grade: 18, isProjectDone: true, comment: "Brillante, tout simplement" },
    { id: 34, name: "Umberto", grade: 6.5, isProjectDone: false, comment: "Dissipé, pertubateur" }
  ]
  numFastStudent: number;
  message: string = "";

  constructor(private popoverCtrl: PopoverController, private studentService:StudentService) {
    this.numFastStudent = this.getDoneProject().length;
    
  }
  ngOnInit(){
    this.findAll()
  }
  findAll(){
    this.studentService.ajaxGet().subscribe((result:Student[]) =>{
      console.log(result)
      this.students=result
    })
  }

  onClick(index: number) {
    this.message = this.students[index].comment;
  }

  onChange(e: any, index: number) {
    let checked = e.target.checked;
    // mise à jour de la source de données
    this.students[index].isProjectDone = checked;
    this.numFastStudent = this.getDoneProject().length;
  }

  async testPopover() {
    let popover = await this.popoverCtrl.create({
      component: TestComponent
    });
    await popover.present();
  }

  /* Retourne les étudiants ayant terminé leur projet */
  private getDoneProject(): Student[] {
    return this.students
      .filter(student => student.isProjectDone == true)
  }

}

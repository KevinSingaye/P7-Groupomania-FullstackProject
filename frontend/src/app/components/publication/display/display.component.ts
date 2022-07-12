import { PublicationService } from './../../../services/publication.service';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-display-post',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Output() output = new EventEmitter();
@Input() post:any;
imagePath : string='';
 nom: string= '';
 email:string='';
 description : string='';
image: string= '';
file: any;

  constructor(private utilisateurService:UtilisateurService, publicationService:PublicationService) { }

  ngOnInit(): void {
      this.imagePath= sessionStorage.getItem('photo')??'';
    this.nom= sessionStorage.getItem('nom')??'';
    this.email=sessionStorage.getItem('email')??'';
  }

  onUpdate():void{
    console.log(this.post);
    this.output.emit(this.post);
  }

  onDelete(post:any):void {
    console.log(this.post);
    this.output.emit(this.post);
  }
}

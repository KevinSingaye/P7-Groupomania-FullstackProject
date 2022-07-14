import { CommentaireService } from './../../../services/commentaire.service';
import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-display-post',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Output() output = new EventEmitter();
  @Input() _id:string | undefined = undefined;
@Input() post:any;
@Input() commentaire:any;
imagePath : string='';
 nom: string= '';
 email:string='';
 description : string='';
 texte: string='';
image: string= '';
file: any;


  constructor(private publicationService:PublicationService, private commentaireService:CommentaireService) { }

  ngOnInit(): void {
      this.imagePath= sessionStorage.getItem('photo')??'';
    this.nom= sessionStorage.getItem('nom')??'';
    this.email=sessionStorage.getItem('email')??'';
  }
  onReset(): void {
    this._id = undefined;
    this.description = '';
    this.texte= '';
  }
  onUpdate():void{
    console.log(this.post);
    this.output.emit({action: 'UPDATE', data: this.post});
  }

 onDelete():void {
      this.publicationService.delete(this.post._id).subscribe((result:any) => {
      console.log(result)
      this.output.emit({action: 'DELETE', data: this.post});
    }, (error: any) =>
      console.error(error))
  
  }

  onCreate():void {
     const body = {texte:this.texte, userId:sessionStorage.getItem('userId')??"", publicationId:this.post._id}

  this.commentaireService.create(body).subscribe((result:  string = this.texte) => {
      console.log(result)
      this.output.emit({action: 'INSERT', data: this.texte});
      this.onReset();
    }, (error: any) =>
      console.error(error))
  }
  
}

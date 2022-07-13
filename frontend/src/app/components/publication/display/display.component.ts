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
imagePath : string='';
 nom: string= '';
 email:string='';
 description : string='';
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
     const body = new FormData();
      body.append('texte', this.description);
      body.append('userId', sessionStorage.getItem('userId') ?? '');
    this.commentaireService.create(body).subscribe((result: any) => {
      console.log(result)
      this.output.emit({action: 'INSERT', data: result});
      this.onReset();
    }, (error: any) =>
      console.error(error))
  }
  
}

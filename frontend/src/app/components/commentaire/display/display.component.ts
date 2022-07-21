import { CommentaireService } from './../../../services/commentaire.service';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-commentaire',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
@Output() output = new EventEmitter();
@Input() _id:string | undefined = undefined;
@Input() commentaire:any;
imagePath : string='';
@Input() comment:any;
image: string= '';

commentaires: any []=[];
  currentCommentaires: any;

  constructor(private commentaireService:CommentaireService) { }

  ngOnInit(): void {
     this.imagePath= sessionStorage.getItem('photo')??'';
  }

  onReset(): void {
    this._id = '';
    this.commentaire= '';
    this.imagePath='';
    this.image='';
    this.commentaire._id= '';
   

    }

onDelete():void {
      this.commentaireService.delete(this.commentaire._id).subscribe((result:any) => {
      console.log(result)
      this.output.emit({action: 'DELETE', data: this.commentaire});
      this.onReset();

  
    }, (error: any) =>
      console.error(error))
   }

  
    
 

  }

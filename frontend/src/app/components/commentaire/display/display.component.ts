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
commentaires: any []=[]
  currentCommentaires: any;

  constructor(private commentaireService:CommentaireService) { }

  ngOnInit(): void {
  }


onDelete():void {
      this.commentaireService.delete(this.commentaire._id).subscribe((result:any) => {
      console.log(result)
      this.output.emit({action: 'DELETE', data: this.commentaire});
    }, (error: any) =>
      console.error(error))
  
  }

onUpdateOrDelete(data:any):void{
     let action = data.action;
  let commentaire= data.data;
  if(action=== 'DELETE'){
let index = this.commentaires.findIndex((commentaire)=> commentaire._id === commentaire._id);
 if (index>-1){
  this.commentaires.splice(index, 1)
 }
  }
    else{
      this.currentCommentaires = commentaire;
    }
  
   
  }

}

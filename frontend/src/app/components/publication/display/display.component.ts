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
currentCommentaires:any;
image: string= '';
file: any;
 like!: number;
commentaires: any []=[];


  constructor(private publicationService:PublicationService, private commentaireService:CommentaireService) { }

  ngOnInit(): void {
      this.imagePath= sessionStorage.getItem('photo')??'';
    this.nom= sessionStorage.getItem('nom')??'';
    this.email=sessionStorage.getItem('email')??'';
    this.commentaireService.findAll(this.post._id).subscribe((results)=>{
      this.commentaires= results;
    },
    (error)=>{
      console.error(error)
    })
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
      console.error(error)) }


onReceiveComment(data: any) {
 let action= data.action;
  let comment = data.data;
if (action=== 'UPDATE') {
 let index = this.commentaires.findIndex((commentaire:any)=> commentaire._id === this.currentCommentaires._id);
 if (index>-1){
  this.commentaires[index]= comment;
 }

  }else {
 this.commentaires.unshift(comment)
  }
}
  
  
  onUpdateOrDelete(data:any):void{
     let action = data.action;
  let commentaire= data.data;
  if(action=== 'DELETE'){
let index = this.commentaires.findIndex((item)=> item._id === commentaire._id);
 if (index>-1){
  this.commentaires.splice(index, 1)
 }
  }
    else{
      this.currentCommentaires = commentaire;
    }
  }


  Onlike():void {  
    this.publicationService.likeOrNot(this._id, this.like).subscribe((result:any) => {  
       this.like= 1;
 console.log(result);
 
    this.output.emit({action: 'UPDATE', data: result});
  })
  }

  OnDislike():void {
    this.publicationService.likeOrNot(this._id, this.like).subscribe((result:any) => {  
       this.like= -1; 
 console.log(result);
  
    this.output.emit({action: 'UPDATE', data: result});
  })
  }}

import { CommentaireService } from './../../../services/commentaire.service';
import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';


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
  userId:any;
  userlike:boolean =false;
  userdislike:boolean= false;
  displayButton: boolean= false;

  commentaires: any []=[];


  constructor(private publicationService:PublicationService, private commentaireService:CommentaireService, private utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
     this.userId= sessionStorage.getItem('userId')??'';
    this.userlike=this.post.usersLiked.includes(this.userId);
     this.userdislike=this.post.usersDisliked.includes(this.userId);
    this.commentaireService.findAll(this.post._id).subscribe((results)=>{
      this.commentaires= results;
    },
    (error)=>{
      console.error(error)
    })
   var moderateur = sessionStorage.getItem('moderateur')??'false';
   console.log('post', this.post);
    
    this.utilisateurService.findOne(this.post.userId).subscribe((results)=>{
    this.imagePath= results.photo;
    this.nom= results.nom;
    this.email= results.email;
    console.log('results', results)
    },(error)=>{ 
      console.error(error)
    })
    this.displayButton= this.post.userId===this.userId || JSON.parse(moderateur);
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
    if (this.userdislike) {
      return 
    }
    var like= this.userlike?0:1
    this.publicationService.likeOrNot(this.post._id, like, this.userId).subscribe((result:any) => {  
      if (this.userlike) {
          this.post.likes-=1;
          const index= this.post.usersLiked.findIndex((x:any)=> x===this.userId)
          if (index>-1) {
            this.post.usersLiked.splice(index,1)
          }
      } else {
        this.post.likes +=1;
        this.post.usersLiked.push(this.userId) 
      } 
      this.userlike=!this.userlike;
  
    console.log(result);
    })
  }

  OnDislike():void {
    if (this.userlike) {
      return
    }
    var like= this.userdislike?0:-1
    this.publicationService.likeOrNot(this.post._id, like, this.userId).subscribe((result:any) => { 
    if (this.userdislike) {
     this.post.dislikes-=1;
     const index= this.post.usersDisliked.findIndex((x:any)=> x===this.userId)
      if (index>-1) {
       this.post.usersDisliked.splice(index,1)
      }
      } else {
        this.post.dislikes +=1;
        this.post.usersDisliked.push(this.userId) 
      } 
      this.userdislike=!this.userdislike; 
      console.log(result);
    })
  }
}

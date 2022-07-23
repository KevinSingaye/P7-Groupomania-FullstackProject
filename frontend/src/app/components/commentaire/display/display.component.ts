import { CommentaireService } from './../../../services/commentaire.service';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

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
displayButton: boolean= false;
userId : string='';
nom : string= '';
email: string= '';


commentaires: any []=[];
  currentCommentaires: any;

  constructor(private commentaireService:CommentaireService, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.userId= sessionStorage.getItem('userId')??'';
    var moderateur = sessionStorage.getItem('moderateur')??'false';
    console.log(moderateur);
     this.utilisateurService.findOne(this.commentaire.userId).subscribe((results)=>{
 this.imagePath= results.photo;
    this.nom= results.nom;
    this.email= results.email;
    console.log('results', results)
    },(error)=>{ 
      console.error(error)
    })
    this.displayButton= this.commentaire.userId===this.userId || JSON.parse(moderateur);
    console.log(this.commentaire);
    console.log(this.userId);
  }

  onReset(): void {
    
    this.commentaire= '';
    this._id= undefined;
    }

onUpdate():void{
    console.log(this.commentaire);
    this.output.emit({action: 'UPDATE', data: this.commentaire});
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
let index = this.commentaires.findIndex((item)=> item._id === commentaire._id);
 if (index>1){
  this.commentaires.splice(index, 1)
 }
  }
    
  }


  }

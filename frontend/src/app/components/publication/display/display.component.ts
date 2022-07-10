
import { UtilisateurService } from './../../../services/utilisateur.service';
import { Component, OnInit,Input } from '@angular/core';



@Component({
  selector: 'app-display-post',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
@Input() post:any;
imagePath : string='';
 nom: string= '';
 email:string='';
 description : string='';
image: string= '';
file: any;

  constructor(private utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
      this.imagePath= sessionStorage.getItem('photo')??'';
    this.nom= sessionStorage.getItem('nom')??'';
    this.email=sessionStorage.getItem('email')??'';
  }

}

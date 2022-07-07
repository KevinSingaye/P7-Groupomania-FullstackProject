import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
imagePath : string='';
 nom: string= '';
 email:string='';
  constructor(public utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
     this.imagePath= sessionStorage.getItem('photo')??'';
    this.nom= sessionStorage.getItem('nom')??'';
    this.email=sessionStorage.getItem('email')??'';
  }

}

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 imagePath : string='';

  constructor(private router:Router, public AuthService:AuthService) { 
  
  }

  ngOnInit(): void {
    
    const userId= sessionStorage.getItem('userId');
    if (!userId) {
this.router.navigate(['login']);
    }
    this.imagePath= sessionStorage.getItem('photo')??'';
    

  }

  
}

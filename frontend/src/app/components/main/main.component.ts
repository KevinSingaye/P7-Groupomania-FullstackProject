import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posts: Array<any> = [];
  inputText: string = "";

  constructor(private router: Router, public utilisateurService: UtilisateurService, public publicationService: PublicationService) { }

  ngOnInit(): void {


    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['login']);
    }

    this.publicationService.findAll().subscribe(
      (result: any) => {
        this.posts = result
      },
      (error: any) => {
        console.log('error', error);
      }
    )

  }

  onReceivePost(post: any) {
    this.posts.unshift(post)
  }
}

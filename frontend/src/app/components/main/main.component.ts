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
  currentPost: any;
  currentComment: any;
  comment: any;

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

  onReceivePost(data: any) {
    let action = data.action;
    let post = data.data;
    if (action === 'UPDATE') {
      let index = this.posts.findIndex((item) => item._id === this.currentPost._id);
      if (index > -1) {
        this.posts[index] = { ...this.posts[index], imageUrl: post.imageUrl, texte: post.texte };
      }
    } else {
      this.posts.unshift(post)
    }
  }



  onUpdateOrDelete(data: any): void {
    let action = data.action;
    let post = data.data;
    if (action === 'DELETE') {
      let index = this.posts.findIndex((item) => item._id === post._id);
      if (index > -1) {
        this.posts.splice(index, 1)
      }
    }
    else {
      this.currentPost = post;
    }


  }

}

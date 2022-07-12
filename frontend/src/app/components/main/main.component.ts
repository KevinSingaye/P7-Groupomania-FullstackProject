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
  currentPost:any;

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
  if (action=== 'UPDATE') {
 let index = this.posts.findIndex((item)=> item._id === this.currentPost._id);
 if (index>-1){
  this.posts[index]= post;
 }
  } else {
 this.posts.unshift(post)
  }
  
  }
  onUpdate(post:any):void{
    this.currentPost = post;
  }
 onDelete(post:any):void{
  this.currentPost= '';
 }
}

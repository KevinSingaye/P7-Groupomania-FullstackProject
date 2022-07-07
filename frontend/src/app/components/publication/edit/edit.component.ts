import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit } from '@angular/core';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
description : string='';
image: string= '';
file: any;

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
  }

onChangeFile(event:any): void {
   // @ts-ignore
      let files = Array.from(event.target.files);

      this.file = files[0];
     
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.image = reader.result?.toString()??'';
      };
}

onCreate():void {
  const body = new FormData();
  body.append('texte', this.description);
  body.append('userId',sessionStorage.getItem('userId')??'');
  body.append('file', this.file);
  this.publicationService.create(body).subscribe((result)=>{
    console.log(result)

  }, (error)=>
  console.error(error))

}
}

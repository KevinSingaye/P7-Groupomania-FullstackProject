import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() output = new EventEmitter();
  @Input() _id:string | undefined = undefined;
  @Input() description: string = '';
  @Input() image: string = '';
  file: any;
  value: string = '';


  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {}

  onReset(): void {
    this._id = undefined;
    this.description = '';
    this.file = undefined;
    this.image = '';
  }


  onChangeFile(event: any): void {
    // @ts-ignore
    let files = Array.from(event.target.files);

    this.file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.image = reader.result?.toString() ?? '';
    };
    this.onReset();
  }

 onCreate(): void { 
    const body = new FormData();
    body.append('texte', this.description);
    body.append('userId', sessionStorage.getItem('userId') ?? '');
    body.append('file', this.file);
    if (this._id) {''
      if(!this.file){
        body.append('imageUrl', this.image);
      }
      this.publicationService.update(this._id,body).subscribe((result: any) => 
      {
       console.log(result)
       this.output.emit({action: 'UPDATE', data: result});
       this.onReset();
      }, (error: any) =>
      console.error(error))
    } 
      else{
         this.publicationService.create(body).subscribe((result: any) => {
         console.log(result)
         this.output.emit({action: 'INSERT', data: result});
         this.onReset();
         }, (error: any) =>
        console.error(error)) 
       } 
  }
}
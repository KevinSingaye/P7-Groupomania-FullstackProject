import { PublicationService } from './../../../services/publication.service';
<<<<<<< HEAD
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
=======
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
>>>>>>> 57949fa3b2cb5d97a45f32bd0a1da3545dae289c

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() output = new EventEmitter();
<<<<<<< HEAD
  @Input() _id:string | undefined = undefined;
  @Input() description: string = '';
  @Input() image: string = '';
=======
  description: string = '';
  image: string = '';
>>>>>>> 57949fa3b2cb5d97a45f32bd0a1da3545dae289c
  file: any;
  value: string = '';


  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    
=======
>>>>>>> 57949fa3b2cb5d97a45f32bd0a1da3545dae289c

  }

  onReset(): void {
<<<<<<< HEAD
    this._id = undefined;
=======
>>>>>>> 57949fa3b2cb5d97a45f32bd0a1da3545dae289c
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
  }

  onCreate(): void {
    const body = new FormData();
    body.append('texte', this.description);
    body.append('userId', sessionStorage.getItem('userId') ?? '');
    body.append('file', this.file);
<<<<<<< HEAD
    if (this._id) {
 this.publicationService.update(this._id, body).subscribe((result: any) => {
      console.log(result)
      this.output.emit({action: 'UPDATE', data: result});
      this.onReset();
 }, (error:any) =>
 console.error(error))
    } else {
    this.publicationService.create(body).subscribe((result: any) => {
      console.log(result)
      this.output.emit({action: 'UPDATE', data: result});
=======
    this.publicationService.create(body).subscribe((result: any) => {
      console.log(result)
      this.output.emit(result);
>>>>>>> 57949fa3b2cb5d97a45f32bd0a1da3545dae289c
      this.onReset();
    }, (error: any) =>
      console.error(error))
  }

}
}
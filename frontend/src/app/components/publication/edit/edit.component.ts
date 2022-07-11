import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() output = new EventEmitter();
  description: string = '';
  image: string = '';
  file: any;
  value: string = '';


  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {

  }

  onReset(): void {
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
    this.publicationService.create(body).subscribe((result: any) => {
      console.log(result)
      this.output.emit(result);
      this.onReset();
    }, (error: any) =>
      console.error(error))
  }

}

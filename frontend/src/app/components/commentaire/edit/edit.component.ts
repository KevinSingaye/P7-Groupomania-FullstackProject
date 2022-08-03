import { CommentaireService } from './../../../services/commentaire.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-commentaire',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() texte: string = '';
  @Output() output: any = new EventEmitter();
  @Input() post: any;
  @Input() image: string = '';

  constructor(private commentaireService: CommentaireService) { }

  ngOnInit(): void {
    console.log(this.post);
  }

  onReset() {
    this.texte = '';
  }
  onCreate(): void {
    console.log(this.texte)
    const body = { texte: this.texte, userId: sessionStorage.getItem('userId') ?? "", publicationId: this.post._id }

    this.commentaireService.create(body).subscribe((result: any) => {
      console.log(result)
      this.output.emit({ action: 'INSERT', data: result });
      this.onReset();
    }, (error: any) =>
      console.error(error))
  }
}

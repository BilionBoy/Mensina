import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ITag } from 'src/app/interfaces/ITag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  tags: ITag[] = [];

  @Output() tagSelected = new EventEmitter<number>();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onTagClick(tagId: number): void {
    this.tagSelected.emit(tagId);  // Emite o ID da tag selecionada
  }
}

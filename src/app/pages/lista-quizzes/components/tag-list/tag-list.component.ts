import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TagService } from '../../../../../services/tag.service';
import { ITag } from '../../../../../interfaces/ITag';
import { ITagIcon, tagsIcons } from '../../../../../constants/tagsIcon';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  standalone: true
})
export class TagListComponent implements OnInit {
  tags: ITag[] = [];
  _tagsIcons:  Record<number, ITagIcon> = []

  @Output() tagSelected = new EventEmitter<number>();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this._tagsIcons = tagsIcons
    
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onTagClick(tagId: number): void {
    this.tagSelected.emit(tagId);  // Emite o ID da tag selecionada
  }
}

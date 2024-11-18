import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TagService } from '../../../../../services/tag.service';
import { ITag } from '../../../../../interfaces/ITag';
import { ITagIcon, tagsIcons } from '../../../../../constants/tagsIcon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TagListComponent implements OnInit {
  tags: ITag[] = [];
  _tagsIcons: Record<number, ITagIcon> = []
  isExpanded = false;

  @Output() tagSelected = new EventEmitter<number>();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this._tagsIcons = tagsIcons

    this.tagService.getTags().subscribe((tags: ITag[]) => {
      this.tags.push({
        description: 'Todos',
        id: 0,
        isSelected: true
      })
      const aux = tags.sort((a, b) => {
        return a.description.length - b.description.length;
      });
      this.tags = [
        ...this.tags,
        ...aux.map(t => ({ ...t, isSelected: false }))
      ]
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onTagClick(tagId: number): void {
    this.tags = this.tags.map(t => ({
        ...t,
        isSelected: t.id === tagId
      }))
    this.tagSelected.emit(tagId);  // Emite o ID da tag selecionada
  }
}

import { Component, Input } from '@angular/core';
import { IRank } from '../../../interfaces/IRank';

@Component({
  standalone: true,
  selector: 'app-rank-item',
  templateUrl: './rank-item.component.html',
  styleUrls: ['./rank-item.component.css']
})
export class RankItemComponent {
  @Input() position: number = 0
  @Input() rankItem!: IRank; // Recebe os dados do item do rank como entrada
}

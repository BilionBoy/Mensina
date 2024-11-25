import { Component, Input, OnInit } from '@angular/core';
import { RankService } from '../../../../../services/rank.service';
import { IRank } from '../../../../../interfaces/IRank';
import { ToastrService } from 'ngx-toastr';
import { RankItemComponent } from '../../../../shared/rank-item/rank-item.component';

@Component({
  selector: 'app-rank-global',
  standalone: true,
  imports: [
    RankItemComponent
  ],
  templateUrl: './rank-global.component.html',
  styleUrl: './rank-global.component.css'
})
export class RankGlobalComponent {
  @Input() rank: IRank[] = []
  @Input() loading: boolean = false
}

import { Component, Input, OnInit } from '@angular/core';
import { IRank } from '../../../../../interfaces/IRank';
import { RankItemComponent } from '../../../../shared/rank-item/rank-item.component';
import { Router } from '@angular/router';


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

  constructor(private router: Router){}

  nav(){
    this.router.navigate(['/login'])
  }
}

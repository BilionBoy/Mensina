import { Component, OnInit } from '@angular/core';
import { RankService } from '../../../services/rank.service';
import { IRank } from '../../../interfaces/IRank';
import { RankItemComponent } from '../../shared/rank-item/rank-item.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  imports: [
    RankItemComponent,
    SideBarComponent
  ],
  standalone: true,
})
export class RankingComponent implements OnInit {
  rankList: IRank[] = []; // Array para armazenar os dados do ranking

  constructor(private rankService: RankService) { }

  ngOnInit(): void {
    this.fetchRankData();
  }

  fetchRankData(): void {
    this.rankService.getRank().subscribe({
      next: (data) => {
        this.rankList = data;
      },
      error: (error) => {
        console.error('Erro ao buscar o ranking:', error);
      }
    });
  }
}

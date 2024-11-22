import { Component, OnInit } from '@angular/core';
import { RankService } from '../../../services/rank.service';
import { IRank } from '../../../interfaces/IRank';
import { RankItemComponent } from '../../shared/rank-item/rank-item.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { RankPessoalComponent } from "./components/rank-pessoal/rank-pessoal.component";
import { RankGlobalComponent } from "./components/rank-global/rank-global.component";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  imports: [
    RankItemComponent,
    SideBarComponent,
    RankPessoalComponent,
    RankGlobalComponent
],
  standalone: true,
})
export class RankingComponent implements OnInit {
  rankList: IRank[] = [];

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

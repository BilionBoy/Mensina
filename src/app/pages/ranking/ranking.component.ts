import { Component, OnInit } from '@angular/core';
import { RankService } from 'src/app/services/rank.service';
import { IRank } from 'src/interfaces/IRank';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  rankList: IRank[] = []; // Array para armazenar os dados do ranking

  constructor(private rankService: RankService) {}

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

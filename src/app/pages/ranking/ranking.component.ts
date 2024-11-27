import { Component, OnInit } from '@angular/core';
import { RankService } from '../../../services/rank.service';
import { IRank } from '../../../interfaces/IRank';
import { RankItemComponent } from '../../shared/rank-item/rank-item.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { RankPessoalComponent } from "./components/rank-pessoal/rank-pessoal.component";
import { RankGlobalComponent } from "./components/rank-global/rank-global.component";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { IKpi } from '../../../interfaces/IKpi';
import { Router } from '@angular/router';

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
  rank: IRank[] = []
  kpi: IKpi = {} as IKpi
  rankLoading: boolean = false
  kpiLoading: boolean = false

  constructor(
    private rankService: RankService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRank()
    this.getKpi()
  }

  getRank() {
    this.rankLoading = true
    this.rankService.getRank()
    .subscribe({
      next: res => {
        this.rank = res
        this.rankLoading = false
      },
      error: err => {
        this.rankLoading = false
        this.toastr.error("Erro ao carregar ranking global")
      }
    })
  }

  getKpi() {
    this.kpiLoading = true
    this.userService.getKpi()
    .subscribe({
      next: res => {
        this.kpi = res
        this.kpiLoading = false
      },
      error: err => {
        this.toastr.error("Erro ao carregar ranking pessoal")
        this.kpiLoading = false
      }
    })
  }

  nav(){
    this.router.navigate(['/login'])
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { IKpi } from '../../../../../interfaces/IKpi';
import { ToastrService } from 'ngx-toastr';
import { IRank } from '../../../../../interfaces/IRank';
import { IUser } from '../../../../../interfaces/IUser';

@Component({
  selector: 'app-rank-pessoal',
  standalone: true,
  imports: [],
  templateUrl: './rank-pessoal.component.html',
  styleUrl: './rank-pessoal.component.css',
})
export class RankPessoalComponent implements OnInit {
  @Input() rank?: IRank[]

  @Input() kpi: IKpi = {} as IKpi
  @Input() loading: boolean = false

  position: number = 0  

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {    
    this.getRankPosition()
  }

  async getRankPosition() {
    const userInfo = await this.userService.getUserInfos()
    console.log(userInfo);
    console.log(this.rank);
    
    this.rank?.map((r, index )=> {      
      if(r.userId === userInfo.id) {        
        this.position = index+1
      }
    })
  }
}

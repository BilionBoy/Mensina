import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IUser } from '../../../interfaces/IUser';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { AtualizarDadosComponent } from '../../pages/lista-quizzes/components/atualizar-dados/atualizar-dados.component';
import { IKpi } from '../../../interfaces/IKpi';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    AtualizarDadosComponent,
    RouterModule
  ]
})
export class SideBarComponent implements OnInit {
  @Input() screen: 'lista-quizzes' | 'rank' = 'lista-quizzes'
  kpi: IKpi = {} as IKpi

  editarPerfil?: boolean = false
  userIconUrl: SafeUrl | null = null;
  selectedFile: File | null = null;
  userInfo: IUser = {};
  loadingIcon = false;
  public navbarVisivel: boolean = false;
  public telaGrande: boolean = false;


  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getKpi()
  }

  getKpi() {
    this.userService.getKpi()
    .subscribe({
      next: res => {
        this.kpi = res
      }
    })
  }

  onSubmitEvent(event: any) {
    if (event) {
      this.getUserInfo();
    }
    this.editarPerfil = !this.editarPerfil
  }

  toggleNavbar() {
    if (this.navbarVisivel) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
      this.editarPerfil = false;
    } else {
      this.renderer.addClass(this.document.body, 'no-scroll');
    }
    this.navbarVisivel = !this.navbarVisivel;
  }

  logout() {
    Swal.fire({
      title: 'Você deseja realizar o Logout?',
      text: 'Ao sair, será necessário fazer login novamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.route.navigate(['/login']);
      }
    });
  }

  getUserInfo() {
    this.userService.getUserInfos().subscribe({
      next: (res: IUser) => {
        this.userInfo = res;
        this.getIconByUserId(res.id!);
      },
      error: (err) => {
        this.toastr.error('Não foi possível obter informações do usuário');
      },
    });
  }

  getIconByUserId(id: number) {
    this.loadingIcon = true;
    this.userService.getIcon(id).subscribe({
      next: (blob) => {
        this.loadingIcon = false;
        this.loadingIcon = false;
        if (!blob.size) return;
        const url = URL.createObjectURL(blob);
        this.userIconUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => {
        this.loadingIcon = false;
        console.error('Erro ao carregar a imagem', err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loadingIcon = true;
      const formData = new FormData();
      formData.append('file', file);
      this.userService.uploadIcon(formData).subscribe({
        next: (response) => {
          this.loadingIcon = false;
          if (!this.userInfo.id) return;
          this.getIconByUserId(this.userInfo.id);
        },
        error: (error) => {
          this.loadingIcon = false;
          console.error('Erro ao enviar o ícone', error);
        },
      });
    }
  }
}

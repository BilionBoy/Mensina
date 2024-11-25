import { RouterModule } from '@angular/router';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { RankService } from '../../../services/rank.service';
import { IRank } from '../../../interfaces/IRank';
import { RankItemComponent } from '../../shared/rank-item/rank-item.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-quizzes',
  standalone: true,
  imports: [
    QuizCardComponent,
    CommonModule,
    SideBarComponent, // Adicionado na lista de imports
    TagListComponent,
    RankItemComponent,
    RouterModule,
  ],
  templateUrl: './lista-quizzes.component.html',
  styleUrls: ['./lista-quizzes.component.css'],
})
export class ListaQuizzesComponent implements OnInit {
  quizzes: IQuiz[] = [];
  myQuizzes: IQuiz[] = [];
  rankList: IRank[] = [];
  userIcons: Record<number, SafeUrl> = {};
  editarPerfil = false;

  loadingQuizzes = false;
  loadingMyQuizzes = false;

  public navbarVisivel: boolean = false;
  public telaGrande: boolean = false;

  constructor(
    private quizService: QuizService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private rankService: RankService,
  ) {}

  ngOnInit(): void {
    this.telaGrande = window.innerWidth >= 992;
    this.getQuizzes();
    this.getMyQuizzes();
    this.fetchRankData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.telaGrande = window.innerWidth >= 992;
    if (this.telaGrande) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  onChangeTag(tagId: number) {
    this.getQuizzes(tagId);
    this.getMyQuizzes(tagId);
  }

  getQuizzes(tagId?: number) {
    this.loadingQuizzes = true;
    this.quizService.getQuizzes({ tagId }).subscribe({
      next: (res: IQuiz[]) => {
        this.loadingQuizzes = false;
        this.quizzes = res;
      },
      error: (res) => {
        this.loadingQuizzes = false;
      },
    });
  }

  getMyQuizzes(tagId?: number) {
    this.loadingMyQuizzes = true;
    this.quizService.getQuizzes({ tagId, inProgres: 'inProgres' }).subscribe({
      next: (res: IQuiz[]) => {
        this.loadingMyQuizzes = false;
        this.myQuizzes = res;
      },
      error: (res) => {
        this.loadingMyQuizzes = false;
      },
    });
  }

  ativarEdicao() {
    this.editarPerfil = !this.editarPerfil;
  }

  fetchRankData(): void {
    this.rankService.getRank({ perPage: 5 }).subscribe({
      next: async (data) => {
        this.rankList = data;
      },
      error: (error) => {
        console.error('Erro ao buscar o ranking:', error);
      },
    });
  }
}

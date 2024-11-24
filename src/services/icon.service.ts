import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from './user.service';
import { IRank } from '../interfaces/IRank';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  async getIconsList(users: IRank[], userIcons: Record<number, SafeUrl>) {
    const getIcon = (userId: number) => {
      return new Promise<SafeUrl>((resolve, error) => {
        this.userService.getIcon(userId).subscribe({
          next: (blob) => {
            if (!blob) {
              error(); // Rejeita a Promise se o blob for inválido
              return;
            }
            const url = URL.createObjectURL(blob);
            resolve(this.sanitizer.bypassSecurityTrustUrl(url));
          },
          error,
        });
      });
    };
    users.map(async (user) => {
      if (!user.userId) return;
      try {
        const userIcon = await getIcon(user.userId);
        userIcons[user.userId] = userIcon;
      } catch {}
    });
  }
}

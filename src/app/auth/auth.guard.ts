import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  if (isPlatformBrowser(inject(PLATFORM_ID)) && localStorage.getItem('token')) {
    try {
      const res = await fetch('http://localhost:5000/quiz/', {
        method: 'GET', // Método HTTP (GET, POST, PUT, DELETE, etc.)
        headers: {
          'Content-Type': 'application/json', // Define o tipo do conteúdo
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o campo de autorização
        }
      })
      console.log(res)
      if (res.status != 200) {
        router.navigateByUrl('login')
        return false;
      }
      return true;
    } catch (err) {
      router.navigateByUrl('login')
      console.log(err);
      return false;
    }
  }
  else {
    router.navigateByUrl('login')
    return false;
  }
};

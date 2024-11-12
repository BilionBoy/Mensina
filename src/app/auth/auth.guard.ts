import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const publicRoutes: string[] = ['login', 'cadastro'];

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  if (!isPlatformBrowser(inject(PLATFORM_ID))) return false;

  const token = localStorage.getItem('token');
  const path = route.url[0]?.path || '';
  const isPublicRoute: boolean = publicRoutes.some((publicRoute) =>
    path.includes(publicRoute)
  );

  // If the user is authenticated and tries to access a public route, redirect to '/'
  if (token && isPublicRoute) {
    router.navigateByUrl('/');
    return false;
  }

  // If the user is not authenticated and tries to access a protected route, redirect to '/login'
  if (!token && !isPublicRoute) {
    router.navigateByUrl('login');
    return false;
  }

  // If the user is authenticated, validate the token
  if (token) {
    try {
      const res = await fetch('http://localhost:5000/validate_token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Token is valid
        return true;
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        if (!isPublicRoute) {
          router.navigateByUrl('login');
          return false;
        }
        return true; // Allow access to public routes
      }
    } catch (err) {
      // Error validating token
      localStorage.removeItem('token');
      if (!isPublicRoute) {
        router.navigateByUrl('login');
        return false;
      }
      return true; // Allow access to public routes
    }
  }

  // Allow access to public routes if not authenticated
  return true;
};

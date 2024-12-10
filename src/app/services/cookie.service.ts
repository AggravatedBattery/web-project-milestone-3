import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_PREFERENCES_KEY = 'user_preferences';
  private readonly THEME_KEY = 'theme';
  private readonly LAST_VISIT_KEY = 'last_visit';

  constructor(private cookieService: NgxCookieService) {}

  setAuthToken(token: string, expirationDays: number = 7): void {
    this.cookieService.set(this.TOKEN_KEY, token, {
      expires: new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'Strict'
    });
  }

  getAuthToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  removeAuthToken(): void {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  setUserPreferences(preferences: any): void {
    this.cookieService.set(this.USER_PREFERENCES_KEY, JSON.stringify(preferences), {
      expires: 365,
      secure: true,
      sameSite: 'Strict'
    });
  }

  getUserPreferences(): any {
    const prefs = this.cookieService.get(this.USER_PREFERENCES_KEY);
    return prefs ? JSON.parse(prefs) : null;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.cookieService.set(this.THEME_KEY, theme, {
      expires: 365,
      secure: true,
      sameSite: 'Strict'
    });
  }

  getTheme(): string {
    return this.cookieService.get(this.THEME_KEY) || 'light';
  }

  updateLastVisit(): void {
    this.cookieService.set(this.LAST_VISIT_KEY, new Date().toISOString(), {
      expires: 365,
      secure: true,
      sameSite: 'Strict'
    });
  }

  getLastVisit(): Date | null {
    const lastVisit = this.cookieService.get(this.LAST_VISIT_KEY);
    return lastVisit ? new Date(lastVisit) : null;
  }

  clearAllCookies(): void {
    this.cookieService.deleteAll();
  }

  hasCookie(key: string): boolean {
    return this.cookieService.check(key);
  }
} 
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Colors from '../utils/colors';
import { Color } from '@BCTheme/types/models/Color/Color.model';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme$: BehaviorSubject<Color> = new BehaviorSubject<Color>(
    this.getColorThemeDefault()
  );

  constructor(@Inject('Window') private _window: Window) {
     this._setThemeBody(this.getColorThemeDefault().theme);
    this._setColorMeta(this.getColorThemeDefault().color);
  }

  public get theme(): Color {
    return this._theme$.getValue();
  }

  public set theme(theme) {
    this._theme$.next(theme);
     this._setThemeBody(theme.theme);
    this._setColorMeta(theme.color);
  }

  public onTheme(): Observable<Color> {
    return this._theme$.asObservable();
  }

  /**
   * Retorna todos los colores disponibles de la APP
   */
  getColorsAvailable(): Color[] {
    return Colors as Color[];
  }

  public getColorThemeDefault(): Color {
    return this.getColorsAvailable().find((color) => {
      return color.theme === environment.themeDefault;
    });
  }

  private _setColorMeta(color: string) {
    const metaThemeColor = this._window.document.querySelector(
      'meta[name=theme-color]'
    );

    metaThemeColor.setAttribute('content', color);
  }

  private _setThemeBody(themeName: string) {
    // console.log(theme)
    const overlayContainerClasses = this._window.document.body.classList;
    const themeClassesToRemove = Array.from(
      overlayContainerClasses
    ).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      // overlayContainerClasses.remove(...themeClassesToRemove);
      this._window.document.body.classList.remove(...themeClassesToRemove);
    }
    // overlayContainerClasses.add(theme.theme);
    this._window.document.body.classList.add(themeName);

    // this.componentCssClass = theme.theme;
  }
}

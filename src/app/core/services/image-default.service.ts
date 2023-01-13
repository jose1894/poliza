import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDefaultService {
  public description: string = '';

  getImage(description: string): string {
    // Asigna el valor por defecto nada más iniciar
    let image: string = 'icono';
    // let image: string = 'assets/images/icono-interrogacion.jpg';
    // Solo entra a intentar obtener la imagen de la inicial si la descripción tiene al menos 1 carácter
    if (description?.length > 0) {
      let initial: string = description.substring(0, 1).toLowerCase();
      // Solo entra si la inicial es alguna letra del alfabeto occidental
      if (/^[a-zA-ZÑñáàâãäåÁéèêëÉíìîïÍóòôõöÓúùûüÚ]*$/.test(initial) === true) {
        // Solo entra si es alguna vocal acentuada de algún tipo
        if (/^([áàâãäåÁéèêëÉíìîïÍóòôõöÓúùûüÚ]+)$/.test(initial) === true) {
          switch (description.substring(0, 1)) {
            case 'á':
            case 'à':
            case 'â':
            case 'ã':
            case 'ä':
            case 'å':
            case 'Á':
              initial = 'a';
              break;
            case 'è':
            case 'é':
            case 'ê':
            case 'ë':
            case 'É':
              initial = 'e';
              break;
            case 'ì':
            case 'í':
            case 'î':
            case 'ï':
            case 'Í':
              initial = 'i';
              break;
            case 'ò':
            case 'ó':
            case 'ô':
            case 'õ':
            case 'ö':
            case 'Ó':
              initial = 'o';
              break;
            case 'ù':
            case 'ú':
            case 'û':
            case 'ü':
            case 'Ú':
              initial = 'u';
              break;
          }
        }
        // Si es la letra "ñ"
        if (initial === 'ñ') {
          initial = 'enie';
        }
        // Si es alguna letra del alfabeto occidental devuelve la ruta a la imagen correspondiente
        image =
          '/assets/images/brickcontrol-images/common/letters/' +
          initial +
          '.png';
      }
    }
    return image;
  }
}

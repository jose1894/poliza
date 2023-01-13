import { animation, style, animate } from '@angular/animations';

export const slideTransform = animation([
  style({
    transform: '{{ transform }}',
  }),
  animate('{{ time }}'),
]);

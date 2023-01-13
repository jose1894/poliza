import {
  trigger,
  transition,
  animate,
  style,
  AnimationTriggerMetadata,
  AnimationTransitionMetadata,
} from '@angular/animations';

/**
 * @name Show
 * 
 */
export function Show(nameAnimation: string = 'show'): AnimationTriggerMetadata {
  return trigger(nameAnimation, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(400, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({
        transform: 'translateY(-100%)',
        display: 'none !important',
      }),
    ]),
  ]);
}

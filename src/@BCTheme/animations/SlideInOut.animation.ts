import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export function SlideInOut(
  nameAnimation: string = 'slideInOut'
): AnimationTriggerMetadata {
  return trigger(nameAnimation, [
    state(
      'void',
      style({
        height: '0px',
        display: 'none',
      })
    ),
    state(
      '*',
      style({
        height: '*',
        display: 'block',
      })
    ),
    transition('* => void', animate('300ms ease-out')),
    transition('void => *', animate('300ms ease-in')),
  ]);
}

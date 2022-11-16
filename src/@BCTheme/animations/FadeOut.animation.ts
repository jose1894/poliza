import { AnimationTransitionMetadata, trigger, AnimationTriggerMetadata, transition, animate, style } from '@angular/animations'

export function FadeOut(nameAnimation: string = 'fadeOut'):AnimationTriggerMetadata{
    return trigger(nameAnimation, [
    
        //   // the "in" style determines the "resting" state of the element when it is visible.
        //   state('in', style({opacity: 1})),
    
        //   // fade in when created. this could also be written as transition('void => *')
        //   transition(':enter', [
        //     style({opacity: 0}),
        //     animate(600 )
        //   ]),
    
          // fade out when destroyed. this could also be written as transition('void => *')
        //   transition(':leave',
        //     animate(600, style({opacity: 0})))
        transition('void => *', [
            style({opacity: 0}),
            animate(1000, style({opacity: 1}))
          ]),
          transition('* => void', [
            animate(1000, style({opacity: 0}))
          ])
        ]);
}
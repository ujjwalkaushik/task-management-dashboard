import { trigger, transition, style, animate } from '@angular/animations';

export const modalAnimation = [
    trigger('modalAnimation', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(-30px)' }),
            animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
            ),
        ]),
        transition(':leave', [
            animate(
                '200ms ease-in',
                style({ opacity: 0, transform: 'translateY(-30px)' })
            ),
        ]),
    ]),
];

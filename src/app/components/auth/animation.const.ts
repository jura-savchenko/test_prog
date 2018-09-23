'use strict';

import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";
import { AnimationTriggerMetadata } from "@angular/animations/src/animation_metadata";

/**
 * Error message animation
 * @type {AnimationTriggerMetadata}
 */
export const errorMessageAnimation: AnimationTriggerMetadata =
    trigger(
        'error-message', [
            transition(':enter', [
                query(':self', stagger('100ms',
                    animate('150ms', keyframes([
                        style({opacity: 0, transform: 'translateY(-40px)', offset: 0}),
                        style({opacity: 0.25, transform: 'translateY(-25px)', offset: 0.25}),
                        style({opacity: 0.5, transform: 'translateY(-5px)', offset: 0.5}),
                        style({opacity: 0.75, transform: 'translateY(5px)', offset: 0.75}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1})
                    ]))))]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate('150ms', style({transform: 'translateY(-100%)', opacity: 0}))
            ])
        ]
    );

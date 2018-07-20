import { InjectionToken } from '@angular/core';
import { PagingComponent } from './paging.component';

export const ParameterValidator = new InjectionToken('ParameterValidator');

export function validateParameters(component: PagingComponent): ValidationResultInterface {
    let messages = [];

    if (component.itemsPerPage < 0) {
        messages.push(`Items per page can not be negative`);
    }

    if (component.total < 0) {
        messages.push('Total items can not be negative');
    }

    if (component.frameSize <= 0 ) {
        messages.push('Frame size can not be negative or 0');
    }

    if (component.page > component.pagesCount || component.page < 0) {
        messages.push(`Selected page ${ component.page } is invalid`);
    }

    return { valid: !_.some(messages), messages: messages };
}

export interface ValidationResultInterface {
    readonly valid: boolean;
    readonly messages: string[];
}
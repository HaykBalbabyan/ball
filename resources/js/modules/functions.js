import {element} from "../../../dynamic-js/Dynamic";

export const cssVariables = {};

export function cssVar(name,value){
    cssVariables[name] = value;

    let style = element('#css-variables')

    let css = Object.keys(cssVariables).length ? ':root{' : '';

    for (const _var in cssVariables){
        const val = cssVariables[_var];

        css += ' --' + _var + ':' + val + ';'

    }

    css += css.length ? '}' : '';

    if (!style && css){
         style = document.createElement('style');
         style.id = 'css-variables';
         document.head.append(style);
    }

    if (style) {
        style.textContent = css;
    }
}
import { interval, timer } from "rxjs";

const observer = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}

const hoyEn5 = new Date(); //Ahora
hoyEn5.setSeconds(hoyEn5.getSeconds()+5);

const interval$ = interval(1000);
const timer$ = timer(hoyEn5);

console.log('Inicio');
//interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('Fin');


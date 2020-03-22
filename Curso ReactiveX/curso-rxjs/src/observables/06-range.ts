import { range, asyncScheduler } from 'rxjs';

const scr$ = range(-5,10, asyncScheduler); //Se transforma en asyncrona

console.log('Inicio');
scr$.subscribe( console.log );
console.log('fin');
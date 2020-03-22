import { of } from 'rxjs';


const obs$ = of<any>([1,2], {a:1, b:2}, true, Promise.resolve(true));


console.log('Inicio del Obs$'); //Se demuestra que es sincrono
obs$.subscribe(
    next => console.log('next: ', next),
    null,
    () => console.log('Terminamos la secuencia')
);
console.log('Fin del Obs$');
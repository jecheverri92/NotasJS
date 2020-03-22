import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}
//const obs$ = Observable.create();
// Se crea el observable.
const obs$ = new Observable<string>( subs => {

    subs.next("Hola");
    subs.next("Mundo");
    subs.next("Hola");
    subs.next("Mundo");

    //Forzar un error
    //const a = undefined;
    //a.nombre = 'Fernando';

    subs.complete(); //Se completa el observable ninguna emision despues sera notificada a los subscriptores.
    subs.next("Hola");
    subs.next("Mundo");

});

obs$.subscribe(observer);

//El observable debe tener almenos un subscriptor. Se crea el suscribe
/* obs$.subscribe( 
    valor => console.log('next: ', valor),
    error =>console.warn('error: ', error),
    () => console.info('Completado')
    ); */




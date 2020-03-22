import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}

const intervalo$ = new Observable<number>( subs => {

    const intervalID = setInterval(
        ()=> subs.next(Math.random()),1000
        );

    return () =>{
        clearInterval(intervalID);
        console.log("Intervalo destruido");
    }
})

const subject$ = new Subject()
const subscription = intervalo$.subscribe(subject$);

//const subs1 = intervalo$.subscribe(rnd => console.log('subs1: ', rnd));
//const subs2 = intervalo$.subscribe(rnd => console.log('subs2: ', rnd));

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() =>{
    subject$.next(10);
    subject$.complete();
    //subscription.unsubscribe();

}, 3500); 
import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}


const intervalo$ = new Observable<number>(  subsciber => {

    let cont = 0;
    const interval = setInterval(()=>{
        cont++;
        console.log(cont);
        subsciber.next(cont);
    }, 1000);


    setTimeout(() =>{
        subsciber.complete();
    },2500);

    return () =>{
        clearInterval(interval);
        console.log('Intervalo Destruido')
    }

})

const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2)
    .add(subs3);
    
setTimeout(() => {
    subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();
    console.log("Completado timeout");
},3000);
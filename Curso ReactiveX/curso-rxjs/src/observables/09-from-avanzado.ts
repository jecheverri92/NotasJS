import { of, from } from 'rxjs';


const observer = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}

const miGenerador = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
}

const miIterable = miGenerador();

from(miIterable).subscribe(observer);


//const source$ = from([1,2,3,4,5]);

const source$ = from ( fetch('https://api.github.com/users/klerith'));

// source$.subscribe( async (resp) => {
//     console.log(resp);
//     const dataResp = await resp.json();
//     console.log(dataResp);
// });

//source$.subscribe(observer);
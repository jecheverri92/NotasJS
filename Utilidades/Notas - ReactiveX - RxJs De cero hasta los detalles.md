# Notas - ReactiveX - RxJs: De cero hasta los detalles.

-Se usan extenciones reactivas porque queremos tener informacion en tiempo real.

### Cuando usar Rx?

- Eventos en la interface de usuario.
- Cuando es necesario notificar sobre cambios en un objeto(s).
- Comunicaciones por sockets.
- Cuando necestitamos trabajar con flujos de informacion (Streams).

### Observables.

- Son la fuente de informacion
- Pueden emitir multiples valores, solo uno o ninguno.
- Pueden emitir errores.
- Pueden ser infinitos, finitos (completarse)
- Pueden ser síncronos o asíncronos.

### Subscribers.

- Se subscriben a un observable, es decir, están pendiente de lo que realiza el observable.
- Consumen / observan la data del observable.
- Pueden recibir los errores y eventos del observable.
- Desconocen todo lo que se encuentra detrás del observable.

### Operators.

- Usados para transformar los Observables (map, group, scan...)

- Usados para filtrar observables (filter distinct, skip, debounce...)

- Usados para combinar observables

- Usados para crear nuevos observables.

## Que es ReactiveX?

Es una api para programación asíncrona usando observables. Proclaman ser el patron observer implementado de manera correcta.

### Patrón observer.

Es un patrón de diseño de software que define una dependencia del tipo uno a muchos entre objetos, de manera que cuando uno de los objetos cambia su estado, notifica este cambio a todos los dependientes. **Notifica cuando suceden cambios**

### Patrón Iterador.

En POO, el patrón iterador define una interfaz que declara los metodos necesarios para acceder secuencialmente a un grupo de objetos de una colección. **Poder ejecutar operaciones secuenciales**

### Programación Funcional.

Es básicamente, crear un conjunto de funciones que tengan un objetivo especifico. Es decir, si tengo una función que reciba "A", y retorna "A+1", siempre que yo llame esa función, retornara "A+1" Sin efectos secundarios, sin mutar la data. **Tener funciones con tareas especificas que reciban argumentos y no muten la información**.

### Como leer los diagramas de canicas?

![LeerDiagramaCanicas](C:\Users\Netw\Desktop\JavaScript\NotasJS\LeerDiagramaCanicas.PNG)



### Primer Observable.

````typescript
import { Observable } from 'rxjs';

//const obs$ = Observable.create();
// Se crea el observable.
const obs$ = new Observable<string>( subs => {

    subs.next("Hola");
    subs.next("Mundo");
    subs.next("Hola");
    subs.next("Mundo");

    subs.complete(); //Se completa el observable ninguna emision despues sera notificada a los subscriptores.

    subs.next("Hola");
    subs.next("Mundo");

});

//El observable debe tener almenos un subscriptor. Se crea el suscribe
obs$.subscribe( console.log )


````



Al suscribe se le pueden pasar 3 argumentos opcionales que son callbacks.

````javascript
obs$.subscribe( 
    valor => console.log('next: ', valor),
    error =>console.warn('error: ', error),
    () => console.info('Completado')
    );

````

Se puede realizar de otra forma usando la interface Observer para crear un objeto que se le puede pasar como argumento  a la función subscribe del observable para que el código quede mas ordenado:

````javascript
const observer: Observer<any> = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}

obs$.subscribe(observer);
````

### Subscription y Unsubscribe.

````javascript
import { Observable, Observer } from 'rxjs';

const intervalo$ = new Observable<number>(  subsciber => {

    let cont = 0;
    const interval = setInterval(()=>{
        cont++;
        console.log(cont);
        subsciber.next(cont);
    }, 1000);

    return () =>{
        clearInterval(interval);
        console.log('Intervalo Destruido')
    }

})

const subs1 = intervalo$.subscribe();
const subs2 = intervalo$.subscribe();
const subs3 = intervalo$.subscribe();

setTimeout(() => {
    subs1.unsubscribe();
    subs2.unsubscribe();
    subs3.unsubscribe();
    console.log("Completado timeout");
},3000);
````

**Notas:**

- Para cada subscribe se genera una instancia del observable
- Al ejecutar el unsuscribe() el obserbable ejecuta el return, de esta manera se limpio el interval para evitar desborde de memoria.
- Ya estan implementados en Rx metodos para realizar limpieza de intervalos y muchas mas cosas, esto fue a modo de ejemplo.

### Terminar Observables en cadena.

````javascript
const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2)
    .add(subs3);
    
setTimeout(() => {
    subs1.unsubscribe();
    console.log("Completado timeout");
},3000);
````

**Nota:** Se ejecuto el unsuscribe de todos, pero solo se ejecuto el complete del primero.



### Subject

Es un tipo especial de observable

- Casteo Multiple (Muchas suscripciones van a estar sujetas al mismo observable y sirve para distribuir la misma informacion).

- Tambien es un observer.

- Next, error y complete.

  ````javascript
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
  
      return () =>clearInterval(intervalID)
  })
  
  const subject$ = new Subject()
  intervalo$.subscribe(subject$); // como un Subject es un observer se puede pasar como parametro al subscribirse a un observable.
  
  const subs1 = subject$.subscribe(rnd => console.log('subs1: ', rnd));//Retorna un numero raondom
  const subs2 = subject$.subscribe(rnd => console.log('subs2: ', rnd)); //Retorna el mismo rnd
  ````

  

Es la misma instacia del observable para todos los subscribers.

Cuando la data es producida por el observable en si mismo, es considerador un "Cold Observable". Pero cuando la data es producida FUERA del observable es llamado "Hot Observable".

Un subject nos permite convertir un "Cold Observable" en un "Hot Observable"

## Funciones para crear Observables.

### of.

Función que permite crear observables en base a un listado de elementos, emite los valores en secuencia uno x uno de manera síncrona, cuando emite el ultimo valor se completa el observable.

````javascript
import { of } from 'rxjs';

const obs$ = of<any>([1,2], {a:1, b:2}, true, Promise.resolve(true));

console.log('Inicio del Obs$'); //Se demuestra que es sincrono
obs$.subscribe(
    next => console.log('next: ', next),
    null,
    () => console.log('Terminamos la secuencia')
);
console.log('Fin del Obs$');
````



### fromEvent.

Permite crear observables en base a un eventTarget, es de las funciones mas usadas para crear observables.

````javascript
import { fromEvent } from 'rxjs';
/** 
 * Eventos del DOM
 */

 const src1$ = fromEvent<MouseEvent>(document, 'click');
 const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');
 const observer = {
     next: val => console.log('next', val )
 };

 src1$.subscribe(({x,y}) => { //Destructuracion EMAScript6
     console.log(x,y);
 });

 src2$.subscribe(evento => {
     console.log( evento ); // truco Se imprime el evento para saber que tipo de evento disparara el observable
     });
````



### range.

Crea un observable que emite una secuencia de numeros en base a un rango, por defecto son sincronos, pero se puede cambiar su comportamiento.

````javascript
import { range, asyncScheduler } from 'rxjs';

const scr$ = range(-5,10, asyncScheduler); //Se transforma en asyncrona

console.log('Inicio');
scr$.subscribe( console.log );
console.log('fin');
````



### interval.

Al suscribirse al observable obtendremos una secuenca de valores que comienza en cero hasta el infinito. como parametro se pasara el tiempo como parametros en ms. 

- El interval es asyncrno por naturaleza.
- Aunque se cancele la subscripcion el interval seguira corriendo.

````javascript
import { interval } from "rxjs";

const observer = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}

const interval$ = interval(1000);

console.log('Inicio');
interval$.subscribe(observer);
console.log('Fin');

````

### timer

Crea un observable que empieza a emitir despues del tiempo pasado como parametro y luego de ese valor empieza a emitir los valores siguentes en un periodo de tiempo indicado.

````javascript
import { timer } from "rxjs";

const observer = {
    next: value => console.log('Siguiente [next]: ', value),
    error: error => console.warn('error: [obs]', error),
    complete: () => console.info('Complete: [obs]')
}
const timer$ = timer(2000);
console.log('Inicio');
timer$.subscribe(observer);
console.log('Fin');

````

### asyncScheduler.

No crea un observable, crea una suscripción, nos permite crear setIntervals y setTimeout pero utilizando una subscripcion.

````javascript
import { asyncScheduler } from 'rxjs';

//setTimeout(()=> {}, 3000);
//setInterval(()=> {}, 3000);

const saludar = () => console.log("Hola Mundo");
const saludar2 = nombre => console.log(`Hola ${nombre}`);

//Esto es lo mismo que un setTimeout() pasandole un parametro
//asyncScheduler.schedule( saludar2, 2000,'Julian' ); // Solo admite un parametro, si necesitamos mas parametros se envia como un objeto

const subs = asyncScheduler.schedule( function(state){
    console.log('state', state);
    this.schedule(state + 1, 1000);
}, 3000, 0) //No puede ser una funcion de flecha

// setTimeout(()=>{
//     subs.unsubscribe(); // Se destruye el cicli infinito
// }, 6000);

asyncScheduler.schedule(()=>
    subs.unsubscribe(), 6000);
````



## Operadores Basicos.

Es una función que se pega a un observable y sirve para manipular el flujo de información.

### map


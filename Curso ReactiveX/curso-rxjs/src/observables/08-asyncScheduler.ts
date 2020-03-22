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
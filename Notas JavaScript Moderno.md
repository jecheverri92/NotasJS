# Notas JavaScript Moderno.

### Function Expression

Las funciones son onjetos en JS, por eso se pueden almacenar en una variable. 

````javascript
const square = function (num){
return num*num
}

square(7);  //49
````

Podemos guardarlas en un array, en un objeto, luego llamarlas dinamicamente en un loop.

### Higher order functions.

Son funciones que operan sobre o con otras funciones, Pueden:

- Aceptar otras funcionescomo argumentos.
- Retornar una funcion. 

Funciones que retornan funciones, son como una fabrica de nuevas funciones 

````javascript
funtion multiplyBy(num){
return function(x){
retunr x * num;
}
}

const triple = multiplyBy(3);
const double = multiplyBy(2);
const halve = multiplyBy(0.5);

triple(4) //12
````

````javascript
function makeBetweenFunc(x,y){
return function(num){
	return num >= x && num <= y;
}

makeBetweenFunc(0,18)(12)//true

````

### Call back Functions.

Son funciones pasadas a otra funcion como argumento , la cual luego sera invocada dentro de la funcion a la cual fue pasada como argumento.

````javascript
funtion grumpus(){
	alert("GaHH Go AWAY")
}

setTimeout(grumpus,5000);
````

### Hoisting.

Cuando JS interpreta el codigo  hostea las declaraciones , las declaraciones de variables con let no sos hosteadas, no podemos acceder a ellas antes de su delcaracion(obtendremos error)

Las declaraciondes de funciones tambien son hosteadas.

### Arrow Functions.

Son una alternativa compacta en syntaxis a las funciones regulares.

````javascript
const square = (x) =>{
	retunr x * x;
}
````

Funcionan igual que cualquier otra funcion solo que son mas compactas (Ecxepto por le operador this)

### Arrow Implicit Return.

````javascript
const square = n=> n*n;
````

retonra sin la necesidad de usar la palabra reservada return, valido para una sola expresion. (puede retornar otra funcion).

````javascript
const nums = [1,2,3,4,5,6,7,8];
const doubles1 = nums.map(n=>n*2);//[2,4,6,8,10,12,14,16]
````

### this.

Piensa en this como una referencia del current excecution scope. this retornara un objeto.

````javascript
function sayHi(){
	console.log("HI");
	console.log(this); //retrnara el objeto Window
}

````

sayHi() es un metodo del objeto window. Window es el objeto global de nuestro navegador. El objeto que retorna depende de como es llamado.

This en una funcion va a referirse al objeto window 
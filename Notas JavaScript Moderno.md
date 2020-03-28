

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

Las declaraciondes de funciones tambien son hosteadas, pero las funciones como expresion no son hosteadas.

**Hoisting** is a **JavaScript** mechanism where variables and **function** declarations are moved to the top of their scope before code execution. Inevitably, this means that no matter where **functions** and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local

````javascript
sayHello()

function sayHello () {
  function hello () {
    console.log('Hello!')
  }
  
  hello() //Hey porque la delcaracion de la funcion funcion hello fue sobreescrita (creo)
  
  function hello () {
    console.log('Hey!')
  }
}
````

````javascript
sayHello()

function sayHello () {
  function hello () {
    console.log('Hello!')
  }
  
  hello() // Hello, porque la funcion dentro de sayhello fue hosteada y la otra fue hosteada como variable porque es una funcion como expresion;
  
  var hello = function () {
    console.log('Hey!')
  }
}
````

````javascript
sayHello() // Error porque no existe una funcion llamada sayHello; es decir se hosteo una variable sayHello con valor de undefined

var sayHello = function () {
  function hello () {
    console.log('Hello!')
  }
  
  hello()
  
  function hello () {
    console.log('Hey!')
  }
}
````

### Hoisting and Scope.

````javascript

// Global scope

var greet = 'Hello!' // Scoped to the global scope

function sayHi () {
  // Local scope
  
  console.log('2: ', greet) // undefined... Why? Isn't greet a global variable? 
  
  var greet = 'Ciao!' // Modified greet to 'Ciao!'
  console.log('3: ', greet) // Ciao!... Yeah make sense.
}

console.log('1: ', greet) // Hello!... Fair enough, it's a global variable right?
sayHi()
console.log('4: ', greet)  // Hello!... Wait, didn't we just change it to Ciao?
````



The key is **hoisting** — variables and functions are hoisted *within the scope they belong to*.

Let’s walkthrough the quiz code step-by-step, from the JavaScript engine’s point of view, combining the knowledge of hosting and scope.

During the memory creation phase: 

- line 1: `var greet` gets hoisted to the *global* scope
- line 3: `function sayHi () {...}` gets hoisted to the *global* scope
- line 5: `var greet` within `sayHi` gets hoisted to the *local* scope.

During the execution phase:

- line 1: Global `greet` gets assigned to `Hello!`
- line 9: The value of global `greet` is `Hello!`
- line 10: `sayHi` gets called, the JavaScript engine enters the function
- line 4: The JavaScript engine reaches `console.log`, looks for a variable `greet`, and finds it within the *current local scope*. However, the local `greet` hasn’t been assign to anything yet, hence the value is `undefined`.
- line 5: Local `greet` gets assigned to `Ciao!`
- line 6: The value of local `greet` is `Ciao!`. The JavaScript engine exits the `sayHi` function and comes back up to the global scope.
- line 11: The engine has access only to the *global* `greet`, which is `Hello!`

### Execution Context ≠ Scope

1. The **global execution context** is created *before* any code is executed.
2. Whenever a function is *executed* (or called/invoked, these are all synonyms), a **new execution context** gets created.
3. Every execution context provides `this` keyword, which points to an **object** to which the current code that’s being executed belongs.

````javascript
var globalThis = this

function myFunc () {  
  console.log('globalThis: ', globalThis)
  console.log('this inside: ', this)
  console.log(globalThis === this)
}

myFunc()

// globalThis: Window {...}
// this inside: Window {...}
// true
````

**In JavaScript, execution context is an abstract concept that holds *information about the environment* within which the current code is being executed**.

### Scope Chain.

En Javascript importa el lexical enviroment (donde estan fisicamente las definiciones). Cuando se crea un contexto de ejecucion este incluye una referenica al Outer reference, es decir al contexto de ejecucion donde fue lexicamente declarado. Cuando se quiere obtener una variable en una funcion y no se encuentra en su contexto de ejecucion javascript mirara por las variables en la outher reference en alguna parte debajo de el contexto de ejecucion actual en el stack de ejecucion.

¿A donde apunta outer reference?. Depende de donde la funcion fue delcarada sintacticamente.

````javascript
function b() {
	console.log(myVar);
}
function a() {
    var myVar = 2;
	b();
}

var myVar = 1;
a(); // 1
````

![ScopeChain](C:\Users\Netw\Desktop\JavaScript\NotasJS\ScopeChain.PNG)

````javascript
function b() {
	console.log(myVar);
}
function a() {
    var myVar = 2;
	b();
}

var myVar = 1;
a(); // 2
````

![ScopeChain2](C:\Users\Netw\Desktop\JavaScript\NotasJS\ScopeChain2.PNG)





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

Las funciones felcha no tienen su propio this

### Adding Methods to Objects.

Podemos agregar funciones como propiedades de objetos y llamar esos metodos. Se usa para agrupar funciones, hacer un objeto que sea una especie de unidad cohesiva.

````javascript
const math ={
	numbers: [1,2,3,4,5],
	add: function(x,y){
	return x+y;
	},
	multiply: function (x,y){
	return x*y;
	}

math.add(2,3) // 5
math.multiply(8,3) //24
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

So now you can figure out the value of `this` by following these simple rules:

- By default, `this` refers to a global object, which is global in the case of NodeJS and a `window` object in the case of a browser
- When a method is called as a property of an object, then `this` refers to the parent object
- When a function is called with the `new` operator, then `this` refers to the newly created instance
- When a function is called using the `call` and `apply` methods, then `this` refers to the value passed as the first argument of the `call` or `apply` method.

### Promises.

Las promesas nos permiten escribir codigo asyncrono mucho mas facil de leer y entender.

Son un objero de JS que representala completacion o falla de algun proceso, es una forma de prometer un valor que no tenemos en el momento.

Se atan dos callbacks a una promesa; una promesa es un bojeto y tiene un estado que puede ser, resolve o reject.

````javascript
const willGetYouADog = new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random();
    	if(rand<0.5) {
        	resolve();
    	}else {
        	reject();
   	 }  
    },5000)    
})

willGetYouADog.then(()=>{
    console.log('Yay WE HOT A DOG!!!')
})
willGetYouADog.cath(()=>{
    console.log(':< NO DOG')
})
````

En este ejemplo se muestra el manejo de las callbacks con valor.

````javascript
//This is a FAKE Http Request Function
//It takes 1 second to resolve or reject the promise, depending on the url that is passed in
const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/users' : [
					{ id: 1, username: 'Bilbo' },
					{ id: 5, username: 'Esmerelda' }
				],
				'/about' : 'This is the about page!'
			};
			const data = pages[url];
			if (data) {
				resolve({ status: 200, data }); //resolve with a value!
			}
			else {
				reject({ status: 404 }); //reject with a value!
			}
		}, 1000);
	});
};

fakeRequest('/users')
	.then((res) => {
		console.log('Status Code', res.status);
		console.log('Data', res.data);
		console.log('REQUEST WORKED!');
	})
	.catch((res) => {
		console.log(res.status);
		console.log('REQUEST FAILED');
	});

fakeRequest('/dogs')
	.then((res) => {
		console.log('Status Code', res.status);
		console.log('Data', res.data);
		console.log('REQUEST WORKED!');
	})
	.catch((res) => {
		console.log(res.status);
		console.log('REQUEST FAILED');
	});

````

### Promise Chaining.

````javascript
//This is a FAKE Http Request Function
//It takes 1 second to resolve or reject the promise, depending on the url that is passed in
const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/users'        : [
					{ id: 1, username: 'Bilbo' },
					{ id: 5, username: 'Esmerelda' }
				],
				'/users/1'      : {
					id        : 1,
					username  : 'Bilbo',
					upvotes   : 360,
					city      : 'Lisbon',
					topPostId : 454321
				},
				'/users/5'      : {
					id       : 5,
					username : 'Esmerelda',
					upvotes  : 571,
					city     : 'Honolulu'
				},
				'/posts/454321' : {
					id    : 454321,
					title :
						'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
				},
				'/about'        : 'This is the about page!'
			};
			const data = pages[url];
			if (data) {
				resolve({ status: 200, data }); //resolve with a value!
			}
			else {
				reject({ status: 404 }); //reject with a value!
			}
		}, 1000);
	});
};

fakeRequest('/users')
	.then((res) => {
		console.log(res);
		const id = res.data[0].id;
		return fakeRequest(`/users/${id}`);
	})
	.then((res) => {
		console.log(res);
		const postId = res.data.topPostId;
		return fakeRequest(`/posts/${postId}`);
	})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log('OH NO!', err);
	});

// ************************************************
// ATTEMPT 2 (deliberate error to illustrate CATCH)
// ************************************************
// fakeRequest('/users')
// 	.then((res) => {
// 		console.log(res);
// 		const id = res.data[0].id;
// 		return fakeRequest(`/useALSKDJrs/${id}`); //INVALID URL, CATCH WILL RUN!
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		const postId = res.data.topPostId;
// 		return fakeRequest(`/posts/${postId}`);
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('OH NO!', err);
// 	});

````

### Async - Await.

Palabras reservadas; permiten parecer sincrono un codigo asincrono.

**async** Usamos async en frente de una delcaracion de funcion o expresion de funcion, para desigar una funcion como asyncrona. Cuando ponemos esta palabra clave el comportamiento de la funicon cambia y ahora va a retornar una promesa.

Cuando marcamos una funcon con async, el return sera nuestra respuesta y para nuestro reject debemos lanzar una excepcion.

**await**

Ponemos la palabra reservada await dentro de una funcion marcada como async y esto pausara la ejecucion de la funcion mientras que se resuelve la promesa

````javascript
async function getPlanets() {
	const res = await axios.get('https://swapi.co/api/planets/');
	console.log(res.data); //only runs once the previous line is complete (the axios promise is resolved)
}
````

De esta manera se pueden manejar los errores:

````javascript
// ONE OPTION FOR ERROR HANDLING...
async function getPlanets() {
	//Invalid URL...
	const res = await axios.get('https://swapi.co/api/planeklsajdalksts/');
	console.log(res.data);
}

getPlanets().catch((err) => {
	console.log('IN CATCH!!!');
	console.log(err);
});

// ANOTHER OPTION...
async function getPlanets() {
	try {
		const res = await axios.get('https://swapi.co/api/planeklsajdalksts/');
		console.log(res.data);
	} catch (e) {
		console.log('IN CATCH!', e);
	}
}
getPlanets();

````


# Notas Algoritmos Javascript

##  Big O Notation  (Complegidad Algoritmica).

Es una forma generalizada de comprarar codigo y su rendimiento vs otras piezas de codigo, para determinar cual es "Mejor". podremos tener una representacion numerica del rendimiento de nuestro codigo.

**¿Que quiere decir Mejor?**

* Mas rapido?

* Menor uso de memoria?

* Mas legible?

Usualmente las dos primeras son las mas importantes

#### Timing Our Code

Funcion que calcula la suma de los numeros desde 1 hasta *n*.



1. ````javascript
    function addUpTo(n){
   let total = 0;
   for(let i = 1; i<= n; i++){
       total += i;
   }
   return total;
    }
var t1 = performance.now();
addUpTo(10000000000);
var t2 = performance.now();
console.log(`Time Elapsed ${(t2 - t1) / 1000} seconds.`) 
// Time Elapsed 15.320919999969192 seconds.
   ````

2. ````javascript
   function addUpTo(n){
       return n * (n + 1) / 2;
   }
   
   var t1 = performance.now();
   addUpTo(10000000000);
   var t2 = performance.now();
   console.log(`Time Elapsed ${(t2 - t1) / 1000} seconds.`)
   // Time Elapsed 0.00005500006955116987 seconds.
   ````

Hasta este momento pareceria una mejor solucion el segundo algoritmo, en terminos de velodidad.

#### The problem with Time.

* Diferent machines will record different times.
* the same machine will record different times.
* For fast algorithms, speed measurements may not be precise enought?

#### Counting Operations

En vez de contar tiempo ¿Que pasaria si se contaran operaciones simples ejecutadas por el ordenador para obtener el performance?



![2](C:\Users\Netw\Desktop\JavaScript\NotasJS\2.PNG)*Primer Algoritmo*

![1](C:\Users\Netw\Desktop\JavaScript\NotasJS\1.PNG)*Segundo Algoritmo*

The number of operations grows roughly proportionally with *n*.

#### Simplify Big O Expressions.

* Constants Don't Matter.

  ![3](C:\Users\Netw\Desktop\JavaScript\NotasJS\3.PNG)

* Smaller Terms Don't Matter.

  ![4](C:\Users\Netw\Desktop\JavaScript\NotasJS\4.PNG)

##### Big O Shorthands

* Arithmetic operations are constant.

* Variable assignment is constant.
* Accessing elements in an array (by index) or object (by key) is constant.
* In a loop, the the complexity is the length of the loop times the complexity of whatever happens inside of the loop.

#### Space Complexity.

We can also use Big O notation to analyze space complexity; that means how much additional memory do we need to allocate in order to run our algorithm .

##### Space Complexity in JS.

* Most primitives (booleans, numbers, undefined, null) are constant space.
* Strings require O(n) space (where n is the string length).
* Reference types are generally O(n), where n is the length (for arrays) or the number of keys (for objects).

#### Examples.

1. ![5](C:\Users\Netw\Desktop\JavaScript\NotasJS\5.PNG)
2. ![6](C:\Users\Netw\Desktop\JavaScript\NotasJS\6.PNG)

#### The BIG O of Objects.

When you don't need any ordering objects are an excellent choice.

* Insertion - **O(1)**.
* Removal - **O(1)**.
* Searching - **O(N)**.
* Access - **O(1)**.

#####  Big O of Object Methods.

* Object.Keys - **O(N)**.

* Object.values - **O(N)**.

* Object.entries - **O(N)**. *(method returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs)*

* hasOwnProperty - **O(1)**. *(method returns a boolean indicating whether the object has the specified property as its own property)*

#### Big O of Arrays.
We use arrays When we need order and When we need fast access/insert and removal (sort of..).

* Insertion - It depends... *(si insertas al inicio del array es peor que si insertas al final del array)*
* Removal - It depends.. *(si eliminas al inicio del array es peor que si eliminas al final del array)*
* Searching - **O(N)**.
* Access - **O(1)**.

**Nota:** Si se hace una inserción o se elimina un elemento que no ocupe el ultimo index, se tendra que reIndexar el array.

##### Big O of Arrays Methods.

* push - **O(1)**.

* pop - **O(1)**. *(Remove the last element of an array)*

* shift - **O(N)**. *(Remove the first item of an array)*

* unshift - **O(N)**. *(Add new items to the beginning of an array)*

* concat - **O(N)**. 

* slice - **O(N)**. *(Select elements from an array)*

* splice - **O(N)**. *(Add items to the array)*

* sort - **O(N * Log N)**.

* forEach/map/filter/reduce/etc.. - **O(N)**.

### Problem Solving.

Write a function which takes in a string and returns counts of each character in the string.

#### Problem Solving Steps.

* Understand the Problem.
* Explore Concrete Examples.
* Break It Down.
* Solve/Simplify.
* Look Back and Refactor.

##### Explore Concrete Examples Steps.

* Start with Simple Examples.

* Progress to More Complex Examples.

  ````javascript
  charCount("Your PIN number is 1234!")
  /*{
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      b: 1,
      e: 1,
      i: 2,
      ...
      y: 1
  }
  ````

  

* Explore Examples with Empty inputs.

* Explore Examples with invalid inputs.

##### Break It Down.

Explicitty write out the steps you need to take.

````javascript
function charCount(str){
    //Make object to return at end
    // loop over string for each character
    	//if the char is a number/letter AND is a key in object, add one to count
    	//if the char is a number/letter AND not in object, add it to object and set value to 1
    	// if charecter is something else (sapce, period, etc..)don't do anything
    //return object
}
````

##### Solve/Simplifly.

* Find the core difficulty in what you're trying to do.

* Remporarlily ignore that difficulty.

* Write a simplified solution.

* Then incorporate that difficulty back in.

  ````javascript}
  function charCount(str){
      //Make object to return at end
      var result = {};
      // loop over string for each character
      for(car i = 0; i< str.lenght; i++){
        var char = str[i].toLowerCase();  
        //if the char is a number/letter AND is a key in object, add one to count
        if(result[char] > 0){
            result[char]++
        } 
          //if the char is a number/letter AND not in object, add it to object and set value to 1
          else{
            result[char] = 1
        }
      }
      	// if charecter is something else (sapce, period, etc..)don't do anything
      //return object
     
      return result;
  }
  ````



##### Look back and Refactor.

* Can you check the result?
* Can you derive the result differently?
* Can you understand it at a glance?
* Can you use the result or method for some other problem?
* Can you improve the performance of your solution?
* Can you think of other ways to refactor?
* How have other people solved this problem?

````javascript
function charCount(str){
    var result = {};
    for(var char of str){
      if(isAlphaNumeric(char)){
           char = char.toLowerCase();
          if(result[char] > 0){
              result[char] = ++result[char] || 1;
          } 
    }
}
    return result;
}

function isAlphaNumeric(char){
    var code = char.charCodeAt(0);
    if(!code > 47 && code < 58) && // numeric  (0-9)
       !code > 64 && code < 91) && // upper alpha (A-Z)
       !code > 96 && code < 123)){ // lower alpha (a-z)
          return false; 
       }
       return true;
}
````



### Problem solving Patterns.

#### Frecuency Counters.

Write a function called same, whiche accepts two arrays. Te function should return true if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same.

````javascript
same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)
````

##### A NAIVE (No the best solution for this case) Solution.

````javascript
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(let i = 0; i < arr1.length; i++){
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if(correctIndex === -1) {
            return false;
        }
        arr2.splice(correctIndex,1)
    }
    return true
}
````

##### Refactored.

````javascript
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
    }
    for(let key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    }
    return true
}
````
Con este patron se evita realizar for anidados; Se crean objetos que luego sera comparado de la manera mas conveniente para la resolucion del problema.



#### Multiple Pointers.

Create pointers or values that correspond to an index or position and move towards the beginning, end or middle based on a certain condition. You can use it on some sort of linear structure, like an array, string or a linked list, to search for a pair of values, or searching for something that meets a condition. You use two reference points in the linear structure, and you work toward the middle.

**Big O:** Time Complexity **O(n)**, Space Complexity **O(1)**



##### Example.

Write a function called **sumZero** which accepts a **sorted** array of integers. The function should find the **first** pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

````javascript
sumZero([-3,-2,-1,0,1,2,3]) // [-3,3] 
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined
````

##### Naive Solution.

````javascript
function sumZero(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}
````

**Big O:** Time Complexity **O(n^2)**, Space Complexity **O(1)**.

##### Refactored.

````javascript
function sumZero(arr){
    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        let sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        } else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}
````

**Time Complexity - O(N)**   --   **Space Complexity - O(1)**

#### Sliding Window.

##### How do you identify them?

So the first thing you want to be able to do is to identify a problem that uses a sliding window paradigm. Luckily, there are some common giveaways:

- The problem will involve a data structure that is ordered and iterable like an array or a string
- You are looking for some subrange in that array/string, like a longest, shortest or target value.
- There is an apparent naive or brute force solution that runs in O(N²), O(2^N) or some other large time complexity.

But the biggest giveaway is that the thing you are looking for is often some kind of **optimal**, like the **longest** sequence or **shortest** sequence of something that satisfies a given condition **exactly**.

##### Example.

Write a function called maxSubarraySum which accepts an array of integers and a number called **n**. The function should calculate the maximum sum of **n** consecutive elements in the array.

````javascript
maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null
````

##### Naive Solution.

````javascript
function maxSubarraySum(arr, num) {
  if ( num > arr.length){
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i ++){
    temp = 0;
    for (let j = 0; j < num; j++){
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
````

**Time Complexity - O(N^2)**

##### Refactored.

````javascript
function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
````

**Time Complexity - O(N)**

#### Divide and Conquer.

This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data. This pattern can tremendously **decrease time complexity**.

##### Example.

Given a **sorted** array of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1

````javascript
search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1
````

##### Naive Solution.

````javascript
function search(arr, val){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === val){
            return i;
        }
    }
    return -1;
}
````

**Time Complexity O(N)**

##### Refactored.

````javascript
function search(array, val) {
 
    let min = 0;
    let max = array.length - 1;
 
    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let currentElement = array[middle];
 
        if (array[middle] < val) {
            min = middle + 1;
        }
        else if (array[middle] > val) {
            max = middle - 1;
        }
        else {
            return middle;
        }
    }
 
    return -1;
}
````

**Time Complexity - Log(N) - Binary Search!**



 

  




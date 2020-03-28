# Funcion Debounce generica.

Función anti rebote usada para evitar que cuando el usuario active un evento varias veces voluntaria o involuntariamente  la función asociada a ese evento se ejecute muchas veces.

````javascript
const input = document.querySelector('input');

const fetchData = async (searchString) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params : {
            apikey : '1f3556f5',
            s: searchString
        }
    });
    console.log(response.data);
}

const debounce = (func, delay) => {
    let timeOutId;
    return function (...args) {
    if(timeOutId){
        clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() =>{
        func.apply(null,args);
    }, delay);
    }
}

const onInput = event => {
    fetchData(event.target.value);
}

input.addEventListener('input',debounce(onInput,1000));

````



# Frecuency counter para Validar Anagrama String

Funcion que valida si una palabra es anagrama, se utilizo el patron frecuency counter.

````javascript
function validarAnamgrama(first,second){
    if(first.length !== second.length){
        return false;
    }
    const lookup ={};
    for(let i = 0; i< first.length; i++){
        let letter = first[i];
        lookup[letter] ? lookup[letter]+=1 : lookup[letter] = 1;
    }
    for(let i = 0; i< second.length; i++){
        let letter = second[i];
        if(!(lookup[letter]){
            return false;
        } else {
            lookup[letter -= 1;]
        }
    }
    return true;
}
````


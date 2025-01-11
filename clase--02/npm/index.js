/** PRACTICAMOS CON NPM **/

export const suma = (...numeros) => {
    if(numeros.length === 0) return 0;
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acc, ele) => acc + ele, 0) ; 
}

export const resta = (...numeros) => {
    if (numeros.length === 0) return 0;
    if (!numeros.every(num => typeof num === "number")) return null;
    return numeros.reduce((acc, ele) => acc - ele);
}

export const multiplicacion = (...numeros) => {
    if (numeros.length === 0) return 1; // El valor neutro de la multiplicación es 1
    if (!numeros.every(num => typeof num === "number")) return null;
    return numeros.reduce((acc, ele) => acc * ele, 1);
}

export const division = (...numeros) => {
    if (numeros.length === 0) return 1; // El valor neutro de la división sería 1
    if (!numeros.every(num => typeof num === "number")) return null;
    if (numeros.includes(0)) return null; // Evita la división por 0
    return numeros.reduce((acc, ele) => acc / ele);
}


//NPM CI me permite instalar las dependencias pero leyendo el package-lock.json

//NPM AUDIT busca vulnerabilidades con respecto a las versiones de las dependencias que tenemos instaladas. 

//NPM AUDIT FIX --FORCE corrige esas vulnerabilidades
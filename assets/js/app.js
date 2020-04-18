
//variables
const listaTweets=document.getElementById('lista-tweets');


//Event Listener 

eventListeners();



function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click',borrarTweet);

    //Contenido en Local Storage cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);


}




//Funciones

//Añadir Tweet del formulario

function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del textarea con el ID
    const tweet = document.getElementById('tweet').value;
    //creamos boton para eliminar

    const botonBorrar=document.createElement('a');
    botonBorrar.classList='borrar-tweet';
    botonBorrar.innerText="X";

    //Crear elemento y añadirle el contenido al la lista
    const li=document.createElement('li');
    li.innerText=tweet;

    //Añade el boton
    li.appendChild(botonBorrar);

    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a local storage
    agregarTweetLocalStorage(tweet);
}



//Borrar tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    //el ID que se resive es en todo el elemento tweet" x eso discriminamos si es en la X
    if(e.target.className==='borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }  
}


//Mostrar elementos de Local Storage en la lista
function localStorageListo(){
    let tweets;

    tweets=obtenerTweetLocalStorage();

    tweets.forEach(function(tweet){

        //creamos boton para eliminar
        const botonBorrar=document.createElement('a');
        botonBorrar.classList='borrar-tweet';
        botonBorrar.innerText="X";

        //Crear elemento y añadirle el contenido al la lista
        const li=document.createElement('li');
        li.innerText=tweet;

        //Añade el boton
        li.appendChild(botonBorrar);

        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//Agregar tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets=obtenerTweetLocalStorage();
    //Añadir nuevo tweet al principio del array
    tweets.unshift(tweet);
    //Convertir de String a arreglo para Local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

    
}



//Esta funcion comprueba qi haya elementos en local Storage , retorna un arreglo
function obtenerTweetLocalStorage(){
    let tweets;
    //Revisamos los valores de local storage
    if(localStorage.getItem('tweets')===null){
        tweets=[];

    }else{
        tweets=JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


//Eliminar elemento del local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    // toma el texto de la nota  a borrar y le saca la X
    tweetBorrar=tweet.substring(0,tweet.length-1);

    tweets=obtenerTweetLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweetBorrar===tweet){
            tweets.splice(index, 1);

        }
    });

    localStorage.setItem('tweets',JSON.stringify(tweets));
    
}
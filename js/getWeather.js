var humidityEl = document.getElementById("humidite");
var windEl = document.getElementById("wind");
var sunsetEl = document.getElementById("sunset");
var tempEl = document.getElementById("temp");
var cityWeather = document.getElementById("city-weather");
var appBody = document.getElementById("app");
var geobtn = document.getElementById("localis");

document.getElementById("text").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    //alert(key);
    if (key == 13) {
        var inputValue = document.getElementById("text").value;
        getWeather(inputValue);
        removeErr();
        setPainting();
    }
}, false);

geobtn.addEventListener('touchstart',function(){
    init();
}, false);

function setText(temp,speed,humidite,context,hours,cityname){
	humidityEl.innerHTML = "Humitidé : "+humidite;
	windEl.innerHTML = "Vitesse : "+speed;
	sunsetEl.innerHTML = "Couché à "+hours;
	tempEl.innerHTML = temp+" °";
	cityWeather.innerHTML = cityname+" - "+context;
}

var Color = {
    color : this,
    inputColor : this,
    setForecastColor : function(temp){
        if(temp <= 5){
            color = '#bdf8ff';
            inputColor = '#b9e0e5';
        }
        else if(temp > 5 && temp <= 10){
            color = '#90f0ef';
            inputColor = '#87d6d5';
        }
        else if(temp > 10 && temp <= 17){
            color = '#d8e985';
            inputColor = '#bfd06f';
        }
        else if(temp > 17 && temp <= 25){
            color = '#ffcf5b';
            inputColor = '#ffbd1c';
        }
        else{
            color = '#f8b03d';
            inputColor = '#e29314';
        }

        return color;
    },
    setBackColor : function(){
        return inputColor;
    }

};

var attribute = {
    bigSrc : this,
    classToAdd : this
};

function setData(temperature,rapidity,humidite,context,hours,cityname,codeA){
    var temp = Math.floor((temperature - 32) * (5/9)); 
    var speed = Math.floor((rapidity * 1.609344));
    
    appBody.style.backgroundColor = Color.setForecastColor(temp);

    var inputX = document.getElementById('text');

    inputX.style.backgroundColor = Color.setBackColor();
    inputX.style.borderColor = Color.setBackColor();
    var mainImgEl = document.getElementById("mainWeather");
    setImageAndBackground(codeA);
    mainImgEl.src = attribute.bigSrc;

    if(mainImgEl.classList.contains("translate")){
        mainImgEl.classList.remove("translate");
    }
    else if(mainImgEl.classList.contains("rotateFull")){
        mainImgEl.classList.remove("rotateFull");
    }
    mainImgEl.classList.add(attribute.classToAdd);

    setText(temp,speed,humidite,context,hours,cityname);
}

function setImageAndBackground(code){
    var src;

     if(code >= 26 && code <= 30 || code == 44){
        src = "img/nuageux.png";
        attribute.bigSrc = "img/nuageuxBig.png";
        attribute.classToAdd = "translate";
    }
    else if(code >= 0 && code <= 4 || code >= 37 && code <= 39 || code >= 45 && code <= 47){
        src = "img/orage.png";
        attribute.bigSrc = "img/orageBig.png";
        attribute.classToAdd = "translate";
    }
    else if(code == 5 || code >= 13 && code <= 16 || code >= 41 && code <= 43 || code == 46){
        src = "img/neigeu.png";
        attribute.bigSrc = "img/neigeuxBig.png";
        attribute.classToAdd = "translate";
    }
    else if(code >= 8 && code <= 12  || code == 17 || code == 18){
        src= "img/pluvieux.png";
        attribute.bigSrc = "img/pluvieuwBig.png";
        attribute.classToAdd = "translate";
    }
    else if(code == 19 || code == 20 || code == 23 || code == 24 ){
        src = "img/windy.png";
        attribute.bigSrc = "img/windyBig.png";
        attribute.classToAdd = "translate";
    }
    else if(code == 32 ||code == 34 || code == 36){
        src = "img/sun.png";
        attribute.bigSrc = "img/sunny.png";
        attribute.classToAdd = "rotateFull";
    }
    else if(code == 31 || code == 33){
        src = 'img/lune.png';
        attribute.bigSrc = "img/luneBig.png";
        attribute.classToAdd = "translate";
    }



    return src;
}

function DisablePainting(){
    setTimeout(function(){
        var element = document.getElementById("app-loader");
        element.classList.remove("PullDown");
        element.classList.add("PullUp");

        setTimeout(function(){
            element.style.display = 'none';
        },1000);
    },2000);
}

function setPreview(element, tempX, context, date,compteur,code){

    // prevent of creating the same nodes.
    if(document.getElementById("un") && compteur == 0){
        var el1 = document.getElementById("un");
        var el2 = document.getElementById("deux");
        var el3 = document.getElementById("three");
        document.getElementById("footer").removeChild(el1);
        document.getElementById("footer").removeChild(el2);
        document.getElementById("footer").removeChild(el3);
    }
    // createElement
    var divNode = document.createElement("div");
    var dateNode = document.createElement("h2");
    var tempNode = document.createElement("h2");
    var imgNode = document.createElement("img");
    var hrNode = document.createElement("hr");
    var textNode = document.createElement("p");
    // set id and classes
    divNode.id = element;
    divNode.className = "forecast";
    imgNode.className = "futureW";
    hrNode.className = "other";
    // set properties
    var dateText = document.createTextNode(date);
    var tempText = document.createTextNode(tempX);
    var contextText = document.createTextNode(context);

    imgNode.src = setImageAndBackground(code);
    // add nodes.
    dateNode.appendChild(dateText);
    textNode.appendChild(contextText);
    tempNode.appendChild(tempText);
    divNode.appendChild(dateNode);
    divNode.appendChild(imgNode);
    divNode.appendChild(tempNode);
    divNode.appendChild(hrNode);
    divNode.appendChild(textNode);
    // set backgroundColor for the forecast element.
    divNode.style.backgroundColor = Color.setForecastColor(tempX);

    document.getElementById("footer").appendChild(divNode);
    if(compteur == 2){
        DisablePainting();
    }
    
}
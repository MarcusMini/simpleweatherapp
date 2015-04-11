/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// variable globale

var currentTemperature;
var currentText;
var currentWind;
var currentHumidity;
var sunset;
var compteur;
var codeCurrent;
var removeOrNot = false;
var start = true;

var myApp = {
    initialize : function(){
        document.addEventListener('deviceready', init, false);
        start = false;
    }
};

var geoValue = {
    long : this,
    lat : this,
    getCityName : function(){
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.long+'&sensor=true';
        var request = new XMLHttpRequest();
        request.open('GET',url, true);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0].address_components[2].long_name;
            getWeather(address);
          }
        };
        request.send();
    }
};


function init(){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
}

function onSuccess(position){
    geoValue.long = position.coords.longitude;
    geoValue.lat = position.coords.latitude;
    geoValue.getCityName();
}

function call(){
    init();
}

function AddError(message){
    var loader = document.getElementById("app-loader");

    var AppError = document.createElement("div");
    var errorMsg = document.createElement("div");
    var buttonMsg = document.createElement("div");
    var spanimg = document.createElement("span");
    var spanText = document.createElement("span");
    var imgError = document.createElement("img");
    var textError = document.createElement("p");
    var textButton = document.createElement("p");

    // create text

    var texte = document.createTextNode(message);
    var texteBoutton = document.createTextNode("Try again");

    AppError.id = "app-error";
    errorMsg.id = "errorMsg";
    buttonMsg.id = "button";
    imgError.src = "img/errorIcon.png";

    textError.appendChild(texte);
    textButton.appendChild(texteBoutton);

    spanimg.appendChild(imgError);
    spanText.appendChild(textError);

    AppError.appendChild(errorMsg);
    AppError.appendChild(buttonMsg);

    errorMsg.appendChild(spanimg);
    errorMsg.appendChild(spanText);

    buttonMsg.appendChild(textButton);

    loader.appendChild(AppError);

    var id = document.getElementById("button");
    id.addEventListener('touchstart', function(){
        id.classList.add("focus");
        init();
    }, false);

    id.addEventListener('touchend', function(){
        id.classList.remove("focus");
    }, false);
}

function onError(error){
    AddError("Oops we haven’t been able to determine your location. Make sure that your GPS is activate");
}

function setPainting(){
    var element = document.getElementById("app-loader");
    element.style.display = 'block';
    element.classList.remove("PullUp");
    element.classList.add("PullDown");
}

function getWeather(cityname){
    compteur = 0;
    var weatherRequest = new XMLHttpRequest();
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cityname+'%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';    
    weatherRequest.open("GET",url,true);
    weatherRequest.onreadystatechange = function(){
          if(weatherRequest.readyState == 4 || weatherRequest.readyState == 200){
            var data = JSON.parse(weatherRequest.responseText);
            currentTemperature = data.query.results.channel.item.condition.temp;
            currentText = data.query.results.channel.item.condition.text;
            currentWind = data.query.results.channel.wind.speed;
            currentHumidity = data.query.results.channel.atmosphere.humidity;
            sunset = data.query.results.channel.astronomy.sunset;
            codeCurrent = data.query.results.channel.item.condition.code;
            setData(currentTemperature,currentWind,currentHumidity,currentText,sunset,cityname,codeCurrent);  

            //alert(data.query.results.channel.forecast);

            for(var i in data.query.results.channel.item.forecast){
                //alert(data.query.results.channel.item.forecast[i].date);
                if(compteur < 3){
                    var element = ["un","deux","three"];
                    var code = data.query.results.channel.item.forecast[i].code;
                    var futureTmp = Math.floor((data.query.results.channel.item.forecast[i].high - 32) * (5/9));
                    var futureCont = data.query.results.channel.item.forecast[i].text;
                    var futureDate = data.query.results.channel.item.forecast[i].date;
                    setPreview(element[compteur], futureTmp, futureCont,futureDate,compteur,code);
                }
                compteur++;
            }
            compteur = 0;
          }
        }
    weatherRequest.send();
}


        
myApp.initialize();
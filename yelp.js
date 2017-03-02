function initialize () {
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAU6HZZuaFMlmHh-fVvHM9BdqMjaJiItdk&callback=initMap";
    // var script2 = document.createElement('script');
    // script2.type = 'text/javascript';
    // script2.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    // var map;
    // function initMap() {
    //     map = new google.maps.Map(document.getElementById('map'),
    //         {
    //             center: {lat: 32.75, lng: -97.13},
    //             zoom: 16
    //         });
    // }
}

function sendRequest () {
    
    var markers = [];
    // markers.remove();
    // markerCluster.setMap(null);
    for (var j = 0; j<markers.length; j++) {
        markers[j].setMap(null);
        markers = [];
    }
    markers.length = 0;
   var xhr = new XMLHttpRequest();
   // xhr.open("GET", "proxy.php?term=indian+restaurant&location=Arlington+Texas&limit=5");
    // var map = document.getElementById("map");
    //     google.maps.event.addListener(map, 'bounds_changed', function() {
    //     var bounds = map.getBounds();
    //     var sw = bounds.getSouthWest();
    //     var ne = bounds.getNorthEast();
    //     var sww = sw.lat();
        // document.write("Hi");
    // });
    // "</script>"
    // var MarkerCluster;

    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var swla = sw.lat();
    var swlo = sw.lng();
    var ne = bounds.getNorthEast();
    var nela = ne.lat();
    var nelo = ne.lng();


    // var jssw = document.getElementById(sw);
    // var swww = sw.lat();
    // var jsne = document.getElementsByName(ne);
    var query = encodeURI(document.getElementById("search").value);
   // xhr.open("GET","proxy.php?")
    xhr.open("GET", "proxy.php?term=" + query + "&bounds="+swla+","+swlo+"|"+nela+","+nelo+"&limit=10");
    xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
           var json = JSON.parse(this.responseText);
           var str = JSON.stringify(json, undefined, 2);


           // var
           // google.maps.event.addListener(map, 'bounds_changed', function() {
           //     bounds =  map.getBounds();
           //     ne = bounds.getNorthEast();
           //     sw = bounds.getSouthWest();
           // });
           // var coor = json.region.center.longitude;
           var long = [], latt = [];
           var locations = [];
           for (var i = 0; i < json.businesses.length; i++) {
               // var rLabels = 'ABCDEFGHIJK';
               // var markers = locations.map(function(location, i){
               //    return new google.maps.Marker({
               //       position: location,
               //        label: rLabels[i%lables.length]
               //    });
               // });
               //  var markerCluster = new MarkerClusterer(map, markers,
               //      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

               long[i] = json.businesses[i].location.coordinate.longitude;
               latt[i] = json.businesses[i].location.coordinate.latitude;
               locations.push(
                   {lat: latt[i], lng: long[i]}
                   // "{lat: "+lat[i]+",lng:"+long[i]+"},"
               );
               var loc = JSON.stringify(locations, undefined, 2);

           }
           // var markers = [];
           // markers.remove();
           // markerCluster.setMap(null);
           // for (var j = 0; j<markers.length; j++) {
           //     markers[j].setMap(null);
           //     markers = [];
           // }
           // markers.length = 0;

           for (var i = 0; i < json.businesses.length; i++) {


               var rLabels = '123456789';
               // // var markers;
               //     for (i in markers) {
               //         markers[i].setMap(null);
               //     }
               //     markers.length = 0;

                markers= locations.map(function (location, i    ) {
                   return new google.maps.Marker({
                       position: location,
                       label: rLabels[i % rLabels.length]
                   });
               });

               var markerCluster = new MarkerClusterer(map, markers,
                   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

               // src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
               // }


               otherElements(i,json);
           }
           // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };

   xhr.send(null);
}

function otherElements(i,json){

    var img = document.createElement("img");
    var stru = json.businesses[i].image_url;
    img.src = stru;
    document.body.appendChild(img);
    // img.appendChild(document.createElement("br"));
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var name = document.createTextNode("Name: " + json.businesses[i].name);
    li.appendChild(name);
    li.appendChild(document.createElement("br"));
    var link = json.businesses[i].url;
    var link2 = document.createElement("a");
    link2.href = link;
    link2.innerHTML = link;
    li.appendChild(link2);
    // li.appendChild(link2);
    li.appendChild(document.createElement("br"));
    var snippet = document.createTextNode("Snippet: " + json.businesses[i].snippet_text);
    li.appendChild(snippet);
    li.appendChild(document.createElement("br"));

    ul.appendChild(li);
    document.body.appendChild(ul);
    var img2 = document.createElement("img");
    img2.src = json.businesses[i].rating_img_url;
    document.body.appendChild(img2);
    img2.appendChild(document.createElement("br"));

    // json.
    var str2 = JSON.stringify(json, undefined, 2);
    // document.getElementById("output").innerHTML = "<pre>" + name + "</pre>";
    return;


}

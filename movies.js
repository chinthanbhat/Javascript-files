function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   // xhr.open("GET", "proxy.php?method=/3/movie/{603&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   // var str = xhr.responseText;
   // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
    var str;
    var strfy;
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var strfy = JSON.stringify(json, undefined, 2);
            var movieArr = json.results;
            var movie = document.getElementById("movieList");
            for (i = 0; i < movieArr.length; i++) {
                // var movie = document.getElementById("movieList");
                var li = document.createElement("li");
                // li.innerHTML = i + 1;
                var textMovie = document.createTextNode(movieArr[i].original_title + "(" + movieArr[i].release_date + ")");
                li.appendChild(textMovie);
                // movie.appendChild(li);
                var displayMovie = movieArr[i].poster_path;
                var id = movieArr[i].id;
                //     li.onclick = function () {
                //        alert(displayMovie);
               //
               //     }
                movie.appendChild(li);
                (function (value) {
                   li.addEventListener("click", function () {
                       // alert(value);
                       movieFunction(value);
                       // var xhr = new XMLHttpRequest();
                       // var query = encodeURI(document.getElementById("movieList").value);
                       // xhr.open("GET", "proxy.php?method=/3/movie&" + value);
                       // // document.getElementById("output").innerHTML = "<pre>" + value + "</pre>";
                       // xhr.setRequestHeader("Accept","application/json");
                       // xhr.onreadystatechange = function () {
                       //     if (this.readyState == 4) {
                       //         var json = JSON.parse(this.responseText);
                       //         strfy = JSON.stringify(json, undefined, 2);
                       //         document.getElementById("output").innerHTML = "<pre>" + strfy + "</pre>";
                       //     }
                       // };

                   }, false);
               })(id);

           }
           // var str = movieArr[1].original_title;
           // for(var x in json){
           //     arr.push([x]);
           // }
           // var len = json.results.length;
           // document.getElementById("output").innerHTML = "<pre>" + len + "</pre>";
           // for(var i = 0; i< json.results.length;i++){
           //    var str = json.results[i].original_title;
           //    // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
           // }
           // var len = str.length;
           // document.getElementById("output").innerHTML = "<pre>" + json.results[0].original_title + "</pre>";

           // document.getElementById("output").innerHTML = "<pre>" + strfy + "</pre>";
       }

   };
   xhr.send(null);
}
//
function movieFunction(value) {
    var xhr = new XMLHttpRequest();
    var query = encodeURI(document.getElementById("movieList").value);
    // xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
    // xhr.setRequestHeader("Accept","application/json");

    xhr.open("GET", "proxy.php?method=/3/movie&" + value);
    // document.getElementById("output").innerHTML = "<pre>" + value + "</pre>";
    var strfy;
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            strfy = JSON.stringify(json, undefined, 2);
            document.getElementById('myImage').src = 'http://image.tmdb.org/t/p/w500/'+json.poster_path;
            var movieInfo = document.getElementById("movieInfo");
            var li2 = document.createElement('li');
            var movieTitle = document.createTextNode(json.original_title + " ||Genres = ");
            li2.appendChild(movieTitle);
            var genresStr = " ";
            for (var i = 0; i<json.genres.length;i++) {
                var genresStr = genresStr + json.genres[i].name + ", ";
            }
            var str = json.genres.length;
            // var genresStr = json.genres.name.toString();
            var genres2 = document.createTextNode(genresStr + " ||Overview = ");
            li2.appendChild(genres2);
            li2.appendChild(document.createElement("br"));
            var overview2 = document.createTextNode(json.overview);
            li2.appendChild(overview2);
            movieInfo.appendChild(li2);


            // var query = encodeURI(document.getElementById("movieList").value);
            // xhr.open("GET", "proxy.php?method=/3/movie/{id}/credits&" + value);
            // xhr.setRequestHeader("Accept","application/json");
            //  xhr.onreadystatechange = function () {
            //      if (this.readyState == 4) {
            //          var json = JSON.parse(this.responseText);
            //          strfy2 = JSON.stringify(json, undefined, 2);
            //
            //      }
            //      document.getElementById("output").innerHTML = "<pre>" + strfy2 + "<pre>";
            //  };
            creditsFunction(value);

        }
        // document.getElementById("output").innerHTML = "<pre>" + strfy + "</pre>";

    };
    xhr.send(null);
}

function creditsFunction(value){

    var xhr = new XMLHttpRequest();
    var query = encodeURI(document.getElementById("movieList").value);
    // xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
    // xhr.setRequestHeader("Accept","application/json");

    xhr.open("GET", "proxy.php?method=/3/credits&" + value);
    // document.getElementById("output").innerHTML = "<pre>" + value + "</pre>";
    var strfy2;
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            strfy2 = JSON.stringify(json, undefined, 2);
            var castUl = document.getElementById("cast");
            var castStr = "Cast: "
            for(var i = 0; i < 5; i++) {
                castStr = castStr + json.cast[i].name + ", ";
            }
            var li3 = document.createElement('li');
            var cast = document.createTextNode(castStr);
            li3.appendChild(cast);
            castUl.appendChild(li3);
        }
        // document.getElementById("output").innerHTML = "<pre>" + strfy2 + "<pre>";
    };
    xhr.send(null);

}
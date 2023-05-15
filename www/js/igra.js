
var settings = {
    sequence: [],
    round: 0,
    playNumber: 0,
    speed: 1000,
    clicked: 0
}
var rez=0;
//Pravljenje baze podataka
var db;
var shortName = 'SimonSays';
var version = '1.0';
var displayName = 'Moja WebSQL baza';
var maxSize = 65535;


if(!window.openDatabase){
  alert("Lokalna baza nije podrzana!");
}
else{
  db = openDatabase(shortName, version, displayName, maxSize);
  db.transaction(stvoriTablicu, errorHandler, sveOK);
}

function errorHandler(transaction, err){
 console.log('Greška');
}

function sveOK(){
  console.log('Akcija izvršena');
}
function stvoriTablicu(tx){
  tx.executeSql('CREATE TABLE IF NOT EXISTS Igraci(igracId INTEGER NOT NULL PRIMARY KEY, ime VARCHAR NOT NULL, bodovi INTEGER NOT NULL, drzava VARCHAR NULL)', [], sveOK, errorHandler);
}

function dodajZapis(){
  db.transaction(dodajPodatke, errorHandler, sveOK);
}

function dodajPodatke(k){
    $.get("https://ipinfo.io", function(response) {console.log(response.country); localStorage.setItem('drzavaIgraca', response.city);}, "jsonp");
    if(document.getElementById('lokacija').checked)
    {
        localStorage.setItem('spremiLokaciju', "da");
    }
    else {
        localStorage.setItem('spremiLokaciju', "ne");
    }
    var ime = document.getElementById("ime").value;
    var bodovi = rez;
    var lok = localStorage.getItem("spremiLokaciju");
    if (lok == "da"){
        var lok2 = localStorage.getItem("drzavaIgraca");
    }
    if (lok == "ne"){
        var lok2 = "";
    }
    
    k.executeSql('INSERT INTO Igraci(ime, bodovi, drzava) VALUES (?, ?, ?)', [ime, bodovi, lok2]);
}

window.onload=function(){
    var btnSpremi = document.getElementById("btnSpremi");
    btnSpremi.addEventListener("click", dodajZapis);
    
    var audio = $("#sound");
    function animate(divid) {
        // Increase round speed.
        if (settings.round > 5) {
            settings.speed = 500
        }
        if (divid == "a") {
            $("#a").css("border-color", "#1aff00");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/Sound17.wav");
            setTimeout(function() {
                $("#a").css("border-color", "#28C032");
            }, 200);
        } else if (divid == "b") {
            $("#b").css("border-color", "#F07A7A");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/R2chirp.wav");
            setTimeout(function() {
                $("#b").css("border-color", "#CF200F");
            }, 200);
        } else if (divid == "c") {
            $("#c").css("border-color", "#ffec00");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/BEEP2.wav");
            setTimeout(function() {
                $("#c").css("border-color", "#E8C125");
            }, 200);
        } else if (divid == "d") {
            $("#d").css("border-color", "#29abd0");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/blob.wav");
            setTimeout(function() {
                $("#d").css("border-color", "#1581CC");
            }, 200);
        }

        /*var ch=document.getElementById("zvuk");
        if(ch.checked==true){
            audio[0].load();
            audio[0].play();
        }
        else{
            audio[0].pause();
        }*/
        
        audio[0].pause();
        audio[0].load();
        audio[0].play();

    }

    function makeid() {
        var text = "";
        var possible = "abcd";

        for (var i = 0; i < 1; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            settings.sequence.push(text);
        }

        function myLoop() {
            setTimeout(function() {
                animate(settings.sequence[settings.playNumber]);
                settings.playNumber++;
                if (settings.playNumber < settings.sequence.length) {
                    myLoop();
                } else {
                    settings.playNumber = 0;
                    listen();
                }
            }, settings.speed)
        }
        myLoop();
    }

    // LISTEN 
    function listen() {
        $("#a, #b, #c, #d").on("mousedown", function() {
            if (this.id == settings.sequence[settings.clicked]) {
                if (settings.clicked === settings.sequence.length - 1) {
                    $("#a, #b, #c, #d").off("mousedown");
                    settings.clicked = 0;
                    $("#start").trigger("click");
                } else {
                    console.log("Right!");
                    settings.clicked++;
                }
            } else {
                console.log("WRONG");
            
            
                var modal = document.getElementById('myModal');
                modal.style.display="block";

                document.getElementById("highscore").innerHTML+="Vaš score je: "+rez;
            
                $("#simon, #count").css("filter", "blur(5px)");
                $("#simon, #count").css("-webkit-filter", "blur(5px)");
                
                $("#a, #b, #c, #d").off("mousedown");                          
            }
        });
    }
    
    //BEGIN GAME
    $("#a, #b, #c, #d").on("click", function() {
        animate(this.id)
    });
    $("#start").on("click", function() {
        $("#start").hide();
        $("#simon, #count").css("filter", "blur(0px)");
        $("#simon, #count").css("-webkit-filter", "blur(0px)");
        rez+=10*settings.round++;  //za prikaz scora
        makeid(); // make id and play it
        
        $("#count").html(settings.round - 1); //-1 da krene od 0
        //playit();
        
    }); 

    $("#btnHome").on("click", function() {
        /*$("#fail").hide();*/
        location.href="index.html";
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0,
        settings.speed = 1000;
        settings.clicked = 0;
        /*$("#start").trigger("click");*/
    });
    
    $("#btnRepeat").on("click", function() {
        /*$("#fail").hide();*/
        location.href="igra.html";
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0,
        settings.speed = 1000;
        settings.clicked = 0;
        $("#start").trigger("click");
    });

    
}; //document ready


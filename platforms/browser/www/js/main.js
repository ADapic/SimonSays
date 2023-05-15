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
}

function errorHandler(transaction, err){
    console.log('Greška');
   }
   
function sveOK(){
     console.log('Akcija izvršena');
}


window.onload=function() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    document.getElementById("btnStart").addEventListener('click',igra);
    document.getElementById("btnInfo").addEventListener('click',info);
    document.getElementById("btnScore").addEventListener('click',dohvatiScore);
}
function igra(){
    location.href="igra.html";
}

function info(){
    var modal = document.getElementById('myModal');
    modal.style.display="block";
    document.getElementById("ispis").innerHTML="Simon Says Igrica – Klasična igrica u kojoj se koriste tonovi i svjetlo u svrhu testiranja vaših memorijskih sposobnosti. Odigrat će se niz tonova i osvjetljenja na dugmićima, a vi treba da zapamtite redoslijed i da to ponovite pritiskom na obojene dugmiće. Kako igra napreduje dodaju se novi tonovi i postaje sve teže za praćenje i pamćenje. Igra se završava kada pogriješite i pomiješate redoslijed tonova i osvetljenja.";
    
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
}



window.onload=function() {
    document.getElementById("btnStart").addEventListener('click',igra);
    document.getElementById("btnInfo").addEventListener('click',info);
    document.getElementById("btnScore").addEventListener('click',dohvatiScore);
    
}

function igra(){
    window.open("igra.html","_self");
}

function info(){
    var modal = document.getElementById('myModal');
    modal.style.display="block";
    document.getElementById("ispis").innerHTML="<br>Simon Says – Klasična igrica u kojoj se koriste tonovi i svjetlo u svrhu testiranja vaših memorijskih sposobnosti. Odigrat će se niz tonova i osvjetljenja na dugmićima, a vi trebate da zapamtite redoslijed i da to ponovite pritiskom na obojene dugmiće. Igra se završava kada pogriješite i pomiješate redoslijed tonova i osvjetljenja.";
    
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
}

function dohvatiScore(){
    db.transaction(dohvatiIgrace, errorHandler, sveOK);
    var modal2 = document.getElementById('myModal2');
    modal2.style.display="block";
    var span2 = document.getElementsByClassName("close2")[0];
    span2.onclick = function() {
         modal2.style.display = "none";
        }
    document.getElementById("ispisScore").innerHTML=""; //dodala da ne udupla 
}
    
function dohvatiIgrace(k){
    k.executeSql('SELECT * FROM Igraci ORDER BY bodovi DESC;', [], obradaRezultataIgraci, sveOK);
}

function obradaRezultataIgraci(t, rez){
    if(rez != null && rez.rows != null)
    {
        var v = 0;
        for(var i = 0; i < rez.rows.length; i++){
            v=i+1;
            var igrac = rez.rows.item(i);        
             
            document.getElementById("ispisScore").innerHTML += v+". "+ igrac.ime + "     " + igrac.bodovi  + "       "+igrac.drzava+ "<br>";           
      }
      
    }
  }
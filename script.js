(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 0);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm="a.m.".italics()

            if (h < 10) {
                h = "0" + h;
            }

            if  (h>12) {
                h=h-12
                ampm="p.m.".italics();                
            }

            if  (h==12) {
                ampm="noon".italics();
            } 
        
            if  (h==0) {
                ampm="midnight".italics();
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = (h + ":" + m + ":" + s + ampm).fontcolor("red");
            
        };
        
    });
    
       // forms

       let result = document.querySelector('#result');
       document.body.addEventListener('change', function (e) {
           let target = e.target;
           let message;
           let message2;
           switch (target.id) {
   
               case 'v1':
                   message = 'Tarnele lisandub 5 eurot';
                  alert('Tarnele lisandub 5 eurot\nPalun valige pakend');
                   break;
                  
               case 'kuldne':
                   message = 'Valitud on kuldne pakend. Tarnele lisandub 5 eurot.';
                   break;
               case 'roosa':
                   message = 'Valitud on roosa pakend. Tarnele lisandub 5 eurot.';
                   break;
               case 'eco':
                   message = 'Valitud on öko-pakend. Tarnele lisandub 5 eurot.';
                   break;
   
               case 'v2':
                   message2 = 'Valisite kontaktivaba tarne. Tarnele lisandub 1 euro';
                   alert('Valisite kontaktivaba tarne\nTarnele lisandub 1 euro');
                   break;
           }
           result.textContent = message;
           result2.textContent = message2
       });
   
   
       
       document.getElementById("form").addEventListener("submit", estimateDelivery);
       
       let e = document.getElementById("delivery");
       e.innerHTML = "0,00 &euro;";
       
       function estimateDelivery(event) {
           event.preventDefault();
   
           let eesnimi = document.getElementById("fname");
           let perekonnanimi = document.getElementById("lname");           
           let linn = document.getElementById("linn");
           
           let letters = /^[A-Za-z]+$/;
   
   
           if (eesnimi.value === "") 
           {            
               alert("Teil on eesnimi sisestamata \nPalun sisestage oma eesnimi");               
               eesnimi.focus();             
               return;           
           }   
   
   
           if(eesnimi.value != eesnimi.value.match(letters))           
           {
               alert("Numbrid pole lubatud! \nPalun sisestage nimelahtrisse ainult tähti!");   
               eesnimi.focus();   
               return;               
           }
   
   
           if (perekonnanimi.value === "") 
           {               
               alert("Teil on perekonnanimi sisestamata \nPalun sisestage oma perekonnanimi");               
               perekonnanimi.focus();               
               return;           
           }
   
   
           if(perekonnanimi.value != perekonnanimi.value.match(letters))
           {
               alert("Numbrid pole lubatud! \nPalun sisestage nimelahtrisse ainult tähti!");   
               perekonnanimi.focus();   
               return;               
           }   
   
           if (linn.value === "") 
           {               
               alert("Palun valige linn nimekirjast");               
               linn.focus();               
               return;           
           }
             
           else if (linn.value==="tln")
           {
                   e.innerHTML = "0 &euro;";
           }
           else if (linn.value==="trt")
           {
                   e.innerHTML = "2,50 &euro;";
           }
           else if (linn.value==="nrv")
           {
                   e.innerHTML = "2,50 &euro;";
           }
           else if (linn.value==="prn")
           {
                   e.innerHTML = "3 &euro;";
           }

           else if (v1.value===true)//PROOV!!!   s
           {
                   e.innerHTML = "9 &euro;";
           }


   
                      
           console.log("Tarne hind on arvutatud");
       }
       
   })();
   
   
  
   
   // map
   
   let mapAPIKey = "Ao16nObDdcYZ-w46eI2KB2jxtaD137CwTwXNNd6nYWOhFp9mDb4qHcRU5GP4Ig1d";
   
   let map, infobox, infobox2; 
   
   function GetMap() {
       
       "use strict";
   
       let centerPoint = new Microsoft.Maps.Location(
        59.24816254406514, 25.91570431569596  
           );

        let ylikool = new Microsoft.Maps.Location(
            58.38104,26.71992  
               );

        let taltech = new Microsoft.Maps.Location(
            59.39613617209804, 24.671124373012194 
                 );

        
       map = new Microsoft.Maps.Map("#map", {
           credentials: mapAPIKey,
           center: centerPoint,
           zoom: 7,
           mapTypeId: Microsoft.Maps.MapTypeId.road,
           disablePanning: true
       });
              
        //Infoboksi loomine, aga ei näita
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        //kaardile
        infobox.setMap(map);

        //Markeri loomine
        var pin = new Microsoft.Maps.Pushpin(ylikool, {
            title: 'Tartu Ülikool',
            //subTitle: 'Ülikooli 18, Tartu',
            text: 'UT',
            color: 'MediumBlue',
            
        });

        //andmed infoboksi jaoks
        pin.metadata = {
            title: 'Tartu Ülikool',
            description:'Asutatud 1632. Aadress: Ülikooli 18, 51014, Tartu',
         };

        //Sündmuse seadmine
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        //Marker kaardile
        map.entities.push(pin);


         //Infoboksi loomine, aga ei näita
         infobox2 = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        //kaardile
        infobox2.setMap(map);

        //Markeri loomine
        var pin2 = new Microsoft.Maps.Pushpin(taltech, {
            title: 'TalTech',
            //subTitle: 'Raekoja plats 18, Tartu',
            text: 'TalTech',
            color: 'MediumVioletRed',
        });

        //andmed infoboksi jaoks
        pin2.metadata = {
            title: 'Tallinna Tehnikaülikool TalTech',
            description:'Asutatud 1918. Aadress:Ehitajate tee 5, 19086, Tallinn',
         };

        //Sündmuse seadmine
        Microsoft.Maps.Events.addHandler(pin2, 'click', pushpinClicked);

        //Marker kaardile
        map.entities.push(pin2);

    }

    function pushpinClicked(e) {
        //Peab olema andmeoid, mida näidata
        if (e.target.metadata) {
            //Seadistamine
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    
   }
   
  
   
   
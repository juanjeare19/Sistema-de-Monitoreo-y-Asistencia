/*----------------------------------------------------------------------------------
:*                          CV SOFTWARE STUDIO
:*
:*                      FECHA DE INICIO AGO-DIC/2021  
:*
:*                        Clase que genera las graficas 
:*
:* Archivo      : graficas.js
:* Autor        : Equipo de desarrollo Cv Studio 
:* Fecha        : 15/Octubre/2021
:* Compilador   : 
:* Descripcion  : Difrentes graficas 
:* Ultima modif : 14/11/2021
:* Fecha        Modificion                  Motivo
:* 11/11/2021
:* 14/11/2021   
:*==================================================================================
:*
:*----------------------------------------------------------------------------------*/

//----------------------------------------------------------------------------------//
// 
//----------------------------------------------------------------------------------//
import {getFirestore, collection, getDocs, query, onSnapshot} 
from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import {firebaseApp} from "./credenciales.js"
import  {auth} from "./auth.js";
import {onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
//-------------------------------------------------------------------------------//
// DOM
//-------------------------------------------------------------------------------//
const db = getFirestore(firebaseApp);
var ctxx3 = document.getElementById("grafic3").getContext("2d");
var ctxx4 = document.getElementById("pieChart").getContext("2d");
var gradosDonus = document.getElementById("grados-Donus");
var pulsosLinea = document.getElementById("pulos-line");
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
var tem1, tem2, tem3;
var pulso1, pulso2, pulso3;
const fecha = new Date();

var hoy = fecha.getDate() + "/" + fecha.getMonth() + "/" +
          fecha.getFullYear() + " " + fecha.toLocaleTimeString();
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
onAuthStateChanged(auth, (user) =>{
    obtBPM();
    obtTemp();
});  

//----------------------------------------------------------------------------------//
// Configuraciones de Grafica de lineas
//----------------------------------------------------------------------------------//
/*var myChart = new Chart(ctx, {
    // Tipo de grafica
    type: 'line',
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
    data: {
        // Datos inferior de la grafica
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'],
            datasets: [
                {
                    label: "Semana 1",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#f15765',
                    pointBorderColor: '#da4c59',
                    pointHoverBackgroundColor: '#da4c59',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: [37.0,36.9,37.2,37.0,37.8,37.9,37.4],
                    spanGaps: false
                },{
                    label: "Semana 2",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: "#54e69d",
                    pointHoverBackgroundColor: "#44c384",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: "#44c384",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [36.0,36.9,36.2,36.0,36.8,36.9,36.4],
                    spanGaps: false
                }
            ]
    }
});
//----------------------------------------------------------------------------------//
// Configuraciones de Grafica barras
//----------------------------------------------------------------------------------//
var myChart = new Chart(ctxx2, {
    type: 'bar',
    data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'],
        datasets: [{
            label: '# de Pulsaciones por minuto',
            data: [20, 100, 180, 170, 160, 150, 200],
            
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});*/
//----------------------------------------------------------------------------------//
// Configuraciones de Grafica linea
//----------------------------------------------------------------------------------//
function obtBPM(){
    var index2;
    const q2 = query(collection(db, "BPM"));
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        //6 a 12 mañana, de 12 a 19 tarde, 19 a 24 noche
        for (let i = 0; i < cities.length; i++) {
            if(hoy <= cities[i].ult_fech_Tmp){
                hoy = cities[i].ult_fech_Tmp;
                for (let j = 0; j < cities.length; j++) {
                    if(hoy >= cities[j].ult_fech_Tmp){
                        hoy = cities[j].ult_fech_Tmp;
                        index2 = j;
                    }
                }    
            }else{
                console.log("enl0");
            }
        }
        var tiempo = cities[index2].ult_fech_Tmp;
        var temaux = tiempo.substr(11,12).substr(0,2);
        //console.log(tiempo);
        if(temaux >= 19 && temaux < 24){
            //console.log("Noche " +cities[index2].ult_fech_Tmp);
            pulso3 = cities[index2].bpm;
            pulsosLinea.innerHTML = `
        <p class="text-xl-start text-center fw-normal">${cities[index2].bpm} pulsos por minuto</p>`;
        }
        cities.splice(index2,1);
        
        for (let i = 0; i < cities.length; i++) {
            if(hoy >= cities[i].ult_fech_Tmp){
                hoy = cities[i].ult_fech_Tmp;
                for (let j = 0; j < cities.length; j++) {
                    if(hoy <= cities[j].ult_fech_Tmp){
                        hoy = cities[j].ult_fech_Tmp;
                        index2 = j;
                    }
                }    
            }else{
                console.log("enl1");
            }
        }
        
        var tiempo = cities[index2].ult_fech_Tmp;
        var temaux = tiempo.substr(11,12).substr(0,2);
        //console.log(tiempo);
        if(temaux >= 12 && temaux <= 19){
            //console.log("Tarde " +cities[index2].ult_fech_Tmp);
            pulso2 = cities[index2].bpm;
            pulsosLinea.innerHTML = `
            <p class="text-xl-start text-center fw-normal">${cities[index2].bpm} pulsos por minuto</p>`;
        }


        cities.splice(index2,1);
        for (let i = 0; i < cities.length; i++) {
            if(hoy >= cities[i].ult_fech_Tmp){
                hoy = cities[i].ult_fech_Tmp;
                for (let j = 0; j < cities.length; j++) {
                    if(hoy <= cities[j].ult_fech_Tmp){
                        hoy = cities[j].ult_fech_Tmp;
                        index2 = j;
                    }
                }    
            }else{
                console.log("enl2");
            }
        }
        
        var tiempo = cities[index2].ult_fech_Tmp;
        var temaux = tiempo.substr(11,12).substr(0,2);
        //console.log(tiempo);
        if(temaux >= 6 && temaux <= 12){
            //console.log("Ma;ana " +cities[index2].ult_fech_Tmp);
            pulso1 = cities[index2].bpm;
            pulsosLinea.innerHTML = `
            <p class="text-xl-start text-center fw-normal">${cities[index2].bpm} pulsos por minuto</p>`;
        }
        graficaLinea();
    });

}

function graficaLinea(){
    var myChart = new Chart(ctxx3, {
        type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 40,
                            min: 0,
                            stepSize: 0.5
                        },
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                }
            },
            data: {
                labels: ["Mañana", "Tarde", "Noche"],
                datasets: [
                    {
                        label: "Pulsos",
                        fill: true,
                        lineTension: 0,
                        backgroundColor: "transparent",
                        borderColor: '#6ccef0',
                        pointBorderColor: '#59c2e6',
                        pointHoverBackgroundColor: '#59c2e6',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 3,
                        pointBackgroundColor: "#59c2e6",
                        pointBorderWidth: 0,
                        pointHoverRadius: 4,
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 0,
                        pointRadius: 4,
                        pointHitRadius: 0,
                        data: [pulso1, pulso2, pulso3],
                        spanGaps: false
                    }
                ]
            }
    });
}

//----------------------------------------------------------------------------------//
// Configuraciones de Grafica de Donas
//----------------------------------------------------------------------------------//
function obtTemp(){
    var index;
    const q = query(collection(db, "temperatura"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        for (let i = 0; i < cities.length; i++) {
            if(hoy <= cities[i].ult_fech_Tmp){
                hoy = cities[i].ult_fech_Tmp;
                for (let j = 0; j < cities.length; j++) {
                    if(hoy >= cities[j].ult_fech_Tmp){
                        hoy = cities[j].ult_fech_Tmp;
                        index = j;
                    }
                }    
            }else{
                //console.log("enl");
            }
        }
        
        if(cities[index].temperatura < 37.5){
            tem1 = cities[index].temperatura;
            tem2 = 0;
            tem3 = 0; 
            //console.log("> 37.5");
        }else if(cities[index].temperatura < 40.0){
            tem2 = cities[index].temperatura;
            tem1 = 0;
            tem3 = 0;
            //Enviar mensaje de texto de albertencia
            //createSMS();
            //console.log("> 41");
        }else if (cities[index].temperatura > 40.0){
            tem3 = cities[index].temperatura;
            tem1 = 0;
            tem2 = 0;
            //Enviar mensaje de texto de urgencia
            //console.log(">");
        }
        gradosDonus.innerHTML = `
        <strong class="d-block lh-1 text-lg">${cities[index].temperatura}</strong>`;
        grficaDoughut();
    });
}   

function grficaDoughut(){
    var myChart = new Chart(ctxx4, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        },
        data: {
            labels: [
                "Normal",
                "Fiebre",
                "Fiebre Alta"
            ],
            datasets: [
                {
                    data: [tem1, tem2, tem3],
                    borderWidth: [0, 0, 0],
                    backgroundColor: [
                        "#28B463",
                        "#D68910",
                        "#CB4335"
                    ],
                    hoverBackgroundColor: [
                        "#28B463",
                        "#D68910",
                        "#CB4335"
                    ]
                }]
        }
    });
}

//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//



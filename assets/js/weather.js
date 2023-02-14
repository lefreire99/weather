import { weather_data } from './data.js';


let loadDayForecastData = (indice) => {
	let data = weather_data[indice]
    let {city_code, city, date,maxtemperature,mintemperature,cloudiness,wind,rainfall,forecast_today} = data
    let {text:text_tarde,temperature:temp_tarde,forecast:desc_tarde,icon:icon_tarde} = forecast_today[0]
    let {text:text_noche,temperature:temp_noche,forecast:desc_noche,icon:icon_noche} = forecast_today[1]

    let ciudad = document.getElementById("city")
    ciudad.innerText = city
    let fecha = document.getElementById("date")
    fecha.innerText = date
    let maxtemp = document.getElementById("maxtemperature")
    maxtemp.innerText = maxtemperature
    let mintemp = document.getElementById("mintemperature")
    mintemp.innerText = mintemperature
    let nubes = document.getElementById("cloudiness")
    nubes.innerText = cloudiness
    let viento = document.getElementById("wind")
    viento.innerText = wind
    let lluvia = document.getElementById("rainfall")
    lluvia.innerText = rainfall

    document.getElementById("late_icon").innerText = icon_tarde
    document.getElementById("late_temperature").innerText = temp_tarde
    document.getElementById("late_forecast").innerText = desc_tarde
    document.getElementById("late_text").innerText = text_tarde

    document.getElementById("night_icon").innerText = icon_noche
    document.getElementById("night_temperature").innerText = temp_noche
    document.getElementById("night_forecast").innerText = desc_noche
    document.getElementById("night_text").innerText = text_noche
}

let loadWeekForecastData = (indice) => {
	let data = weather_data[indice]
    let {forecast_week} = data
    
    let lista_week = document.getElementsByClassName("list-group")[0]
    lista_week.innerHTML=""
    for(let elem of forecast_week){
        let {text,date,temperature,icon} = elem
        let {min,max} = temperature
        let plantilla = `
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
            <div class="d-flex flex-column">
                <h6 class="mb-1 text-dark font-weight-bold text-sm">${text}</h6>
                <span class="text-xs">${date}</span>
            </div>
            <div class="d-flex align-items-center ">
                <span class="font-weight-bold text-dark mx-2">${max}</span> |  <span class="text-dark mx-2">${min}</span>
                <div class="ms-4"><i class="material-icons fs-2 me-1 rainy">${icon}</i></div>
            </div>
        </li>
        `
        lista_week.innerHTML += plantilla
    }
	
}

let cargarSelect = ()=>{
    let select = document.getElementById("dropdownMenuButton")
    select.innerHTML = `
        <option value="" selected disabled hidden>Seleccione una ciudad</option>
    `
    for(let elem of weather_data){
        let{city_code,city} = elem
        let plantilla = `<option class="dropdown-item" value=${city_code}>${city}</option>`
        select.innerHTML += plantilla
    }
}

let cargarCiudad = ()=>{
    let select = document.getElementById("dropdownMenuButton")
    let ciudad = weather_data.length
    select.addEventListener("change",(event)=>{
        let selectedValue = event.target.value
        let lista_week = document.getElementsByClassName("list-group")[0]
        lista_week.innerHTML=""
        for(var i=0;i<weather_data.length;i++){
            if(weather_data[i]["city_code"]==selectedValue){
                ciudad = i
                loadDayForecastData(i)
            }
        }
    })
    let boton_cargar = document.getElementById("loadinfo")
    boton_cargar.addEventListener("click",(event)=>{
        loadWeekForecastData(ciudad);
    })
}


document.addEventListener("DOMContentLoaded",(event)=>{
    cargarSelect()
    cargarCiudad()
    /*loadDayForecastData();
    let boton_cargar = document.getElementById("loadinfo")
    boton_cargar.addEventListener("click",(event)=>{
        loadWeekForecastData();
    })*/
})
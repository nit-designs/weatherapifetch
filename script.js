var API_key ='1745acc9d7d2fc111e0007c92bb85899'

async function api(){
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    var parent_data_all = document.querySelector('.container    ');
    var row = null;
    for(let i of countries){
       
        try{
            if(!row || row.children.length === 3) {
                // create new row for every three columns
                row = document.createElement('div');    
                row.classList.add('row');
                parent_data_all.append(row);
            }
            
            // create a card for each country
            const col = document.createElement('div')
            col.classList.add('col-lg-4', 'col-sm-12')
            const card = document.createElement('div');
            card.classList.add('card');
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            //latlan
            lat = i.latlng[0];
                lng = i.latlng[1];
                console.log(lat,lng)               
                cardBody.setAttribute('lat',lat)
                cardBody.setAttribute('lng',lng)

            // countryname
            var countryName = document.createElement('h3')
            countryName.classList.add('card-title');
            countryName.innerText =i.name.common;
            countryName.style.backgroundColor ='Black'
            countryName.style.color='white'
            cardHeader.append(countryName)

            // flageimg
            var countryFlag = document.createElement('img')
            countryFlag.setAttribute('src',i.flags.png)
            cardBody.append(countryFlag)

            var capital = document.createElement('p')
            capital.innerText =`Capital: ${i.capital[0]}`;
            cardBody.append(capital)

            var region = document.createElement('p')
            region.innerText = `Region: ${i.region}`;
            cardBody.append(region)

            var countryCode = document.createElement('p')
            countryCode.innerText = `Country code: ${i.cca3}`;
            cardBody.append(countryCode);

            var button_weather = document.createElement('button')
            button_weather.classList.add("btn", "btn-primary")
            button_weather.setAttribute('onclick','weatherapi(this)')
            button_weather.innerText = "Click for Weather"
            cardBody.append(button_weather)

            card.append(cardHeader);
            card.append(cardBody);
            col.append(card);
            row.append(col);
        }
        catch(error){
            console.log(error)
        }
    }
}
api();


async function weatherapi(e) {
    var parent = e.parentElement;
    var lat = parent.getAttribute('lat');
    var lon = parent.getAttribute('lng');
    console.log(lat,lon)
    var weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
    try {
        
        const weatherElement = parent.querySelector(`p[lat="${lat}"][lng="${lon}"]`);
        if (weatherElement) {
            // Remove existing element
            weatherElement.remove();
        } else {
            // Create a new element
            const response = await fetch(weather_url);
            const data = await response.json();
            const newElement = document.createElement('p');
            newElement.setAttribute('lat', lat);
            newElement.setAttribute('lng', lon);
            newElement.innerText = `Weather: ${data.weather[0].description}`;
            parent.append(newElement);
        }
    } catch (error) {
        console.error(error);
    }
}

console.log('Emmanuyel');

// déclarer une constante avec notre clé d'API de open weather
// BIEN SÛR VOUS PRENEZ LA VOTRE !!!!!!!!!!!!
const apiKey = '44c80507eddb29a5ed08e2b8f7e33083';

function getWeather() {
    // on va récupérer les valeurs des inputs
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;

    // on va faire une requête ajax avec fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // dans une constante weather on va reconstruire un objet littéral avec les données de l'api
            // je veux comme propriété : description, icon, temperature, humidity, windSpeed, city, country
            const weather = {
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country
            };
            console.log('weather', weather);

            // on va appeler la fonction displayWeather en lui passant l'objet weather en paramètre
            displayWeather(weather);
        })
}

function displayWeather(weather) {
    console.log(weather);
    const resultDiv = document.getElementById('result');

    // créer une div avec la classe card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card mb-3';
    cardDiv.style.maxWidth = '540px';
    cardDiv.style.backgroundColor = '#E3E3E3';

    // créer une div avec la classe 'row'
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row g-0';

    // créer une div avec la classe 'col' pour l'image
    const colImgDiv = document.createElement('div');
    colImgDiv.className = 'col-md-4';

    // créer l'image
    const iconImg = document.createElement('img');
    iconImg.src = weather.icon;
    iconImg.alt = `icone météo : ${weather.description}`;
    iconImg.className = 'img-fluid rounded-start w-100';

    // créer une colonne pour le contenu de la carte
    const colContentDiv = document.createElement('div');
    colContentDiv.className = 'col-md-8';

    // créer le corps de la carte
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    // créer le titre de la carte
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${weather.city}, ${weather.country}`;

    // créer le paragraphe de la description du temps
    const descP = document.createElement('p');
    descP.className = 'card-text';
    descP.textContent = weather.description;

    // créer le paragraphe de la température
    const temP = document.createElement('p');
    temP.className = 'card-text';
    temP.textContent = `Température: ${weather.temperature}°C`;

    // créer le paragraphe de l'humidité
    const humidityP = document.createElement('p');
    humidityP.className = 'card-text';
    humidityP.textContent = `Humidité: ${weather.humidity}%`;

    // créer le paragraphe de la vitesse du vent
    const windSpeedP = document.createElement('p');
    windSpeedP.className = 'card-text';
    windSpeedP.textContent = `Vitesse du vent: ${weather.windSpeed}m/s`;

    // ajouter tous les éléments dans le DOM
    // on va ajouter l'image dans la colonne de l'image
    colImgDiv.appendChild(iconImg);

    // on va ajouter le titre, la description, la temp, l'humidité et le vent dans le corps de la card
    cardBodyDiv.append(cardTitle, descP, temP, humidityP, windSpeedP);
    // on va ajouter le corps de la card dans la colonne du contenu
    colContentDiv.appendChild(cardBodyDiv);
    // on va ajouter la colonne de l'image et la colonne du contenu dans la div row
    rowDiv.append(colImgDiv, colContentDiv);
    // on va ajouter la div row dans la div card
    cardDiv.appendChild(rowDiv);

    // on va ajouter la div card dans la div result
    resultDiv.innerHTML = '';
    resultDiv.appendChild(cardDiv);
}

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
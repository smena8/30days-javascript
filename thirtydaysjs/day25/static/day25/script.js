



window.addEventListener('load', (event) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const long = position.coords.longitude;
                const lat = position.coords.latitude;

                const api = `https:/api.weather.gov/points/${lat},${long}`

                fetch(api).then(response => {
                    return response.json();
                }).then(data => {

                    const { forecast, relativeLocation } = data.properties;

                    fetch(forecast).then(response => {
                        return response.json();
                    }).then(forecastData => {
                        changeHTML(relativeLocation, forecastData);
                    })
                })
            });

        }

});


function changeHTML(relativeLocation, forecastData) {

    const { city , state } = relativeLocation.properties
    const { temperature, shortForecast, detailedForecast, windSpeed, windDirection, icon } = forecastData.properties.periods[0];

    const location = document.querySelector('#location');
    location.textContent = `${city}, ${state}`;

    const todayDesc = document.querySelector('#today-desc');
    todayDesc.textContent = `${ shortForecast }`;

    const todayDetailed = document.querySelector('#today-detailed');
    todayDetailed.textContent = `${ detailedForecast }`;

    const wSpeed = document.querySelector('#wind-speed');
    wSpeed.textContent = `${ windSpeed }`;
    const wDirection = document.querySelector('#wind-direction');
    wDirection.textContent = `${ windDirection }`;

    const currentTemp = document.querySelector('#current-temp');
    currentTemp.textContent = `${ temperature }`;
    const tempNow = document.querySelector('#temp-now');
    tempNow.textContent = `${ temperature }`;

    const imgs = document.querySelectorAll('.weather-img');
    imgs.forEach(img => {
        img.src = icon;
    })
}
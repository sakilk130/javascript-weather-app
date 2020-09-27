window.addEventListener('load', () => {
  let longitude;
  let latitude;
  let tempDes = document.querySelector('.temp-des');
  let tempDeg = document.querySelector('.temp-deg');
  let locationName = document.querySelector('.location-name');
  let temp = document.querySelector('.temp');
  const tempSpan = document.querySelector('.temp span');
  let errorNo = document.querySelector('.notification');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
  function showPosition(pos) {
    longitude = pos.coords.longitude;
    latitude = pos.coords.latitude;
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { summary, temperature, icon } = data.currently;
        let celsius = (temperature - 32) * (5 / 9);
        tempDeg.textContent = Math.floor(celsius) + '°';
        tempDes.textContent = summary;
        locationName.textContent = data.timezone;
        setIcon(icon, document.querySelector('.icon'));

        temp.addEventListener('click', () => {
          if (tempSpan.textContent === 'C') {
            tempSpan.textContent = 'F';
            tempDeg.textContent = temperature + '°';
          } else {
            tempSpan.textContent = 'C';
            tempDeg.textContent = Math.floor(celsius) + '°';
          }
        });
      });
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorNo.textContent = 'User denied the request for Geolocation';
        break;
      case error.POSITION_UNAVAILABLE:
        errorNo.textContent = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorNo.textContent = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorNo.textContent = 'An unknown error occurred.';
        break;
    }
  }
  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: 'black' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

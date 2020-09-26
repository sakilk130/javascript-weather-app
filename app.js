window.addEventListener('load', () => {
  let longitude;
  let latitude;
  let tempDes = document.querySelector('.temp-des');
  let tempDeg = document.querySelector('.temp-deg');
  let locationName = document.querySelector('.location-name');
  let temp = document.querySelector('.temp');
  const tempSpan = document.querySelector('.temp span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
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
          tempDeg.textContent = Math.floor(celsius);
          tempDes.textContent = summary;
          locationName.textContent = data.timezone;
          setIcon(icon, document.querySelector('.icon'));

          temp.addEventListener('click', () => {
            if (tempSpan.textContent === 'C') {
              tempSpan.textContent = 'F';
              tempDeg.textContent = temperature;
            } else {
              tempSpan.textContent = 'C';
              tempDeg.textContent = Math.floor(celsius);
            }
          });
        });
    });
  }
  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: 'black' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

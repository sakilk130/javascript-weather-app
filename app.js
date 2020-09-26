window.addEventListener('load', () => {
  let longitude;
  let latitude;
  let tempDes = document.querySelector('.temp-des');
  let tempDeg = document.querySelector('.temp-deg');
  let locationName = document.querySelector('.location-name');

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
          const { summary, temperature } = data.currently;
          tempDeg.textContent = temperature;
          tempDes.textContent = summary;
          locationName.textContent = data.timezone;
        });
    });
  }
});

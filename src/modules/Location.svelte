<script>
    const getMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltbW9lIiwiYSI6ImNrNzNhem81ZjA4aWEzZnM1ZzJlcGo0YzIifQ.ydTMVEfBU_I_mXDxHwfY8Q'
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        zoom: 9 // starting zoom
    })

    let t = window.setTimeout(
        ()=> navigator.geolocation.getCurrentPosition(pos => {
        map.flyTo({
            center: [pos.coords.longitude,pos.coords.latitude],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
        })
        , 20)
}

  </script>

  <svelte:head>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.js" on:load={getMap}></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css" rel="stylesheet" />
  </svelte:head>

  <section id='map'>
  </section>
<script>
import { weather, location } from '../stores.js'
const key = '4c92609677c2fd4514e1b03c47ab1036'
const unsplash_key='W0KNq2vRXukBjVzXTTwOG1lyMSc9FqDS57fn3Socbi0'
const unsplash_secret = 'IzKu6lkQ8IOhXcD3NrXG5cGWm2edCDi3dZiCuT6jsN0'
let bg = ''

const getPhoto = () => {
    fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplash_key}&w=800&orientation=landscape&per_page=1&query=${encodeURI($weather.description + ' ' + $location.city)}`)
    .then(res=>res.json())
    .then( json => bg = json.results[0].urls.regular)
}

$: fetch(`https://api.openweathermap.org/data/2.5/weather?q=${$location.city}&appid=${key}`)
    .then(res  => res.json())
    .then(json => {
        $weather = json.weather[0]
        getPhoto()
    })
</script>

<section style="background-image:url('{bg}')">
    <div>
        <h1>Weather in {$location.city}</h1>
        <h5>{$weather.description}</h5>
    </div>
</section>




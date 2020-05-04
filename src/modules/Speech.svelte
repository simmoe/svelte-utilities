<script>
import { word, location } from '../stores'

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

let section
let confidence = ''
let cities = [
  {
    city: 'Paris',
    country_code:'fr'
  }, 
  {
    city: 'Berlin',
    country_code:'de'
  }, 
  {
    city: 'London',
    country_code:'gb'
  }, 
  {
    city:'Oslo',
    country_code:'no'
  }]

let rec = new SpeechRecognition();
rec.interimResults = false;
rec.lang = 'en-US'
rec.start()

rec.onresult = function(event) {
  $word = event.results[0][0].transcript
  listen = false
  cities.map( (c, i) => { 
    if(c.city == $word) {
      $location.city = $word
      $location.country_code = cities[i].country_code
    } 
  })
  section.style.backgroundColor = $word
  confidence =  event.results[0][0].confidence
}
let t 
let listen = true

rec.onspeechend = async () => {
  clearTimeout(t)
  await rec.stop()
  t = setTimeout(()=>{
    section.style.backgroundColor = 'white'
    rec.start()
    listen = true
  }, 4000)
}

</script>

<section bind:this={section} on:click={()=>rec.start()}>
  <div>
    {#if listen}
      <p>say something</p>
    {:else}
      <p>{$word}</p>
      <p>{ confidence && 'Confidence: ' + confidence }</p>
    {/if}
  </div>
</section>

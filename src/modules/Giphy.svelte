<script>
    import { apikeys } from '/Users/simo018/Documents/GitHub/00api_keys/apikeys.js'
    import { word } from '../stores'
    
    let bg = ''

    $: $word.length > 3 && fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikeys.giphy.api_key}&q=${$word}&limit=1`)
    .then(res  => res.json())
    .then(json => bg = json.data[0].images.downsized_medium.url)

</script>

<section style='background-image:url("{bg}")'>
    <!-- <input bind:value='{$word}' /> -->
</section>
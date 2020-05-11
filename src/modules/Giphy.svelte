<script>
    import { apikeys } from '/Users/simo018/Documents/GitHub/00api_keys/apikeys.js'
    import { word } from '../stores'
    
    let bg = ''
    const limit = 1

    $:   fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikeys.giphy.api_key}&q=${$word}&limit=${limit}`)
        .then(res  => res.json())
        .then(json =>
        {
            console.log(json)
             bg = json.data[0].images.downsized_medium.url
        })

</script>

{#if bg}
    <section style='background-image:url({bg})'></section>
{:else}
    <h2>fetching image</h2>
{/if}

<script>
    import { apikeys } from '/Users/simo018/Documents/GitHub/00api_keys/apikeys.js'
    import {word} from '../stores.js'
    let wordnik
    let info = ''
    $: {
        let firstWord = $word.split(' ')[0]
        if(firstWord.length > 2)
        fetch( `https://api.wordnik.com/v4/word.json/${firstWord}/definitions?limit=1&includeRelated=false&sourceDictionaries=webster&useCanonical=true&includeTags=false&api_key=${apikeys.wordnik.api_key}`)
        .then(res=>res.json())
        .then(json => {
            wordnik = json[0]
                if(json.error){
                    console.log(json)
                    info = json.error + ': ' + firstWord
                }else{
                    info = ''
                }
            })
    }
</script>

<section>
    {#if wordnik}
        <div>
            <h5>{wordnik.word}</h5>
            <p><i>{wordnik.text}</i></p>
            <p>{wordnik.attributionText}</p>
        </div>
    {:else}
        <div>    
            <h5>wordnik waiting for a word</h5>
            <p>{info}</p>
        </div>
    {/if}
</section>

<style>
div{
    padding:2rem;
}
</style>
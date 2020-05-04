<script>
import { word } from '../stores'

let soundsLike = []

$: $word.length > 2 && fetch(`http://api.datamuse.com/words?ml=${encodeURI($word)}&max=30`)
    .then(res  => res.json())
    .then(json => {
        soundsLike = json
    })
</script>

<section>
{#each soundsLike as item}
    <span on:click={ () => $word = item.word}>{item.word}</span>
{:else}
    <p>that means like...</p>
{/each}
</section>


<style>
section{
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding:4px;
    gap:1px;
    overflow: scroll;
}
section > span {
    cursor:pointer;
    display:grid;
    place-items:center;
    padding:.2rem;
    min-width:100%;
    height:100%;
    background:white;
}

</style>

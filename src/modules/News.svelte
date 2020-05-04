<script>
import { apikeys } from '/Users/simo018/Documents/GitHub/00api_keys/apikeys.js'
import { location } from '../stores.js'
let articles = []

$: fetch(`https://newsapi.org/v2/top-headlines?country=${$location.country_code}&apiKey=${apikeys.worldnews.api_key}`)
.then(res=>res.json())
.then(json=> articles = json.articles)
</script>

<section>
<div class="articles">
{#each articles as article}
    <div on:click={()=>window.open(article.url)} style='background-image:url("{article.urlToImage}")' class="article">
        <h5>{article.title}</h5>
    </div>
{:else}
    <h2>fetching...</h2>
{/each}
</div>
</section>

<style>
    .articles{
        display:grid;
        grid-auto-flow: column;
        gap:1rem;
        padding:1rem;
        width:100%;
        height:100%;
        overflow: scroll;
    }
    .article{
        display:grid;
        place-items:center;
        min-width:350px;
        height:100%;
        padding:1rem;
        background-color:white;
        cursor: pointer;
        background-size:cover;
        color:white;
        box-shadow: 0 0 8px 1px gray;
    }
</style>
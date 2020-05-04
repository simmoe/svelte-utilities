<script>
	import Time from './modules/Time.svelte'
	import Location from './modules/Location.svelte'
	import Weather from './modules/Weather.svelte'
	import Giphy from './modules/Giphy.svelte'
	import News from './modules/News.svelte'
	import Muse from './modules/Muse.svelte'
	import Words from './modules/Words.svelte'
	import Speech from './modules/Speech.svelte'
	import Camera from './modules/Camera.svelte'
	import Memo from './modules/Memo.svelte'

	import { word, location } from './stores'
</script>

<main>
	<h1>Utilities</h1>
	<!-- <input bind:value={$word} />  -->
	<div class="utils">
		<!-- <Time />
		<Location />
		<Weather />
		<News />
		<Giphy />
		<Speech />
		<Muse />
		<Words /> -->
		<Camera />
		<Memo />
	</div>
</main>

<style>
	:global(*){
		box-sizing:border-box;
	}
	main {
		text-align: center;
		padding: 1em;
	}

	:global(h1) {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.utils{
		margin-top:2rem;
		display:grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap:.8rem;
	}
	:global(section){
		position:relative;
		min-width:400px;
		height:300px;
		display:grid;
		place-items:center;
		background-color:#eee;
		background-size: cover;
		box-shadow: 0 0 8px 1px #aaa;
	}
</style>
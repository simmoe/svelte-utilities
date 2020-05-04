<script>
	import { time } from '../stores.js'

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<section>
    <h1>The time is {formatter.format($time)}</h1>
</section>
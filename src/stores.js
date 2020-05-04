import { readable, writable } from 'svelte/store'

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const weather = writable({})

export const location = writable({
	city:'Oslo',
	country_code:'no',
})

export const word = writable('summer')
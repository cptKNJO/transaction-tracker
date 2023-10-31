<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = `-1200 tofu land yesterday\n+5000 value`;

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		const newValue = formData.get('new-transaction');

		if (typeof newValue === 'string') {
			value = newValue;

			dispatch('new-transaction', newValue);
		}
	}
</script>

<form action="" on:submit={handleSubmit}>
	<textarea
		name="new-transaction"
		id="new-transaction"
		placeholder="Enter your transactions e.g. -1200 tofu land yesterday"
		rows="4"
		bind:value
	/>
	<button class="button--primary" type="submit">Enter Transaction</button>
</form>

<style>
	form {
		display: flex;
		gap: var(--size-2);
	}

	textarea {
		width: 100%;
		padding: var(--size-2);
		background-color: white;
		border: 1px solid var(--gray-5);
	}
</style>

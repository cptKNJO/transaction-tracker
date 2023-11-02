<script lang="ts">
	import * as chrono from 'chrono-node';

	import TransactionForm from '$lib/components/TransactionForm.svelte';
	import { formatDate } from '$lib/utils/formatter';
	import { localStore } from '$lib/stores/localStorage';

	const entries = localStore('transactions', []);

	// Parse entry from newTransactionValue
	function getParsedEntry(transaction: string) {
		const cleanString = transaction.trim();

		const parsedTime = chrono.parse(cleanString, undefined, {
			forwardDate: false
		});

		let datelessText = cleanString;
		let date = new Date();

		if (parsedTime.length) {
			const { text, start } = parsedTime[0];

			const startDate = start.date();
			date = startDate;

			datelessText = cleanString.replace(text, '');
		}

		const details = getDetails(datelessText);

		const values = {
			id: crypto.randomUUID(),
			...details,
			date
		};

		return values;
	}

	function getDetails(text: string) {
		const pattern = /^(?<flow>[\+|-]?)(?<value>[\d]+) (?<note>.+)/;
		const match =
			pattern.exec(text)?.groups ??
			({} as {
				flow?: '+' | '-';
				value?: string;
				note?: string;
			});

		const balance = `${match?.flow || '+'}${match.value ?? 0}`;

		return {
			balance,
			note: match?.note ?? ''
		};
	}

	function addTransaction(event) {
		const lines = event.detail.split('\n') as Array<string>;

		const parsedLines = lines.map((l) => {
			const parsed = getParsedEntry(l);
			return parsed;
		});

		// Add to localStorage
		entries.update(parsedLines);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Transaction Tracker</h1>

	<div class="parser">
		<table class="transaction-table">
			<thead>
				<tr>
					<th data-col="date">Date</th>
					<th data-col="balance">Balance</th>
					<th>Note</th>
				</tr>
			</thead>
			<tbody>
				{#each $entries as entry}
					<tr>
						<td data-col="date">{formatDate(entry.date)}</td>
						<td data-col="balance">{entry.balance}</td>
						<td>{entry.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div>
		<TransactionForm on:new-transaction={addTransaction} />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	div {
		width: 100%;
		margin-block-start: auto;
	}

	.parser {
		padding-block: var(--size-4);
		flex: 1;
	}

	.transaction-table {
		width: 100%;
	}
	.transaction-table th {
		color: var(--blue-11);
	}

	.transaction-table th {
		background-color: var(--blue-1);
	}

	.transaction-table td,
	.transaction-table th {
		text-align: left;
		padding-inline: var(--size-3);
	}

	.transaction-table [data-col='date'],
	.transaction-table [data-col='balance'] {
		width: max-content;
		white-space: nowrap;
	}
</style>

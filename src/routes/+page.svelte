<script lang="ts">
	import * as chrono from 'chrono-node';

	import TransactionForm from '$lib/components/TransactionForm.svelte';
	import { formatDate } from '$lib/utils/formatter';

	// Parse entry from newTransactionValue
	function getParsedEntry(transaction: string) {
		const cleanString = transaction.trim();

		const parsedTime = chrono.parse(cleanString);

		let datelessText = cleanString;
		let date = formatDate(new Date());

		if (parsedTime.length) {
			const { text, start } = parsedTime[0];

			const startDate = start.date();
			date = formatDate(startDate);

			datelessText = cleanString.replace(text, '');
		}

		const details = getDetails(datelessText);

		const values = {
			...details,
			date
		};

		return values;
	}

	function getDetails(text: string) {
		const pattern = /^(?<flow>[\+|-])(?<value>[\d]+) (?<note>.+)/;
		const match =
			pattern.exec(text)?.groups ??
			({} as {
				flow?: '+' | '-';
				value?: string;
				note?: string;
			});

		const balance = `${match?.flow ?? '+'}${match.value ?? 0}`;

		return {
			balance,
			note: match?.note ?? ''
		};
	}

	let parsedEntry: Array<ReturnType<typeof getParsedEntry>> = [];

	function addTransaction(event) {
		console.log(event.detail);
		const lines = event.detail.split('\n') as Array<string>;
		console.log(lines);

		const parsedLines = lines.map((l) => {
			const parsed = getParsedEntry(l);
			console.log(parsed);
			return parsed;
		});

		console.log(parsedLines);

		parsedEntry = parsedLines;
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
				{#each parsedEntry as entry}
					<tr>
						<td data-col="date">{entry.date}</td>
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

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Transaction = {
	id: string;
	balance: string;
	note: string;
	date: Date;
};

// TODO: Rename to transactionStore because this only handles arrays and sorts by date
// i.e. is specific to transactions
export function localStore(key: string, initial: Array<Transaction>) {
	let saved = initial;

	if (browser) {
		// receives the key of the local storage and an initial value
		if (localStorage.getItem(key) === null) {
			// item not present in local storage
			localStorage.setItem(key, toString(initial)); // initialize local storage with initial value
		}

		saved = toObj(localStorage.getItem(key) as string) as Array<Transaction>; // convert to object
	}

	const { subscribe, set } = writable(saved); // create the underlying writable store

	return {
		subscribe,
		set: (value: Transaction[]) => {
			if (browser) {
				localStorage.setItem(key, toString(value)); // save also to local storage as a string
				return set(value);
			}
		},
		update: (newEntries: Transaction[]) => {
			if (browser) {
				const originalValue = toObj(localStorage.getItem(key) as string) as Array<
					Record<string, string>
				>;
				const newValue = [...newEntries, ...originalValue];
				// Map dates to Date type instead of string
				const mappedValue = newValue.map((a) => ({
					...a,
					date: new Date(a.date)
				})) as Transaction[];

				const sortedValue = mappedValue.sort((a, b) => b.date.getTime() - a.date.getTime());

				localStorage.setItem(key, toString(sortedValue)); // save also to local storage as a string
				set(sortedValue);
			}
		}
	};
}

// TODO: These two functions can be moved under json.ts?
function toString(value: unknown) {
	return JSON.stringify(value, null, 2);
}

/**
 * Coverts back to object or array from string
 */
function toObj(value: string): unknown {
	return JSON.parse(value);
}

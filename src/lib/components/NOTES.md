## Tagline

Easily save transactions as text, parsed with date and cost and export to CSV.

## User flow

- enter transaction as a list of text
  e.g:

```
-1200 tofu land yesterday
```

can be broken into:

1. -1200: negative transaction
2. tofu land: note
3. yesterday: time; if no end time, assume today

Another format:

```
yesterday
-1200 tofu land
+200 cabbage babbage (sold cabbages)
```

Where the date is the heading. If the line starts with "-" or "+", then we assume it's a transaction.

## Tech

- simple offline PWA that syncs to google sheets? Last write wins!

## Tasks

- [ ] Build a textarea that takes input and parses based on regex

# EpiSync Demonstration

## Setup

### Prerequisites

1. Node development laptop (Mac with homebrew is known to work, but other Linux toolchains should work)
2. Node 18  LTS
3. PNPM Package Manager (brew install pnpm)
4. Git Client

### 1. Clone Repo

Clone the repo where you want

```sh
git clone https://github.com/CDCgov/EpiSync.git 
cd episync
```

### 2. Install

```sh
pnpm install
```

### 3. Run

```sh
pnpm demo
```

## A Demo Script

1. Home page
   1. Explain the demo contains two states which publish EpiSync feeds
   2. CDC merges the state feeds and publishes another feed
2. Navigate into California
   1. Explain this is a simple state system
   2. Add 1 case
   3. Add 20 cases
   4. Explain the table and what is collected
   5. Publish the cases
3. Look at the feed
   1. Navigate to the CA feed
   2. Point out time_series, aggregates, data_dictionary folders
   3. Point out the summary file
4. Navigate to CDC
   1. Read subscriptions
   2. Scroll to notice that CA and AZ data are in the tables
5. Talk about data corrections
   1. Nav to CA
   2. Look for duplicate entries
   3. Talk about how duplicates are a common data problem
   4. Press the deduplicate problem
   5. Publish again
6. See the corrections in CDC
   1. Nav to CDC again
   2. Read subscriptions again
   3. Notice that the duplicate CA cases are now gone
   4. Speak about consistency and easy handling of corrections from EpiSync
7. Show a schema change
   1. Nav to CA gain
   2. Change the schema
   3. Add a few more cases
   4. Publish again
8. Show how EpiSync handles it
   1. Back to CDC
   2. Read subscriptions
   3. Notice new cases have new fields that are automatically transmitted.

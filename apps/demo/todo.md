# TODO list

## Beginning

* [x] Demo website
* [x] State page
* [x] Publish a timeseries
* [x] Publish a log
* [x] Define bucket, schema, element, schema for StateCases
* [x] Timeseries read interface (id, at, lastModifiedAt, enumerate elements)
* [x] Schema publishing (enumerate elements), define Member interface
* [x] /statecases/schema route & read in State table
* [x] Start CDCCase (model, cdcCaseTimeSeries, cdccases route)
* [x] Define /cdccase/subscriber { lastCheckedAt: , automatic: true }
* [x] Read schema from feed (readSchema)
* [x] readTimeSeries, readCDCfeed
* [x] automatic receive
* [x] CDC page (table and refresh)
* [x] Change algorithm to only change at the first of the month or day. Elminate delete of object. Make large add start on the month.
* [x] Update state to last published
* [x] Update cdc to show when stuff is being read and last read.
* [x] Versioned buckets, publish snapshots, use snapshots consistent reads
* [x] Change schemas dialog in state. Options for new CDC data element, a new other state element and local element
* [x] Aggregates published
* [x] Auto read button
* [x] Random duplicates. Deduplicate button and method. replaceBy column. Deleted log.
* [x] Feed file explorer
* [x] Reorganize code around domains (website and service). Service sub-domains (senders, receivers, watchers, feeds, core, server, utils) and CUPID
* [x] State and CDC tables are TimeSeriesEvents
* [x] Schema improvements; namespaces;

* [x] Add subject, reporter, and topic to all events.
* [x] Make descriptions have a language culture. Add sections to feed elements
* [x] Multiple feeds per bucket. Change bucket name.
* [x] FeedSummary published. Provenance and Notes. Reader always looks at the snapshot.
* [x] Replace with Mongo to allow new schemas

## Merged feed

* [x] Merge dictionaries when multiple imports.
* [x] Multiple subjects per feed summary. Declare system used. Complete subject reporter. Remove subject from feed.
* [x] Turn on AZ. Initial data in both feeds. AZ feed published.
* [x] Merge summaries for the merged feed.
* [x] Add pulishing of the CDC feed. Update UI.
* [x] Update UI picture. Allow people to see AZ.
* [ ] Support EpiSync name and column name? Allows people to define feeds with old names.
* [ ] Define epiCast id as eventId + eventReporter?

## GitHub WebSite

* [ ] Make a CDC.GOV github website
* [ ] Add styling
* [ ] Make a MD document that

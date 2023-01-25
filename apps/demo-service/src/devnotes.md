# Developer Notes

## Organization

Generally, keep related code together following something advocated by the CUPID movement.

The basics stack is:

* server - the express server shell of the service. The server delegates to features.
* features - the top-level breakdown of the demonstration service
* epicast - a generic library implementing the EpiCast protocol. Independent of data elements. Used by the higher-level features.
* collection - low-level collection extensions

## Idomatic

Use ts-standard to write idomatic typescript

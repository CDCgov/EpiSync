# EpiSync

## EpiSync is

1. A pilot project conducted by the CDC’s Division of Health Informatics and Surveillance
2. A new table-based approach for public health programs to share case information with CDC, each other, and the public.
3. A sync protocol, a reference implementation, and a coordinating service
4. A follow-up project to the earlier Case Surveillance Discover sprint that the CDC/USDS conducted to improve the National Notifiable Disease Surveillance System.
5. Part of CDC’s Data Modernization Initiative that takes advantage of the infrastructure provided by modern cloud computing vendors.

## EpiSync’s Approach

* **Tables instead of Messages** - EpiSync transmits its information using tables instead of breaking up tables into messages. In addition to tables for the raw data, EpiSync provides context information such as data dictionaries.
* **Publish and Subscribe** - Instead of point-to-point transmission, EpiSync uses a publish and subscribe model.
* **Consistent** - EpiSync keeps the aggregate counts of publishers and subscribers in sync.
* **Specific & Generalizable** - EpiSync works very well for case data but is also general enough to support other data sets.
* **Scalable** - Support pandemic scale. From 1 to 1M data items per month.
* **Sustainable** - Standardized, open-source reference implementations, free tooling, and services.
* **Secure** - Support both public and private feeds.

## Notices

Please read these details on policy, license, and disclaimer.

* [General Notices](NOTICES.md)
* [License](LICENSE)
* [Disclaimers](DISCLAIMER.md)

## Getting Started

* For the curious, please look at
  * EpiSync generic presentation (TBD)
* For demonstrators, please look at
  * Cloning and running the demo instruction
  * Sample demo stript (TBD)
* For contributors, please read
  * Contribution statements [here](CONTRIBUTING.md)
  * Project organization (TBD)
* For project members, please read
  * How we work (TBD)

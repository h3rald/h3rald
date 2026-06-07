-----
id: conver
home: /conver/
title: "Convergent Versioning"
subtitle: "A versioning system for dependable projects."
summary: "An alternative approach to versioning projects that aim to achieve eventual stability, maturity, and completeness."
content-type: project
active: true
version: 380-F
-----

The current version of this document is **v380-F**.

### Summary

Given a project that aims to achieve the highest level of feature-completeness, maturity, and stability (collectively identified as _dependability_), its releases should be expressed using a single integer number of two bytes expressed in hexadecimal notation, conveying:
- its dependability score, expressed as a value between 0x000 and 0xFFF (first three digits).
- metadata expressing the size of the changes delivered, and if the release breaks compatibility and/or includes new enhancements, encoded in the last digit.

Based on its dependability score, a project should be immediately classifiable as belonging to one of the following stages: _prototype_, _operational_, _consolidated_, and _bedrock_. Each stage is meant to progressively restrict the type of changes introduced in each release. 

As an example, the version number `0x9B04` immediately conveys that the project is in its _consolidated_ state (very dependable) and the version introduced changes to up to 25% of its content, with no breaking changes and no new enhancements. Because of its stage, following releases will never include breaking changes or affect more than 25% of its content, but may include new enhancements.

### Motivation

Traditional software versioning systems like [SemVer](https://semver.org) typically emphasize what changed in a given release and whether it constituted a breaking change, new functionality, or bug fix. 

While this typically helps &mdash; if properly enforced &mdash; to solve very practical problems related to a project,  like how to manage dependencies and how to classify the type of changes delivered, it doesn't necessarily convey the level of completeness, maturity, or stability of such project. If a version is 2.3.7, is the project going to remain _stable_ from a version to the next? Or are there going to be major versions released that will introduce breaking changes?

While semantic versioning and traditional versioning systems are very useful to understand at a glance the entity of a change from a version to the next, they do not provide any indication on whether a project is going to keep changing or essentially try to remain the same.

### Prior Art

There are at least two or three versioning systems that emphasize the importance of converging to a _stable state_ in which a project can be considered _complete_. Of course, such convergence would never actually happen in practice, but it may be approximated sufficiently enough so that a project could be considered _highly dependable_, or even a [bedrock platform](https://permacomputing.net/bedrock_platform/).

#### KelVer

Kelvin Versioning, or _KelVer_ is a versioning system designed to converge to zero:

>  In Kelvin versioning, releases count down by integer degrees Kelvin. At absolute zero, the system can no longer be changed. At 1K, one more modification is possible. And so on.

&mdash; from <cite><a href="https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html?m=1" target="_blank">Urbit: functional programming from scratch</a></cite>

While KelVer does emphasize the importance of projects striving for ultimate completeness, maturity, and stability, it does it in a non-standardized way: there is no way to know whether project A at 50K is more mature/complete than project B at 20K, because the values (and in particular the starting value) are chosen arbitrarily by the author of each project. There are no objective guarantees of stability of any sort.

Also, a decreasing version number could potentially be problematic in some situations.

#### πVer and eVer 

πVer and eVer are two other examples of convergent versioning. These systems are used by TeX and METAFONT, respectively:

> The current version number for is 3.1, and for METAFONT it is 2.7. If corrections are necessary, the next versions of TeX will be 3.14, then 3.141, then 3.1415, …, converging to the ratio of a circle's circumference to its diameter; for METAFONT the sequence will be 2.71, 2.718, …, converging to the base of natural logarithms.

&mdash; from <cite><a href="https://tug.org/TUGboat/Articles/tb11-4/tb30knut.pdf" target="_blank">The Future of TeX and METAFONT</a></cite>

Here we are dealing with two pieces of software that are extremely mature and are not likely to change anytime soon, except for the occasional bug fix. While adding digits to your version is one way to express convergence, it becomes less practical for software that are not yet fully stabilized in their lifecycle. Also, such a number does not convey anything in particular except that its lifecycle is stable but at the same time never-ending.

### Specification

This section contains the formal specification of the Convergent Versioning system, (_ConVer_).

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this section are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

#### Canonical Format

ConVer releases SHOULD be expressed using a single, two-byte value written in hexadecimal notation. Alternative representations MAY be used as described later on in this document, although the Canonical Format is RECOMMENDED.

Such value MAY be formatted using one of the following notations:

- four hexadecimal digits OPTIONALLY prepended by `0x` or `$`.
- "v", followed by three hexadecimal digits, followed by "-", followed by one hexadecimal digit.

For example, the following notations are equivalent:

- 13BF
- 0x13BF
- $13BF
- v13B-F

Logically, each version number SHALL be intended as comprised of:

- a dependability score (first three digits)
- version metadata (last digit)

#### Dependability Score

The first three digits of a version SHALL identify its _dependability score_, or, in other words, how feature-complete, mature and stable a project is on a scale from 0x000 to 0xFFF. The initial dependability score is set by the maintainer of the project based on their best evaluation of is _dependability stage_ (see the dedicated section, further on), from _prototype_ to _bedrock_. 

After the initial score, subsequent versions MUST increase the score based on how closer the project is getting to its ultimate level of dependability, in terms of completeness, maturity, and stability. Subsequent versions MAY therefore skip numbers if the newer versions brings the project closer to its final state. 

While increasing the dependability score of a project is essentially an arbitrary process, it forces maintainers to constantly keep track of their progress and how closer they are to entering the next dependability stage, and the corresponding restrictions.

#### Version Metadata

The last hexadecimal digit of a version number (henceforth called "metadata nibble") SHALL encode metadata characterizing the release based on three distinct traits:

- Size
- Compatibility
- Purpose

##### Size

Size identifies the amount of changes compared to the total size of the project. Each value of the metadata nibble expresses a possible size among the following:

- S (0-3) &mdash; Up to 5% of the project content was changed. 
- M (4-7) &mdash; Up to 25% of the project content was changed.
- L (8-B) &mdash; Up to 50% of the project content was changed.
- X (C-F) &mdash; Up to 100% of the project content was changed.

#### Compatibility

Compatibility identifies whether the version breaks compatibility with previous versions or not. Alternate pairs of the metadata nibble express this:

- Preserving (0-1, 4-5, 8-9, C-D)
- Breaking (2-3, 6-7, A-B, E-F)

#### Purpose

Purpose identifies whether the release introduces new features/enhancements or focuses purely on maintenance and bug fixing.

- Odd values of the metadata nibble mean that the release includes some new feature or enhancement.
- Even values of the metadata nibble mean that the release focuses only maintenance work, performance, reliability improvements, and bug fixing.

#### Summary

| Value | Size | Compatibility | Purpose |
|:--|:--|:--|:--|
| F | X | Breaking | Enhancement |
| E | X | Breaking | Maintenance |
| D | X | Preserving | Enhancement |
| C | X | Preserving | Maintenance |
| B | L | Breaking | Enhancement |
| A | L | Breaking | Maintenance |
| 9 | L | Preserving | Enhancement |
| 8 | L | Preserving | Maintenance |
| 7 | M | Breaking | Enhancement |
| 6 | M | Breaking | Maintenance |
| 5 | M | Preserving | Enhancement |
| 4 | M | Preserving | Maintenance |
| 3 | S | Breaking | Enhancement |
| 2 | S | Breaking | Maintenance |
| 1 | S | Preserving | Enhancement |
| 0 | S | Preserving | Maintenance |

#### Dependability Stages

Projects that follow Convergent Versioning SHALL aim to achieve the highest level of dependability in terms of completeness, maturity, and stability. This is achieved by partitioning the available versioning units into four _dependability stages_.

Depending on the stage a project is currently in, certain metadata values SHALL be explicitly forbidden. For example, any release that is part of the _consolidated_ stage MUST NOT include breaking changes. 

The following sections describe the characteristics and restrictions of each stage more in detail.

##### Prototype (000-400)

Projects in this stage are typically highly unstable, immature, and/or incomplete. As a result, releases within this stage:

- MAY be of any size.
- MAY include breaking changes.
- MAY include new enhancements.

##### Operational (401-800)

Projects in this stage are typically usable in production, although they MAY still improve substantially in terms of completeness, maturity, and stability. As a result, releases within this stage:

- MAY be or size S, M, or L, but not X.
- MAY include breaking changes.
- MAY include new enhancements.

##### Consolidated (801-C00)

Projects in this stage are typically regarded as reasonably complete, mature and/or stable, although they may still improve to achieve a higher degree of dependability. As a result, releases within this stage:

- MAY be of size S or M, but not L or X.
- MUST NOT include breaking changes.
- MAY include new enhancements.

##### Bedrock (C01-1000)

Projects in this stage are typically regarded as complete, mature, and/or stable. As a result, releases within this stage:

- MAY be of size S but not M, L, or X.
- MUST NOT include breaking changes.
- MUST NOT include new enhancements.

Note that a score of 1000 MAY NOT be represented by Convergent Versioning, as it MAY NOT be reached.

#### Dependency Management

Assuming that two projects "A" and "B" both follow Convergent Versioning, if "B" depends on "A", then:

- The dependability score of "A" MUST be higher than the one of "B".
- "B" MUST be compatible exactly with a specific version of "A", unless "A" is in _consolidated_ or _bedrock_ stage, in which case "B" MAY be compatible with any version of "A" with a score of 801 or higher (and therefore at least in _consolidated_ stage).

#### Alternative Decimal Format

In cases when a the canonical format is deemed inconvenient or too cryptic for end users, an alternative decimal format MAY be used. 
In this case, a ConVer release MUST be formatted as follows:

"v" followed by the conversion of the dependability score into exactly four decimal digits, followed by "-", followed by metadata expressed via three-letters.

- The first letter of the metadata identifies the size, and MUST be one of: S, M, L, or X.
- The second letter identifies the compatibility, and MUST be either B (breaking) or P (preserving).
- The third letter identifies the purpose, and MUST be either E (enhancement) or M (maintenance).

For example, **v13B-F** MAY be represented as **v0315-XBE**.

#### Converting a ConVer release to SemVer

In situations where a SemVer like version is expected, such as in formats used by package managers and similar, a ConVer release MAY be converted into the corresponding SemVer-compliant release provides that the entire history project releases is known. 

To determine the exact SemVer version number of a ConVer project, do the following:
- Count the number of _breaking_ releases; that SHALL be your major version number, unless the project is in _prototype_ stage, in which case the major version SHALL be set to 0.
- Count the number of _enhancement_ releases after the last _breaking_ release (if any, or all if none); that SHALL be your minor version.
- Count the number of _maintenance_ releases after the last _enhancement_ release (if any, or all if none); that SHALL be your patch version.

### About

This specification for Convergent Versioning (ConVer) was originally authored by Fabio Cevasco on 2026-06-07.

### License

[Creative Commons &mdash; CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
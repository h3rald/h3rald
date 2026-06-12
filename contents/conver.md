-----
id: conver
home: /conver/
title: "Convergent Versioning"
subtitle: "A versioning system for dependable projects."
summary: "An alternative approach to versioning projects that aim to achieve eventual stability, maturity, and completeness."
content-type: project
active: true
version: 450-B
version-badge: 450--B
release-color: yellow
license: CC--BY--4.0
sourcehut: conver
changelog: true
-----

The current version of this document is **v450-B**.

### Summary

Given a project that aims to achieve the highest level of feature-completeness, maturity, and stability (collectively identified as _dependability_), its releases should be expressed using a single integer number of two bytes in hexadecimal notation, conveying:
- its dependability score, expressed as a value between 0x000 and 0xFFF (first three digits).
- metadata expressing the expected upgrade impact, if the release breaks compatibility, and/or includes new enhancements (last digit).

Based on its dependability score, a project should be immediately classifiable as belonging to one of the following stages: 

- _prototype_
- _operational_
- _consolidated_
- _bedrock_

Each stage is meant to progressively restrict the type of changes introduced in subsequent releases. 

As an example, the version number `0x9B04` immediately conveys that the project is in its _consolidated_ state (very dependable) and the version is expected to have medium upgrade impact, with no breaking changes and no new enhancements. Because of its stage, subsequent releases will never include breaking changes or have more than medium-level upgrade impact, but may include new enhancements.

### Motivation

Traditional software versioning systems like [SemVer](https://semver.org) typically emphasize what changed in a given release and whether it constituted a breaking change, new functionality, or bug fix. 

While this typically helps &mdash; if properly enforced &mdash; to solve very practical problems related to a project,  like how to manage dependencies and how to classify the type of changes delivered, it doesn't necessarily convey the level of completeness, maturity, or stability of such project. If a version is 2.3.7, is the project going to remain _stable_ from a version to the next? Or are there going to be major versions released that will introduce breaking changes?

Also, semantic versioning formalizes the concept of _branching_ versions, so even if version 2.0.0 is released, there could be fixes released for prior major and minor versions, like 1.4.7 or 1.6.12. While this is useful for certain categories of projects, it starts to lose meaning (and unnecessarily complicated things) once a project reaches a certain stage of completeness.

While semantic versioning and traditional versioning systems are very useful to understand at a glance the entity of a change from a version to the next, they do not provide any indication on whether a project is going to keep changing or essentially try to remain the same.

### Prior Art

There are at least a couple versioning systems/conventions that emphasize the importance of converging to a _stable state_ in which a project can be considered _complete_. Of course, such convergence would never actually happen in practice, but it may be approximated sufficiently enough so that a project could be considered _highly dependable_, or even a [bedrock platform](https://permacomputing.net/bedrock_platform/).

#### KelVer

Kelvin Versioning, or _KelVer_ is a versioning system designed to converge to zero:

>  In Kelvin versioning, releases count down by integer degrees Kelvin. At absolute zero, the system can no longer be changed. At 1K, one more modification is possible. And so on.

&mdash; from <cite><a href="https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html?m=1" target="_blank">Urbit: functional programming from scratch</a></cite>

While KelVer does emphasize the importance of projects striving for ultimate completeness, maturity, and stability, it does it in a non-standardized way: there is no way to know whether project A at 50K is more mature/complete than project B at 20K, because the values (and in particular the starting value) are chosen arbitrarily by the author of each project. There are no objective guarantees of stability of any sort linked to those values.

Also, a decreasing version number could potentially be problematic in some situations, and also counter-intuitive.

#### πVer and eVer 

πVer and eVer are two other examples of convergent versioning. These systems are used by TeX and METAFONT, respectively:

> The current version number for is 3.1, and for METAFONT it is 2.7. If corrections are necessary, the next versions of TeX will be 3.14, then 3.141, then 3.1415, …, converging to the ratio of a circle's circumference to its diameter; for METAFONT the sequence will be 2.71, 2.718, …, converging to the base of natural logarithms.

&mdash; from <cite><a href="https://tug.org/TUGboat/Articles/tb11-4/tb30knut.pdf" target="_blank">The Future of TeX and METAFONT</a></cite>

Here we are dealing with two pieces of software that are extremely mature and are not likely to change anytime soon, except for the occasional bug fix. While adding digits to your version is one way to express convergence, it becomes less practical for software that are not yet fully stabilized in their lifecycle. Also, such a number does not convey anything in particular except that its lifecycle is stable but at the same time never-ending.

### Specification

This section contains the formal specification of the Convergent Versioning system, (_ConVer_).

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this section are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

#### Canonical Format

ConVer releases SHOULD be expressed using a single, two-byte value written in hexadecimal notation. An alternative, more user-friendly representation MAY also be used as described later on in this document, although the Canonical Format is RECOMMENDED.

Such value MAY be formatted using one of the following notations:

- four hexadecimal digits OPTIONALLY prepended by `0x` or `$`.
- "v", followed by three hexadecimal digits, followed by "-", followed by one hexadecimal digit.

For example, the following notations are equivalent:

- 13BF &mdash; RECOMMENDED for authoritative storage and package managers.
- 0x13BF &mdash; RECOMMENDED for programmatic usage in programming languages that support this notation to represent hexadecimal numbers.
- $13BF &mdash; RECOMMENDED for programmatic usage in programming languages that support this notation to represent hexadecimal numbers.
- v13B-F &mdash; RECOMMENDED for improved readability in labels, titles, and changelogs.

Logically, each version number SHALL be intended as comprised of:

- a dependability score (first three digits)
- version metadata (last digit)

#### Dependability Score

The first three digits of a version SHALL identify its _dependability score_, or, in other words, how feature-complete, mature and stable a project is on a scale from 0x000 to 0xFFF. The initial dependability score is set by the maintainer of the project based on their best evaluation of is _dependability stage_ (see the dedicated section, further on), from _prototype_ to _bedrock_, as described later on in this document.

After the initial score, subsequent versions MUST increase the score based on how closer the project is getting to its ultimate level of dependability, in terms of completeness, maturity, and stability. Subsequent versions MAY therefore skip numbers if the newer versions brings the project closer to its final state. 

Note that there MAY NOT be two releases with an identical dependability score.

While increasing the dependability score of a project is essentially an arbitrary process, it forces maintainers to constantly keep track of their progress and how closer they are to entering the next dependability stage, and the corresponding restrictions.

#### Version Metadata

The last hexadecimal digit of a version number (henceforth called "metadata nibble") SHALL encode metadata characterizing the release based on three distinct dimensions:

- Impact
- Compatibility
- Purpose

##### Impact

Impact identifies the expected upgrade impact of the new release. Each value of the metadata nibble expresses a possible impact level among the following:

- L (0-3) &mdash; Low impact.
- M (4-7) &mdash; Medium impact.
- H (8-B) &mdash; High impact.
- C (C-F) &mdash; Critical impact.

Note that the level of impact does not necessarily imply a breaking change, it may also mean that if there were no breaking changes, a release may have a low to critical impact in order to fully take advantage of a new enhancement introduced or a new correction, such as a performance improvement.

#### Compatibility

Compatibility identifies whether the version breaks compatibility with previous versions or not. Alternate pairs of the metadata nibble express this:

- Preserving (0-1, 4-5, 8-9, C-D)
- Breaking (2-3, 6-7, A-B, E-F)

#### Purpose

Purpose identifies whether the release introduces new features/enhancements or focuses purely on maintenance and bug fixing.

- Odd values of the metadata nibble mean that the release includes some new feature or enhancement.
- Even values of the metadata nibble mean that the release focuses only maintenance work, performance, reliability improvements, and bug fixing.

#### Summary

| Value | Impact | Compatibility | Purpose |
|:--|:--|:--|:--|
| F | C | Breaking | Enhancement |
| E | C | Breaking | Maintenance |
| D | C | Preserving | Enhancement |
| C | C | Preserving | Maintenance |
| B | H | Breaking | Enhancement |
| A | H | Breaking | Maintenance |
| 9 | H | Preserving | Enhancement |
| 8 | H | Preserving | Maintenance |
| 7 | M | Breaking | Enhancement |
| 6 | M | Breaking | Maintenance |
| 5 | M | Preserving | Enhancement |
| 4 | M | Preserving | Maintenance |
| 3 | L | Breaking | Enhancement |
| 2 | L | Breaking | Maintenance |
| 1 | L | Preserving | Enhancement |
| 0 | L | Preserving | Maintenance |

#### Dependability Stages

Projects that follow Convergent Versioning SHALL aim to achieve the highest level of dependability in terms of completeness, maturity, and stability. This is achieved by partitioning the available versioning units into four _dependability stages_.

Depending on the stage a project is currently in, certain metadata values SHALL be explicitly forbidden. For example, releases of a project that reached _consolidated_ stage MUST NOT include breaking changes. 

The following sections describe the characteristics and restrictions of each stage more in detail.

##### Prototype (000-400)

Projects in this stage are typically highly unstable, immature, and/or incomplete. As a result, releases within this stage:

- MAY have any impact.
- MAY include breaking changes.
- MAY include new enhancements.

##### Operational (401-800)

Projects in this stage are typically usable in production, although they MAY still improve substantially in terms of completeness, maturity, and stability. As a result, releases within this stage:

- MAY have a L, M, H impact, but not C.
- MAY include breaking changes.
- MAY include new enhancements.

##### Consolidated (801-C00)

Projects in this stage are typically regarded as reasonably complete, mature and/or stable, although they may still improve to achieve a higher degree of dependability. As a result, releases within this stage:

- MAY have a L or M impact, but not H or C.
- MUST NOT include breaking changes.
- MAY include new enhancements.

##### Bedrock (C01-1000)

Projects in this stage are typically regarded as complete, mature, and/or stable. As a result, releases within this stage:

- MAY only have a S impact, not M, L, or C.
- MUST NOT include breaking changes.
- MUST NOT include new enhancements.

Note that a score of 1000 MAY NOT be represented by Convergent Versioning, as it MAY NOT be reached.

#### Dependency Management

Assuming that two projects "A" and "B" both follow Convergent Versioning, if "B" depends on "A", then "B" MUST be compatible exactly with one or more specific versions of "A", unless "A" is in _consolidated_ or _bedrock_ stage, in which case "B" MAY be compatible with a specific version of "A" and all subsequent versions of it, since the project cannot break compatibility once it enters _consolidated_ stage.

#### Alternative Decimal Format

In cases when a the canonical format is deemed inconvenient or too cryptic for end users, an alternative decimal format MAY be used. 
In this case, a ConVer release MUST be formatted as follows:

"v" followed by the conversion of the dependability score into exactly four decimal digits, followed by "-", followed by metadata expressed via three-letters.

- The first letter of the metadata identifies the impact, and MUST be one of: L, M, H, or C.
- The second letter identifies the compatibility, and MUST be either B (breaking) or P (preserving).
- The third letter identifies the purpose, and MUST be either E (enhancement) or M (maintenance).

For example, **v13B-F** MAY be represented as **v0315-CBE**.

### FAQs

This section lists some frequently-asked questions concerning Convergent Versioning.

#### Why ConVer?

Convergent Versioning is designed specifically for those projects (both software and non-software) that aim to reach eventual completeness, stability, and maturity. It doesn't pressure you to reach version "1.0", or release often &mdash; it is a system aimed at _finishing_ what you start, and be happy with that. Some famous projects that could be a good fit for ConVer are:

- [SQLite](https://sqlite.org)
- [Zig](https://ziglang.org)
- [Vim Classic](https://vim-classic.org)
- [Uxn/Varvara](https://100r.co/site/uxn.html)
- ...the [Semantic Versioning](/https://semver.org) specification ;)

Therefore things that are stable, mature, feature complete and not likely to change too frequently in the future.

#### Why _not_ ConVer?

If your project is meant to keep evolving and adapting to the latest and greatest technologies, then Convergent Versioning doesn't make sense. Such projects may never be truly complete by design.

Examples include:

- All major modern browsers like Chrome, Firefox, Edge, etc.
- Most commercial/enterprise software
- the Linux kernel
- NodeJS

These types of software are meant to continuously evolve. It doesn't mean that they are not stable or mature, just that they will never be _complete_.

#### What's the best way to explain ConVer to my users?

You should add a VERSIONING or VERSIONING.md file at the root of your project explaining briefly what ConVer is and link to this page for more information, if necessary. Something similar to the following:

> This project uses the Convergent Versioning system. 
>
> The version number is a 2-byte hexadecimal integer from 0x0000 to 0xFFFF, with the first three digits indicating the project _dependability score_ and the last digit encoding the version impact, compatibility, and purpose. 
>
> A version number compliant with Semantic Versioning can be derived from the project history, and will still be used if required by package managers or similar software.
> 
> For more information, see the [Convergent Versioning specification](https://h3rald.com/conver).

#### Can my first release be in the 0000 - 000F range?

Yes, it can. This is best explained using the words of [and null](https://www.sheeeeeeeep.art/about.html):

> If you immediately version a project before any line of code is made, then you have true 0x0000. The world is unchanged, there is nothing written yet, it's merely a design you haven't broken ground on. 
>
> If you start versioning after a week-long bender of coding, then perhaps 0x000F is a more appropriate start. Could be used to signal how explosive the proof-of-concept stage was. 
>
> Did you carefully plan it out (0x0000) or was this a fever dream idea you forced into existance (0x000F)?

#### How do you manage backports and fixes to previously-released versions?

You do not. There is no concept of version branching, and that's by design. While this may sound strange to those used to depend on a specific version of a project _and all subsequent minor or patch versions_, it would start to make more and more sense as a projects stabilizes and becomes more and more feature complete.

If you remove branching, dependency management becomes more straightforward, and in ConVer:

- if you depend on a project that is in _prototype_ or _operational_ state, you must specify the exact versions you are aware that are known to work.
- If you depend on a project in _consolidated_ or _bedrock_ stage, you can specify a single version and _any version after that_ since projects in those stage cannot break compatibility.

#### Can I convert a ConVer release number to SemVer?

In situations where a SemVer like version is expected, such as in formats used by package managers and similar, a ConVer release can be converted into the corresponding SemVer-compliant release provides that the entire history project releases is known. 

To determine the exact SemVer version number of a ConVer project, do the following:

- Count the number of _breaking_ releases; that SHALL be your major version number, unless the project is in _prototype_ stage, in which case the major version should be set to 0.
- Count the number of _enhancement_ releases after the last _breaking_ release (if any, or all if none); that SHALL be your minor version.
- Count the number of _maintenance_ releases after the last _enhancement_ release (if any, or all if none); that should be your patch version.

### About

This specification for Convergent Versioning (ConVer) was originally authored by Fabio Cevasco on 2026-06-07.

### License

[Creative Commons &mdash; CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
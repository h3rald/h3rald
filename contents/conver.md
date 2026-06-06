-----
id: conver
home: /conver/
title: "Convergent Versioning 0x100D"
subtitle: "A versioning system for dependable projects."
summary: "An alternative approach to versioning projects that aims to achieve eventual stability, maturity, and completeness."
content-type: project
active: true
version: 100-D
-----

### Summary

Given a project that aims to achieve the highest level of feature-completeness, maturity, and stability (collectively identified as _dependability_), its releases should be expressed using a single integer number of two bytes expressed in hexadecimal notation, conveying:
- its dependability score, expressed as a value between 0x000 and 0xFFF (first three digits).
- metadata expressing the magnitude of the changes delivered, and if the release includes breaking changes and/or experimental content, encoded in the last digit.

Depending on its dependability score, a project should be immediately classifiable as belonging to one of the following stages: _prototype_, _operational_, _established_, and _bedrock_. Each stage is meant to progressively restrict the type of changes introduced in each release. 

As an example, the version number `0x9B04` immediately conveys that the project is in its _established_ state (very dependable) and the version introduced changes to up to 25% of its content, with no breaking changes and no experimental content. Because of its stage, following releases will never include breaking changes or affect more than 25% of its content, but may include experimental content.

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

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

#### Format

Convergent Versions MUST be expressed using a single, two-byte value written in hexadecimal notation. 

Such value MAY be formatted using any of the following notations:

- four hexadecimal digits OPTIONALLY prepended by`0x` or `$`.
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

- Magnitude
- Breakage
- Experimentation

##### Magnitude

Magnitude identifies the amount of changes compared to the total size of the project. Each value of the metadata nibble expresses a possible order of magnitude among the following:

- S (0-3) &mdash; Up to 5% of the code was changed. 
- M (4-7) &mdash; Up to 25% of the code was changed.
- L (8-B) &mdash; Up to 50% of the code was changed.
- X (C-F) &mdash; Up to 100% of the code was changed.

#### Breakage

Breakage identifies whether the version breaks compatibility with previous versions or not. Alternate pairs of the metadata nibble express this:

- Non-Breaking (0-1, 4-5, 8-9, C-D)
- Breaking (2-3, 6-7, A-B, E-F)

#### Experimentation

Experimentation identifies whether the release introduces experimental APIs or not. 

- Odd values of the metadata nibble mean that the release includes some experimental content.
- Even values of the metadata nibble mean that the release includes only stable content.

#### Summary

| Value | Magnitude | Breakage | Experimentation |
|:--|:--|:--|:--|
| F | X | Y | Y |
| E | X | Y | N |
| D | X | N | Y |
| C | X | N | N |
| B | L | Y | Y |
| A | L | Y | N |
| 9 | L | N | Y |
| 8 | L | N | N |
| 7 | M | Y | Y |
| 6 | M | Y | N |
| 5 | M | N | Y |
| 4 | M | N | N |
| 3 | S | Y | Y |
| 2 | S | Y | N |
| 1 | S | N | Y |
| 0 | S | N | N |

### Dependability Stages

Projects that follow Convergent Versioning SHALL aim to achieve the highest level of dependability in terms of completeness, maturity, and stability. This is achieved by partitioning the available versioning units into four _dependability stages_.

Depending on the stage a project is currently in, certain metadata values SHALL be explicitly forbidden. For example, any release that is part of the _established_ stage MUST NOT include breaking changes. 

The following sections describe the characteristics and restrictions of each stage more in detail.

#### Prototype (000-3FF)

Projects in this stage are typically highly unstable, immature, and/or incomplete. As a result, releases within this stage:

- MAY be of any magnitude 
- MAY include breaking changes
- MAY include experimental content

#### Operational (400-7FF)

Projects in this stage are typically usable in production, although they MAY still improve substantially in terms of completeness, maturity, and stability. As a result, releases within this stage:

- MAY be or magnitude S, M, or L, but not X
- MAY include breaking changes
- MAY include experimental content

#### Established (800-BFF)

Projects in this stage are typically regarded as sufficiently complete, mature and/or stable, although they may still improve to achieve a higher degree of completeness, maturity, and/or stability. As a result, releases within this stage:

- MAY be of magnitude S or M, but not L or X.
- MUST NOT include breaking changes.
- MAY include experimental content.

#### Bedrock (C00-FFF)

Projects in this stage are typically regarded as complete, mature, and/or stable. As a result, releases within this stage:

- MAY be of magnitude S but not M, L, or X.
- MUST NOT include breaking changes.
- MUST NOT include experimental content.

### About

This specification for Convergent Versioning (ConVer) was originally authored by Fabio Cevasco on 2026-06-07.

### License

[Creative Commons &mdash; CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
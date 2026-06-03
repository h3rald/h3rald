-----
id: conver
home: /conver/
title: "Convergent Versioning"
subtitle: "A versioning system for stable software"
summary: "An alternative approach to versioning software that aims to achieve eventual stability and completeness."
content-type: project
active: true
version: 1.2.Y
-----

### Summary

Given a piece of software that aims to progressively become _stable_ by providing a complete and finite feature set and reduce defects as much as possible, increment or decrement its version number (integer, decimal, or fractional) by an arbitrary amount in order to get closer and closer to a specific, well-known value representing ultimate completeness and stability, without ever reaching it.

### Introduction

Traditional software versioning systems like [SemVer](https://semver.org) typically emphasize _what_ changed in a given release and whether it constituted a breaking change, new functionality, or bug fix. 

While this typically helps -- if properly enforced -- to solve very practical problems related to software like how to manage dependencies and how to identify the type of change delivered, it doesn't necessarily convey the level of _stability_ of such software. If a program version is 2.3.7, is it going to remain _stable_ from a version to the next? Or are there going to be major versions released that will introduce breaking changes?

While semantic versioning and traditional versioning systems are very useful to understand at a glance the entity of a change from a version to the next, they do not provide any indication on whether the software API is going to keep changing or essentially try to remain the same.

### Prior Art

There are at least two or three versioning systems that emphasize the importance of converging to a _stable state_ in which a piece of software can be considered _finished_ and _complete_. Of course, such convergence would never actually happen in practice, but it may be approximated sufficiently enough so that a piece of software could be considered _stable_. 

#### KelVer

#### πVer and eVer 

### Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

### Recommended Convergent Sequence


Formula: 1−1/2ⁿ
First five values: 1/2, 3/4, 7/8, 15/16, 31/32


### Notations

#### Compact

Example: 4B

##### Fraction

Example: 15/16

##### Binary Fraction

Example: 0.1111

##### Decimal

Example: 0.9375

### About

### License
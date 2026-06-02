-----
id: conver
home: /conver/
title: "Convergent Versioning"
subtitle: "A versioning system for stable software"
summary: "An alternative approach to versioning software that aims to achieve eventual stability and completeness."
content-type: project
active: true
version: 1.2.G
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

### Example of Convergent Sequences

|Name      |Sigil|Formula       |→   |Rate |First 5 terms                    |
|----------|-----|--------------|----|-----|---------------------------------|
|**Euler** |e    |digits of e   |e   |0.125|2.7, 2.71, 2.718, 2.7182, 2.71828|
|**Pi**    |π    |digits of π   |π   |0.128|3.1, 3.14, 3.141, 3.1415, 3.14159|
|**Root**  |R    |digits of √2  |√2  |0.131|1.4, 1.41, 1.414, 1.4142, 1.41421|
|**Ln2**   |N    |digits of ln 2|ln 2|0.238|0.6, 0.69, 0.693, 0.6931, 0.69314|
|**Phi**   |φ    |digits of φ   |φ   |0.306|1.6, 1.61, 1.618, 1.6180, 1.61803|
|**Apéry** |A    |digits of ζ(3)|ζ(3)|0.358|1.2, 1.20, 1.202, 1.2020, 1.20205|
|**Golden**|G    |F(n)/F(n+1)   |1/φ |0.379|1/1, 1/2, 2/3, 3/5, 5/8          |
|**Zeno**  |Z    |1−1/2ⁿ        |1   |0.500|1/2, 3/4, 7/8, 15/16, 31/32      |
|**Dim**   |D    |1/n²          |0   |0.758|1/1, 1/4, 1/9, 1/16, 1/25        |
|**Square**|Q    |n²/(n²+1)     |1   |0.772|1/2, 4/5, 9/10, 16/17, 25/26     |
|**Third** |T    |(3n−1)/(3n)   |1   |0.863|2/3, 5/6, 8/9, 11/12, 14/15      |
|**Odd**   |O    |(2n−1)/(2n)   |1   |0.863|1/2, 3/4, 5/6, 7/8, 9/10         |
|**Fade**  |F    |1/n           |0   |0.863|1/1, 1/2, 1/3, 1/4, 1/5          |
|**Half**  |H    |n/(2n+1)      |1/2 |0.877|1/3, 2/5, 3/7, 4/9, 5/11         |
|**Wallis**|W    |2n/(2n+1)     |1   |0.877|2/3, 4/5, 6/7, 8/9, 10/11        |
|**Step**  |S    |n/(n+1)       |1   |0.887|1/2, 2/3, 3/4, 4/5, 5/6          |
|**Leap**  |L    |n/(n+2)       |1   |0.902|1/3, 1/2, 3/5, 2/3, 5/7          |

### Notation

### About

### License
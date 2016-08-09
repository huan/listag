# Listag [![Linux Build Status](https://travis-ci.org/zixia/listag.svg?branch=master)](https://travis-ci.org/zixia/listag)

List Manager supports Array Operation & Query by Tags.

[![npm version](https://badge.fury.io/js/listag.svg)](https://badge.fury.io/js/listag)
[![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard-flat.svg)](http://definitelytyped.org)

## What is Listag?

Listag is:

1. Javascript Array like  
    can be used like a normal array with `[]`, `length`, `forEach`, `map`, `reduce` functions.
2. Tags Associated with Each Item  
    can be queried by tags, return a array with items that has the specified tags.
3. Event Support  
    listag will emit `add` and `del` event which can be listened on.
4. TypeScript Support  
    with Type Definition File included.

## Why Listag

When we have some of hash values, we put them into a array:

```javascript
const List = [
  { name: 'tom', value: 1 }
  { name: 'bob', value: 2 }
  { name: 'bob', value: 3 }
]
```

If we want to get the value out whose name is 'tom', we have to use filter:

```javascript
const filteredList = List.filter(v => {
  return v.name === 'tom'
})
```

**Listag is a convinience way to do this, with more powerful enhancements.**

```javascript
const lt = new Listag()
lt.add(1, {
  name: 'tom'
})
lt.add([2, 3], {
  name: 'bob'
})

lt.get({
  name: 'bob'
})
.forEach(v => {
  console.log('value of name bob: %s', v)
})
```

# Example

## Create listag


```javascript
let lt = new Listtag(1, {
  color: 'blue'
})

let lt2 = new Listtag([2, 3], {
  color: 'green'
  , owner: 'tom'
})

```

## Add item(s) to a listag

```javascript
lt.add(4, {
  color: 'red'
})
lt.add([5, 6], {
  color: 'yellow'
  , owner: 'mike'
})
```

# Del item(s) from a listag

```javascript
lt.del(4)

ltDel = lt.get({
  color: 'red'
})
lt.del(ltDel)
```

# Get item(s) from a listag

```javascript
let blueLt = lt.get({
  color: 'blue'
})
blueLt.forEach(i => {
  console.log('items with color blue: %s', i)
})
```

`get` can filter the result by `exclude` some tag value, by add a minus sign `-` before the value:

```javascript
let notBlueLt = lt.get({
  color: '-blue'
})
```

# Array Operation

```javascript
console.log('lt length: %s', lt.length)
console.log('lt[0] = %s', lt[0])

lt.forEach(item => {
  console.log('item: %s', item)
})

lt.map(item => {
  return item * 2
})

lt.filter(item => {
  return item % 2
})
```

# Event

```javascript
lt.on('add', item => {
  console.log('add item: %s', item)
})

lt.on('del', item => {
  console.log('del item: %s', item)
})

```

# Set Tags to a listag

```javascript
lt.set({
  lang: 'js'
})
```

# Test

Unit Test can be found here:

https://github.com/zixia/listag/blob/master/test/listag.spec.js

# Known Issues & Support

Github Issue - https://github.com/zixia/listag/issues

1. Listag can not be `instanceof` because it has been `Proxy`-ed

# Changelog

## v0.3.1 master
1. support create listag from listag, keep all tags information right
1. add `Listag.item()` method to get a ListagItem from Listag, for read tag information

## v0.2.3 (7 Aug 2016)
1. add TypeScript Declaration File
1. support to exclude a tag value by add minus sign(`-`) to value

## v0.1.0 (22 Jul 2016)
1. support array with tags powered by ES6 Proxy

# Todo

[ ] support `for ... in Listag`
[ ] support `for ... of Listag`

Author
-----------------
Zhuohuan LI <zixia@zixia.net> (http://linkedin.com/in/zixia)

<a href="http://stackoverflow.com/users/1123955/zixia">
  <img src="http://stackoverflow.com/users/flair/1123955.png" width="208" height="58" alt="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers">
</a>

Copyright & License
-------------------
* Code & Docs 2016© zixia
* Code released under the ISC license
* Docs released under Creative Commons

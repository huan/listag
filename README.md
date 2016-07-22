# Listag [![Linux Build Status](https://travis-ci.org/zixia/wechaty.svg?branch=master)](https://travis-ci.org/zixia/wechaty)

Array like List Manager supports Query/Delete by Tag

[![npm version](https://badge.fury.io/js/listag.svg)](https://badge.fury.io/js/listag)

## What is Listag?

Listag is:

1. Javascript Array  
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
  return name === 'tom'
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
Github Issue - https://github.com/zixia/wechaty/issues

# Changelog

## v0.1.0 (2016/7/22)
1. array with tags support powered by ES6 Proxy

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

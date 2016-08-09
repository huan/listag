'use strict'

const EventEmitter = require('events')

class ListagItem {
  constructor(data, initTag = {}) {
    this.data = data
    this._tag = Object.assign({}, initTag)
  }

  tag(newTag) {
    if (newTag) {
      Object.assign(this._tag, newTag)
      return this
    } else {
      return this._tag
    }
  }
  
  matchTag(queryTag) {
    let match = true
    const minusRe = /^-(.+)$/
    
    if (Object.keys(queryTag).some(notMatch.bind(this))) {
      match = false
    }
    
    return match
    
    ///////////////////////////////////////////////////////////////////////////
    
    function notMatch(key) {
      let queryValue = queryTag[key]
      let minus
      
      if (typeof queryValue === 'string' 
          && (minus = queryValue.match(minusRe))
      ) {
        /**
         * tag: -value 
         */      
        queryValue = minus[1]
        if (this._tag[key] === queryValue) {
          return true // not match!
        }
      } else {
        /**2
         * tag: value 
         */      
        if (this._tag[key] !== queryValue) {
          return true // not match!
        }
      }
      
      return false // match
    }
  }
  
}

function Listag(items, tagMap) {

  class _Listag extends EventEmitter {

    constructor(items = [], tagMap = {}) {
      super()
      this._items = []
      this.add(items, tagMap)
    }

    get length () { return this._items.length }

    /**
     *
     * return ListagItem for single add
     * return Listag for multi add
     *
     */
    add(items, tagMap) {
      const firstTime = !this.length // must check firstTime at 1st because this.length will change later.

      if (items.map) {
        let newItems
        
        /**
         * we can not use `if (items instanceof _Listag)` here
         * because _Listag is be proxyed(?)
         *
         */
        if (items.constructor && items.constructor.name === '_Listag') {
          newItems = items._items.map(item => this.add(item))
        } else {
          newItems = items.map(item => this.add(item, tagMap))
        }
        if (firstTime) {  // for new Listag, we just return this to stop dead-loop
          return this
        } else {          // if we add some items to a exist Listag, add should return a new Listag that contains batch items of this add
          return new Listag(newItems)
        }
      }

      let item = items  // items is confirmed not a array from now

      if (item instanceof ListagItem) {
        item.tag(tagMap)
      } else {
        item = new ListagItem(item, tagMap)
      }

      this._items.push(item)
      this.emit('add', item.data)
      return item
    }

    get(tags) {
      const list = this._items.filter(i => i.matchTag(tags))
      if (list && list.length) {
        return new Listag(list)
      } else {
        return null
      }
    }
    
    item(data) {
      if (data instanceof ListagItem) {
        return data
      }
      
      const filteredItems = this._items.filter(i => i.data === data)
      if (!filteredItems) {
        return null
      }

      if (filteredItems.length > 1) {
        return filteredItems
      } else {
        return filteredItems[0]
      }
    }

    del(itemList) {
      if (!itemList) {
        return 0
      }

      if (itemList.map) {
        return itemList.map(i => this.del(i))
                       .reduce((a, b) => a+b)
      }

      const item = itemList
      let data
      if (item instanceof ListagItem) {
        data = item.data
      } else {
        data = item
      }

      let counter = 0
      this._items = this._items.filter(i => {
        if (i.data === data) {
          counter++
          this.emit('del', data)
          return false
        } else {
          return true
        }
      })
      return counter
    }

    tag(newTag) {
      /**
       * set
       *
       */
      if (newTag) {
        this._items.forEach(i => i.tag(newTag))
        return this
      }

      /**
       * get
       *
       */
      if (this._item.length > 1) {
        return this._item.map(i => i.tag())
      } else {
        return this._item[0].tag()
      }
    }

    // getTag(itemList) {
    //   if (itemList.map) {
    //     return itemList.map(i => this.tagMap(i))
    //   }
    //   const item = itemList

    //   if (item instanceof ListagItem) {
    //     return item.getTag()
    //   }

    //   const ret = this._items.filter(i => i.data === item)
    //   if (ret && ret.length) {
    //     return ret[0].tagMap
    //   }
    //   return null // XXX or return {}?
    // }

    forEach(cb) {
      return this._items.forEach(i => {
        return cb(i.data)
      })
    }

    map(cb) {
      return this._items.map(i => {
        return cb(i.data)
      })
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    reduce(callback, initialValue) {
      return this._items.reduce((previousValue, currentValue, currentIndex, array) => {
        return callback(previousValue, currentValue.data, currentIndex, array)
      }, initialValue)

    }
  }

  const handler = {
    get(listag, propKey, receiver) {
      // console.log('##############' + propKey)
      try {
        const i = parseInt(propKey, 10)
        if (Number.isInteger(i) && i >= 0 && i < listag.length) {
          return listag._items[i].data
        }
      } catch (e) { /* fall safe */ }

      if (propKey in listag) {
        return listag[propKey]
      }
    }
  }

  return new Proxy(
    new _Listag(items, tagMap)
    , handler
  )

}

Listag.ListagItem = ListagItem

module.exports = Listag.default = Listag.Listag = Listag

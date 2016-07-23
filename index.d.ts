// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html
// https://github.com/Microsoft/TypeScript/issues/2076#issuecomment-75052599

import { EventEmitter } from 'events'

interface ListagItem {
  new (data: any): ListagItem
  new (data: any, tagMap: Object): ListagItem

  tag(tagMap: Object): ListagItem
  hasTag(tagMap: Object): boolean
}

interface Listag extends EventEmitter {
  new (): Listag
  new (item: any): Listag
  new (item: any, tagMap: any): Listag
  new (itemList: any[]): Listag
  new (itemList: any[], tagMap: Object): Listag

  length(): number

  add(item: any): Listag | ListagItem
  add(item: any, tagMap: Object): Listag | ListagItem
  add(itemList: any[], tagMap: Object): Listag | ListagItem

  del(item: any): number
  del(itemList: any[]): number

  get(tagMap: Object): Listag
  tag(tagMap: Object): Listag

  getTag(item: any): Object
  getTag(itemList: any[]): Object

  forEach(cb: Function): any
  map(cb: Function): any
  reduce(cb: Function, initialValue?: any): any
}

export declare var Listag: Listag

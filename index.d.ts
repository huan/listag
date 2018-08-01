// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html
// https://github.com/Microsoft/TypeScript/issues/2076#issuecomment-75052599

import { EventEmitter } from 'events'

interface ListagItem extends Function {
//   new (data: any): ListagItem
//   new (data: any, tagMap: object): ListagItem

  tag(tagMap: object): ListagItem
  tag(): any
  
//   matchTag(tagMap: object): boolean
}

interface Listag<T = any> extends Function, EventEmitter {
  new ()                             : Listag
  new (item: T)                      : Listag
  new (item: T, tagMap: object)      : Listag
  new (itemList: T[])                : Listag
  new (itemList: T[], tagMap: object): Listag

  length: number

  add(item: T | Listag)                : Listag | ListagItem
  add(item: T | Listag, tagMap: object): Listag | ListagItem
  add(itemList: T[], tagMap: object)   : Listag | ListagItem

  del(item: T | Listag): number
  del(itemList: T[])   : number

  get(tagMap: object): Listag
  tag(tagMap: object): Listag
  tag(): any

  // getTag(item: T)      : any
  // getTag(itemList: T[]): any

  item(data: any): ListagItem | null
  
  forEach(cb: ((item: T) => void))          : void
  map     (cb: Function)                    : T[]
  reduce  (cb: Function, initialValue?: any): any

  [key: number]: T
}

export const Listag    : Listag
export const ListagItem: ListagItem
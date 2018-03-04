/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IClone } from "./Clone";
import { Disposer, MultiDisposer, IDisposer } from "./Disposer";
import { EventDispatcher, AMEvent } from "./EventDispatcher";
import { Ordering } from "./Order";
import * as $iter from "./Iterator";
import * as $type from "./Type";
/**
 * @todo Description
 */
export declare class IndexedIterable<A> {
    /**
     * Item list
     *
     * @type {Array<A>}
     */
    private _array;
    /**
     * Start index.
     *
     * @type {number}
     */
    private _start;
    /**
     * End index.
     *
     * @type {number}
     */
    private _end;
    /**
     * Constructor.
     *
     * @param {Array<A>}  array  List items
     * @param {number}    start  Start index
     * @param {number}    end    End index
     */
    constructor(array: Array<A>, start: number, end: number);
    /**
     * Returns a list item iterator.
     *
     * @return {Iterator} Iterator
     */
    iterator(): $iter.Iterator<A>;
    /**
     * Returns an interable list sorted backwards than current list.
     *
     * @return {IndexedIterable<A>} List
     */
    backwards(): IndexedIterable<A>;
    /**
     * Returns a new list consisting only of specific range of items between
     * `start` and `end` indexes.
     *
     * @param  {number}              start  Start index
     * @param  {number}              end    End index
     * @return {IndexedIterable<A>}         List
     */
    range(start: number, end: number): IndexedIterable<A>;
}
/**
 * Defines events for the [[List]].
 */
export interface IListEvents<A> {
    /**
     * Invoked when item is added to the list.
     *
     * @todo remove this later?
     */
    insert: {
        newValue: A;
    };
    /**
     * Invoked when item is removed from the list.
     *
     * @todo remove this later?
     */
    remove: {
        oldValue: A;
    };
    /**
     * Invoked when `setAll` method is called.
     */
    setAll: {
        oldArray: Array<A>;
        newArray: Array<A>;
    };
    /**
     * Invoked when `insertIndex` method is called.
     */
    insertIndex: {
        index: number;
        newValue: A;
    };
    /**
     * Invoked when `setIndex` method is called.
     */
    setIndex: {
        index: number;
        oldValue: A;
        newValue: A;
    };
    /**
     * Invoked when item is removed.
     */
    removeIndex: {
        index: number;
        oldValue: A;
    };
}
/**
 * ListGrouper organizes [[List]] items into groups.
 *
 * @ignore Exclude from docs
 */
export declare class ListGrouper<A> extends MultiDisposer {
    /**
     * Function that can be used to extract a "value" of the list element.
     *
     * Used for ordering.
     *
     * @type {function}
     */
    private _getKey;
    /**
     * A function that  is used to order list groups.
     *
     * @type {function}
     */
    private _sort;
    /**
     * Grouping keys.
     *
     * @type {Array<number>}
     */
    private _keys;
    /**
     * List item groups.
     */
    private _groups;
    /**
     * Inserts an item (`x`) to a specific group (`key`) and specific `index`.
     *
     * @param {A}       x      Item
     * @param {number}  key    Group name
     * @param {number}  index  Index
     */
    private _insert(x, key, index?);
    /**
     * Removes an item from the list.
     *
     * @param {A} x Item to remove
     */
    private _remove(x);
    /**
     * Constructor.
     */
    constructor(list: $iter.Iterable<A> & {
        events: EventDispatcher<{
            insert: {
                newValue: A;
            };
            remove: {
                oldValue: A;
            };
        }>;
    }, getKey: (value: A) => number, sort: (left: number, right: number) => Ordering);
    /**
     * Returns an iterator for the list.
     *
     * The iterator will iterate through all items in all groups.
     *
     * @return {.Iterator<A>} Iterator
     */
    iterator(): $iter.Iterator<A>;
}
/**
 * @todo Description
 * @ignore Exclude from docs
 */
export declare type ListLike<A> = $iter.Iterable<A> & {
    events: EventDispatcher<{
        remove: {
            oldValue: A;
        };
    }>;
};
/**
 * A disposable list, which when disposed itself will call `dispose()` method
 * on all its items.
 */
export declare class ListDisposer<A extends IDisposer> extends Disposer {
    constructor(list: ListLike<A>);
}
/**
 * A List class is used to hold a number of indexed items of the same type.
 */
export declare class List<T> {
    /**
     * List values.
     *
     * @type {Array<T>}
     */
    private _values;
    /**
     * Event dispatcher.
     *
     * @type {EventDispatcher<AMEvent<List<T>, IListEvents<T>>>}
     */
    events: EventDispatcher<AMEvent<List<T>, IListEvents<T>>>;
    /**
     * Constructor
     *
     * @param {Array<T>}  initial  Inital list of values to add to list
     */
    constructor(initial?: Array<T>);
    /**
     * An array of values in the list.
     *
     * Do not use this property to add values. Rather use dedicated methods, like
     * `push()`, `removeIndex()`, etc.
     *
     * @readonly
     * @return {Array<T>} List values
     */
    readonly values: Array<T>;
    /**
     * Checks if list contains specific item reference.
     *
     * @param  {T}        item  Item to search for
     * @return {boolean}        `true` if found, `false` if not found
     */
    contains(value: T): boolean;
    /**
     * Removes specific item from the list.
     *
     * @param {T} item An item to remove
     */
    removeValue(value: T): void;
    /**
     * Searches the list for specific item and returns its index.
     *
     * @param  {T}       item  An item to search for
     * @return {number}        Index or -1 if not found
     */
    indexOf(value: T): number;
    /**
     * Number of items in list.
     *
     * @readonly
     * @return {number} Number of items
     */
    readonly length: number;
    /**
     * Checks if there's a value at specific index.
     *
     * @param  {number}   index  Index
     * @return {boolean}         Value exists?
     */
    hasIndex(index: number): boolean;
    /**
     * Returns an item at specified index.
     *
     * @param  {number}  index  Index
     * @return {T}              List item
     */
    getIndex(index: number): T | undefined;
    /**
     * Sets value at specific index.
     *
     * If there's already a value at the index, it is overwritten.
     *
     * @param  {number}  index  Index
     * @param  {T}       value  New value
     * @return {T}              New value
     */
    setIndex(index: number, value: T): T;
    /**
     * Adds an item to the list at a specific index, which pushes all the other
     * items further down the list.
     *
     * @param  {number} index Index
     * @param  {T}      item  An item to add
     */
    insertIndex(index: number, value: T): void;
    /**
     * [_sortQuicksort description]
     *
     * @todo Description
     * @param {number}    low    [description]
     * @param {number}    high   [description]
     * @param {function}  order  [description]
     */
    private _sortQuicksort(low, high, order);
    /**
     * [_sortPartition description]
     *
     * @todo Description
     * @param  {number}    low    [description]
     * @param  {number}    high   [description]
     * @param  {function}  order  [description]
     * @return {number}           [description]
     */
    private _sortPartition(low, high, order);
    /**
     * Reorders list items according to specific ordering function.
     *
     * @param {T) => Ordering}  order  Ordering function
     */
    sort(order: (left: T, right: T) => Ordering): void;
    /**
     * Swaps indexes of two items in the list.
     *
     * @param {number}  a  Item 1
     * @param {number}  b  Item 2
     */
    swap(a: number, b: number): void;
    /**
     * Removes a value at specific index.
     *
     * @param  {number}  index  Index of value to remove
     * @return {T}              Removed value
     */
    removeIndex(index: number): T;
    /**
     * Moves an item to a specific index within the list
     *
     * If the index is not specified it will move the item to the end of the
     * list.
     *
     * @param {T}       value  Item to move
     * @param {number}  index  Index to place item at
     */
    moveValue(value: T, toIndex?: number): void;
    /**
     * Adds an item to the end of the list.
     *
     * @param  {T}  item  An item to add
     */
    push<K extends T>(value: K): K;
    /**
     * Adds an item as a first item in the list.
     *
     * @param  {T}  item  An item to add
     */
    unshift(value: T): void;
    /**
     * Adds multiple items to the list.
     *
     * @param {Array<T>}  items  An Array of items to add
     */
    pushAll(values: Array<T>): void;
    /**
     * Copies and adds items from abother list.
     *
     * @param {List<T>}  source  A list top copy items from
     */
    copyFrom(source: this): void;
    /**
     * Returns the last item from the list, and removes it.
     *
     * @return {T} Item
     */
    pop(): $type.Optional<T>;
    /**
     * Returns the first item from the list, and removes it.
     *
     * @return {T} Item
     */
    shift(): $type.Optional<T>;
    /**
     * Sets multiple items to the list.
     *
     * All current items are removed.
     *
     * @param {Array<T>}  newArray  New items
     */
    setAll(newArray: Array<T>): void;
    /**
     * Removes all items from the list.
     */
    clear(): void;
    /**
     * Returns a list iterator.
     *
     * @return {Iterator} Iterator
     */
    iterator(): $iter.Iterator<T>;
    /**
     * Returns a specific range of list items, which can be iterated.
     *
     * @ignore Exclude from docs
     * @todo Code duplication with IndexedIterable
     * @param  {number}              start  Start index
     * @param  {number}              end    End index
     * @return {IndexedIterable<T>}         Range
     */
    range(start: number, end: number): IndexedIterable<T>;
    /**
     * Returns an iterator that has list items sorted backwards.
     *
     * @ignore Exclude from docs
     * @return {IndexedIterable<T>} List
     */
    backwards(): IndexedIterable<T>;
}
/**
 * A version of a [[List]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
export declare class ListTemplate<T extends IClone<T> & {
    isTemplate: boolean;
}> extends List<T> implements IClone<ListTemplate<T>> {
    /**
     * A template object.
     *
     * @todo Make this private
     * @type {T}
     */
    _template: T;
    /**
     * Constructor
     *
     * @param {T} t Template object
     */
    constructor(t: T);
    /**
     * @return {T} Template object
     */
    /**
     * A "template" object to copy all properties from when creating new list
     * items.
     *
     * @param {T}  v  Template object
     */
    template: T;
    /**
     * Copies all elements from other list.
     *
     * @param {ListTemplate}  source  Source list
     */
    copyFrom(source: this): void;
    /**
     * Instantiates a new object of the specified type, adds it to the end of
     * the list, and returns it.
     *
     * @param make  Item type to use. Will use the default type for the list if not specified.
     * @return      Newly created item
     */
    create(make: {
        new (): T;
    }): T;
    create(): T;
    /**
     * Creates an exact clone of the list, including its items and template.
     *
     * @return {ListTemplate<T>} New list
     */
    clone(): ListTemplate<T>;
}

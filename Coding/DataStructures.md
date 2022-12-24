<h1 align='center'>Data Structures</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

## Array
<sup>Also called: static array</sup>  
An array organizes items sequentially, one after another in memory. Each position in the array has an index, starting at 0.

||Worst-case|
|---|---|
|space|_O(n)_|
|lookup|_O(1)_|
|append|_O(1)_|
|insert|_O(n)_|
|delete|_O(n)_|

#### _Usage_
```java
int[] arr = new int[5];
```
#### _Strengths_
- **Fast lookups**. Retrieving an item at a given index takes _O(1)_ time, regardless of the length of the array. This is due to being cache-friendly.
- **Cache-friendly**. Arrays place items right next to each other in memory, making efficient use of caches.
- **Fast appends**. Adding a new item at the end of the array takes _O(1)_ time, if the array has space.
#### _Weaknesses_
- **Fixed size**. We need to specify how many items we're going to store in the array ahead of time when defined (unless a fancy _dynamic_ array is being used).
- **Costly inserts and deletes**. We have to _shift_ the remaining items to fill in (insert) or close (delete) gaps, which takes _O(n)_ time in a worst-case scenario. If the array has enough space (no `copyOf` required) and the insertion index is above 0, then, the time complexity to shift the remaining items of the array would be _O(n - k)_, where _k_ represents the index where the new item will be inserted.

_Insert v1_
```java 
int[] newArray = Arrays.copyOf(arr, arr.length + 1);
newArray[newArray.length - 1] = newItem;
```
_Insert v2_
```java
public static int[] insert(int[] arr, int pos, int num) {
    int[] result = new int[arr.length];
    for(int i = 0; i < pos; i++)  // Copy left items
        result[i] = arr[i];
    result[pos] = num;  // Insert number
    for(int i = pos + 1; i < arr.length; i++)  // Copy right items
        result[i] = arr[i - 1];
    return result;
}
```
#### _Operations_ (`java.util.Arrays`)
- `void sort(int[] a)`
- `int binarySearch(T[] a, T key)`
- `int compare(T[] a, T[] b)`
- `T[] copyOf(T[] original, int newLength)`
- `T[] copyOfRange(T[] original, int from, int to)`

## Dynamic Array
<sup> Also called: array list, mutable array, resizable array</sup>  
One limitation of arrays is that they're fixed size, meaning that the number of items hold by the array needs to be specified ahead of time.

A dynamic array expands as we add more items, so we don't need to determine the size ahead of time. Usually, dynamic arrays don't shrink automatically in order to avoid additional runtime.

Although this array looks like a dynamically growing collection, internally it does an array copy when it needs to expand.

||Average|Worst-case|
|---|---|---|
|space|_O(n)_|_O(n)_|
|lookup|_O(1)_|_O(1)_|
|append|_O(1)_|_O(n)_|
|insert|_O(n)_|_O(n)_|
|delete|_O(n)_|_O(n)_|

#### _Usage_
```java
ArrayList<String> arr = new ArrayList<String>();
```
#### _Strengths_
- **Fast lookups**. Just like arrays, retrieving an item at a given index takes _O(1)_ time, regardless of the length of the array. This is due to being cache-friendly.
- **Cache-friendly**. Just like arrays, dynamic arrays place items right next to each other in memory, making efficient use of caches.
- **Mutable size**. We can add as many items as we want, and the dynamic array will expand to hold them.
#### _Weaknesses_
- **Slow worst-case appends**. Usually, adding a new item at the end of the dynamic array takes _O(1)_ time. But if the dynamic array doesn't have enough room for the new item, it'll need to expand, which takes _O(n)_ time.
- **Costly inserts and deletes**. We have to _shift_ the remaining items to fill in (insert) or close (delete) gaps, which takes _O(n)_ time in a worst-case scenario.
#### _Operations_ (`java.util.ArrayList`)
- `T get(int index)`
- `boolean add(T e)`
- `void clear()`
- `Object clone()`
- `boolean contains(Object o)`
- `int indexOf(Object o)`
- `boolean remove(Object o)`
- `T remove(int index)`

## Linked List
A linked list organizes items sequentially, with each item storing a pointer to the next one. An item in a linked list is called a node. The first node is called the head. The last node is called the tail.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209192116-fc771a7a-ba6e-404e-9e3c-02bb805378d3.png" width="400">
</p>

||Worst-case|
|---|---|
|space|_O(n)_|
|lookup|_O(n)_|
|append|_O(1)_|
|prepend|_O(1)_|
|insert|_O(n)_|
|delete|_O(n)_|

#### _Usage_
```java
LinkedList<String> list = new LinkedList<>();
```
#### _Strengths_
- **Fast operations at the ends**. Adding new items at either end of a linked list takes _O(1)_ time. Removing the head item also takes _O(1)_ time.
- **Flexible size**. There's no need to specify how many items are going to be stored ahead of time. We can keep adding new items to the list as long as there's enough space on the machine.
#### _Weaknesses_
- **Slow lookups**. To access or edit an item in a linked list, we have to take _O(k)_ time to walk from the head of the list to the _k<sup>th</sup>_ item.
- **Slow worst-case inserts and deletes**. To insert or delete a new item in a linked list, we have to take _O(k)_ time to walk from the head of the list to the _k<sup>th</sup>_ item.
#### _Operations_ (`java.util.LinkedList`)
- `boolean add(T e)`
- `void add(int index, T element)`
- `T get(int index)`
- `void clear()`
- `Object clone()`
- `boolean contains(Object o)`
- `int indexOf(Object o)`
- `T remove()`
- `boolean remove(Object o)`
- `T remove(int index)`

## Queue
A queue stores items in a first-in, first-out (FIFO) order. Popular use-cases for queues are: (i) _breadth-first search_ uses a queue to keep track of the nodes to visit next; (ii) web servers use queues to manage requests, page requests get fulfilled in the order they're received; (iii) processes wait in the CPU scheduler's queue for their turn to run.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209433555-c0ac93c8-2213-4794-b2ec-625d5cdcae48.png" width="400">
</p>

||Worst-case|
|---|---|
|space|_O(n)_|
|peek|_O(1)_|
|enqueue|_O(1)_|
|dequeue|_O(1)_|

#### _Usage_
```java
// LinkedList implements Queue interface
Queue<Integer> queue = new LinkedList<>();
```
#### _Strengths_
- **Fast operations**. All queue operations take _O(1)_ time.
#### _Weaknesses_
- **Slow lookups**. To access or edit an item in a queue, we have to take _O(k)_ time to walk from the head of the queue to the _k<sup>th</sup>_ item.
#### _Operations_ (`java.util.Queue`)
The operations `add`, `remove` and `element` can throw unchecked exceptions, while the others do not.
- `T peek() / element()`
- `boolean offer(T e) / add(T e)`
- `T pool() / remove()`

## Stack
A stack stores items in a last-in, first-out (LIFO) order. Popular use-cases for stacks are: (i) the _call stack_ is a stack that tracks function calls in a program – when a function returns, which function do we "pop" back to? To the last one that "pushed" a function call; (ii) _depth-first search_ uses a stack (sometimes the _call stack_) to keep track of which nodes to visit next.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209434267-e1b5f7f8-3e12-4f52-b7f8-636d447831cf.png" width="400">
</p>

||Worst-case|
|---|---|
|space|_O(n)_|
|peek|_O(1)_|
|push|_O(1)_|
|pop|_O(1)_|

#### _Usage_
```java
Stack<String> stack = new Stack<>();
```
#### _Strengths_
- **Fast operations**. All stack operations take _O(1)_ time.
#### _Weaknesses_
- **Slow lookups**. To access or edit an item in a stack, we have to take _O(k)_ time to walk from the top of the stack to the _k<sup>th</sup>_ item.
#### _Operations_ (`java.util.Stack`)
- `T peek()`
- `T push(T item)`
- `T pop()`
- `int search(Object o)`
---
## TODO
<sup> Also called: </sup>  
TODO

||Worst-case|
|---|---|
|space|_O(n)_|
|lookup|_O(n)_|
|append|_O(1)_|
|insert|_O(n)_|
|delete|_O(n)_|

#### _Usage_
```java
// TODO
```
#### _Strengths_
- TODO
#### _Weaknesses_
- TODO
#### _Operations_ (``)
- `void todo()`

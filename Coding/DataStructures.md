<h1 align='center'>Data Structures</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

## Array
<sup>Also called: static array</sup>  
An array organizes elements sequentially, one after another in memory. Each position in the array has an index, starting at 0.

#### _Usage_
```java
int[] arr = new int[5];
```
<sup>Space complexity: _O(n)_</sup>

#### _Strengths_
- **Fast lookups**. Retrieving an element at a given index takes _O(1)_ time, regardless of the length of the array. This is due to being cache-friendly.
- **Cache-friendly**. Arrays place elements right next to each other in memory, making efficient use of caches.
- **Fast appends**. Adding a new element at the end of the array takes _O(1)_ time, if the array has space.
#### _Weaknesses_
- **Fixed size**. We need to specify how many elements we're going to store in the array ahead of time when defined (unless a fancy _dynamic_ array is being used).
- **Costly inserts and deletes**. We have to _shift_ the remaining elements to fill in (insert) or close (delete) gaps, which takes _O(n)_ time in a worst-case scenario. If the array has enough space (no `copyOf` required) and the insertion index is above 0, then, the time complexity to shift the remaining elements of the array would be _O(n - k)_, where _k_ represents the index where the new element will be inserted.

_Insert v1_
```java 
int[] newArray = Arrays.copyOf(arr, arr.length + 1);
newArray[newArray.length - 1] = newElem;
```
_Insert v2_
```java
public static int[] insert(int[] arr, int pos, int num) {
    int[] result = new int[arr.length];
    for(int i = 0; i < pos; i++)  // Copy left elements
        result[i] = arr[i];
    result[pos] = num;  // Insert number
    for(int i = pos + 1; i < arr.length; i++)  // Copy right elements
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
One limitation of arrays is that they're fixed size, meaning that the number of elements hold by the array needs to be specified ahead of time.

A dynamic array expands as we add more elements, so we don't need to determine the size ahead of time. Usually, dynamic arrays don't shrink automatically in order to avoid additional runtime.

Although this array looks like a dynamically growing collection, internally it does an array copy when it needs to expand.

#### _Usage_
```java
ArrayList<String> arr = new ArrayList<String>();
```
<sup>Space complexity: _O(n)_</sup>

#### _Strengths_
- **Fast lookups**. Just like arrays, retrieving an element at a given index takes _O(1)_ time, regardless of the length of the array. This is due to being cache-friendly.
- **Cache-friendly**. Just like arrays, dynamic arrays place elements right next to each other in memory, making efficient use of caches.
- **Mutable size**. We can add as many elements as we want, and the dynamic array will expand to hold them.
#### _Weaknesses_
- **Slow worst-case appends**. Usually, adding a new element at the end of the dynamic array takes _O(1)_ time. But if the dynamic array doesn't have enough room for the new element, it'll need to expand, which takes _O(n)_ time.
- **Costly inserts and deletes**. We have to _shift_ the remaining elements to fill in (insert) or close (delete) gaps, which takes _O(n)_ time in a worst-case scenario.
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
<sup> Also called: </sup>  
TODO

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209192116-fc771a7a-ba6e-404e-9e3c-02bb805378d3.png" width="400">
</p>

#### _Usage_
```java
// TODO
```
<sup>Space complexity: </sup>

#### _Strengths_
- TODO
#### _Weaknesses_
- TODO
#### _Operations_
- `void todo()`

---
## TODO
<sup> Also called: </sup>  
TODO

#### _Usage_
```java
// TODO
```
<sup>Space complexity: </sup>

#### _Strengths_
- TODO
#### _Weaknesses_
- TODO
#### _Operations_
- `void todo()`

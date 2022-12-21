<h1 align='center'>Data Structures</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

## Array
An array organizes items sequentially, one after another in memory. Each position in the array has an index, starting at 0.

### _Usage_
```java
//TODO
```

### _Strengths_
- **Fast lookups**. Retrieving an element at a given index takes _O(1)_ time, regardless of the length of the array.
- **Fast appends**. Adding a new element at the end of the array takes _O(1)_ time, if the array has space.

### _Weaknesses_
- **Fixed size**. We need to specify how many elements we're going to store in the array ahead of time when defined (unless a fancy _dynamic_ array is being used).
- **Costly inserts and deletes**. We have to _shift_ the other elements to fill in (insert) or close (delete) gaps, which takes, worst-case, _O(n)_ time.

_Insert option 1_
```java 
int[] newArray = Arrays.copyOf(arr, arr.length + 1);
newArray[newArray.length - 1] = newItem;
```
_Insert option 2_
```java
public static int[] addInPos(int[] arr, int pos, int num) {
    int[] result = new int[arr.length];
    for(int i = 0; i < pos; i++)
        result[i] = arr[i];
    result[pos] = num;  // Insert number
    for(int i = pos + 1; i < arr.length; i++)
        result[i] = arr[i - 1];
    return result;
}
```
### _Operations_ (`java.util.Arrays`)
- `sort(int[] a)`
- `binarySearch(T[] a, T key)`
- `compare(T[] a, T[] b)`
- `copyOf(T[] original, int newLength)`
- `copyOfRange(T[] original, int from, int to)`

---
## Template
TODO

### _Usage_
```java
// TODO
```
### _Strengths_
- TODO

### _Weaknesses_
- TODO

### _Operations_
- `todo()`

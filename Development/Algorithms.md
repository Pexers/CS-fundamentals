<h1 align='center'>Algorithms</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

Algorithms are widely used throughout all areas of mathematics and computer science. An algorithm is a set of well-defined instructions to solve a particular problem. They are also used as specifications for performing data processing and play a major role in automated systems.

## Big-O Notation
Big-O notation is a formal expression of an algorithm's complexity in relation to the growth of the input size. Hence, it is used to rank algorithms based on their performance with large inputs.

We can express it as the _best_, _average_, and _worst-case_ complexity of an algorithm. Most discussions of Big-O focus on the "upper-bound" complexity of an algorithm, that is, the worst-case.

### Time complexity
It's hard to pin down the exact runtime of an algorithm. It depends on the speed of the processor, what else the computer is running, etc. So instead of talking about the runtime directly, we use the Big-O notation to talk about _how quickly the runtime grows_.

| Notation<br><sup>:arrow_down:+Time</sup></br> |     Meaning      | Description                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------------------------------: | :--------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                    _O(1)_                     |  Constant Time   | The runtime is constant, regardless of the size of the input.<br/><sub>E.g. indexing an array, fetching from hash map given a key, returning a value from a function, etc.</sub>                                                                                                                                                                                                   |
|           _O(log&nbsp;n)_&nbsp;[^1]           | Logarithmic Time | The running time grows in proportion to the logarithm of the input size, meaning that the time barely increases as you exponentially increase the input. The time increases approximately by a constant amount when the number of input elements doubles.<br/><sub>E.g. binary search, finding largest/smallest number in a binary search tree, etc.                               |
|                    _O(n)_                     |   Linear Time    | The time grows linearly with the number of input elements _n_. If _n_ doubles, the time approximately doubles too. "Approximately" because the time may also include components with lower complexity classes that are omitted in the notation.<br/><sub>E.g. forEach / map / reduce run through the entire collection, comparing two strings, checking for palindrome, etc.</sub> |
|            _O(n&nbsp;log&nbsp;n)_             | Log-linear Time  | A combination of linear and logarithmic complexity. Sorting algorithms that utilize a _divide-and-conquer_ strategy are _linearithmic_.<br/><sub>E.g. merge sort, heap sort, etc.                                                                                                                                                                                                  |
|              _O(n<sup>2</sup>)_               |  Quadratic Time  | The time grows linearly to the square of the number of input elements.<br/><sub>E.g. selection sort, bubble sort, insertion sort, {1.._n_} nested loops, etc.                                                                                                                                                                                                                      |
|                    _O(n!)_                    |  Factorial Time  | Any time _n_ increases by 1, the running time increases by a factor of _n_.<br/><sub>E.g. solving the traveling salesman problem via brute-force, generating all unrestricted permutations of a partially ordered set, etc.                                                                                                                                                        |

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209826182-d619af3d-45ec-477b-87a5-a4e157d215e6.png" width="500">
</p>

#### _Calculation_
- **Dropping constants**. The below code snippet takes _O(1 + n/2 + 100)_ time to complete, but we simplify it to _O(n)_.
```java
public static void printStuff(int[] items) {
	System.out.println(items[0]);  // O(1)

	int middleIdx = items.length / 2;  // O(1)
	int idx = 0;  // O(1)

	while (idx < middleIdx) {  // O(n/2)
		System.out.println(items[idx]);  // O(1)
		idx++;  // O(1)
	}

	for (int i = 0; i < 100; i++) {  // O(100)
		System.out.println("Hello world!");  // O(1)
	}
}
```
- **Dropping less significant terms**. The below code snippet takes _O(n + n<sup>2</sup>)_ time to complete, but we simplify it to _O(n<sup>2</sup>)_.
```java
public static void printAllNumbersThenAllPairSums(int[] numbers) {
	for (int i : numbers) {  // O(n)
		System.out.println(i);  // O(1)
	}

	for (int first : numbers) {  // O(n^2)
		for (int second : numbers) {  // O(n)
			System.out.println(first + second);  // O(1)
		}
	}
}
```
- **Distinguishing unknown input sizes**. The below code snippet takes _O(n + m)_ time to complete, where _n_ represents the size of `arr1` and _m_ the size of `arr2`.
```java
public static void printTwoArrays(int[] arr1, int[] arr2) {
	for (int i : arr1) {  // O(n)
		System.out.println(i);  // O(1)
	}

	for (int i : arr2) {  // O(m)
		System.out.println(i);  // O(1)
	}
}
```

### Space complexity
Sometimes we want to optimize code for using less memory, in addition to using less runtime. Talking about space complexity, or memory cost, is very similar to talking about time cost. We simply look at the total size of any new variables we're allocating with respect to the size of the input.

#### _Calculation_
| Data&nbsp;type<br><sup>:arrow_down:+Size</sup></br> | Size    | Description                                                                            |
| :-------------------------------------------------: | ------- | -------------------------------------------------------------------------------------- |
|                      `boolean`                      | 1 bit   | Stores true or false values.                                                           |
|                       `byte`                        | 1 byte  | Stores whole numbers from -128 to 127.                                                 |
|                       `char`                        | 2 bytes | Stores a single character/letter or ASCII values.                                      |
|                       `short`                       | 2 bytes | Stores whole numbers from `-32,768` to `32,767`.                                       |
|                        `int`                        | 4 bytes | Stores whole numbers from `-2,147,483,648` to `2,147,483,647`.                         |
|                       `float`                       | 4 bytes | Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits.               |
|                       `long`                        | 8 bytes | Stores whole numbers from `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`. |
|                      `double`                       | 8 bytes | Stores fractional numbers. Sufficient for storing 15 decimal digits.                   |
- **Dropping constants**. The below code snippet has a total memory usage of _O(4*n + 4 + 4 + 4)_, but we simplify it to _O(n)_.
```java
public static int sumArray(int[] array) {  // 4B*n
	int size = array.length;  // 4B
	int sum = 0;  // 4B
	for (int i : array) {  // 4B iterator
		sum += i;
	}
	return sum;
}
```
#### Java memory allocation: _Heap Vs Stack_
If we have a variable which is intended to outlive the execution of the method that created it, it needs to be on the _heap_. This applies both to primitive and non-primitive data types.

If a variable is intended to go out of scope shortly after its creation – say, at the end of the method in which it's created, or even earlier – then it's appropriate for that variable to be created on the _stack_. Local variables and method arguments fit this criterion; if they are primitives, the actual value will be on the _stack_, and if they are references to the object (but not the object itself) it will be on the _stack_ as well.

_Stack_ memory is always referenced in LIFO (Last-In-First-Out) order. Whenever a method is invoked, a new block is created in the _stack_ memory for the method to hold local primitive values and reference to other objects. As soon as the method ends, the block becomes unused and becomes available for the next method. _Stack_ memory size is very less compared to _heap_ memory.

_Practical example_
```java
public class Memory {
	public static int counter = 0;  // Heap, global variable

	public static void main(String[] args) {  // Stack, main method block
		int i = 1;  // Stack
		Memory mem = new Memory();  // 'mem' reference in Stack, object in Heap
		Object obj = new Object();  // 'obj' reference in Stack, object in Heap
		mem.foo(obj);  // New Stack block created for foo method
	}  // Method block becomes free in Stack

	private static void foo(Object param) {  // Stack, foo method block
		String str = param.toString();  // 'str' reference in Stack, String object in Heap (within the String pool)
		System.out.println(str);
	}  // Method block becomes free in Stack
}
```
#### Recursive Vs Iterative solutions
Recursion is usually more expensive (slower/more memory) than Iteration since all function calls must be stored in a _stack_ to allow the _return_ back to the caller functions. In many cases, memory has to be allocated and copied to implement scope isolation.

The main reasons to use Recursion are:
- Can be more intuitive when it mimics our approach to the problem.
- Some data structures, such as trees, are easier to explore using recursion.
- Recursion is closely related to the term of _reduction_, which plays a central role in many algorithms and in computer science in general.

## Searching Algorithms
The searching algorithms are used to search or find one or more than one element from a dataset. Searching may be sequential or not. If the data in the dataset are **random**, then we need to use sequential searching. Otherwise we can use other different techniques to reduce complexity.

### Linear Search
<sup>**Time complexity**: _O(n)_</sup>  
Linear Search is the simplest algorithm employed to search for an element in a data collection. It examines each element until it finds a match, starting from the beginning of the collection until the end. Hence, it is defined as a sequential search algorithm.

### Binary Search
<sup>**Time complexity**: _O(log n)_ || **Space complexity**: _O(1)_ – iterative Or _O(log n)_ – recursive</sup>  </sup>  
Binary Search is a searching algorithm used in **sorted arrays** by repeatedly dividing the search interval in half. The idea of the algorithm is to take advantage of the sorted property and reduce the time complexity of the linear search. 

In order for Binary Search to be considered a D&C (_divide-and-conquer_) algorithm, it would need to use two disjoint recursive calls, just like Quick Sort does. Binary Search does not have this, even though it can be implemented recursively.

_Iterative approach_
```java
public static int binarySearchIter(int arr[], int target) {
	int mid, left = 0, right = arr.length - 1;
	while (left <= right) {
		mid = left + ((right - left) / 2);  // Find the ~middle index
		if (arr[mid] == target) {  // Check if 'target' is present at mid
			return mid;
		}
		if (arr[mid] < target) left = mid + 1;  // If 'target' greater, ignore left half
		else right = mid - 1;                   // If 'target' smaller, ignore right half
	}
	return -1;  // 'target' was not found
}
```
_Recursive approach_
```java
public static int binarySearch(int arr[], int left, int right, int target) {
	if (left <= right && left <= arr.length - 1) {
		int mid = left + ((right - left) / 2);  // Find the ~middle index
		if (arr[mid] == target) {  // Check if 'target' is present at mid
			return mid;
		}
		if (arr[mid] < target)  // If 'target' greater, ignore left half
			return binarySearch(arr, mid + 1, right, target);
		else                // If 'target' smaller, ignore right half
			return binarySearch(arr, left, mid - 1, target);
	}
	return -1;  // 'target' was not found
}
```
The space complexity of Binary Search, without considering inputs, is _O(1)_ in the iterative approach, while for the recursive implementation is _O(log n)_, due to the need for extra function calls.

### Breadth-First Search (BFS)
<sup>**Time complexity**: _O(n)_ || **Space complexity**: _O(n)_</sup>  
A method for exploring a **tree or graph**. In a BFS, we first explore all the nodes one step away, then all the nodes two steps away, etc. In a tree, this is, we first walk through all nodes on the same level before moving on to the next level.

BFS uses _Queue_ data structure for finding the shortest path, so it works on the concept of FIFO. When the target is **close to the source**, BFS performs better than DFS.

The worst-case time complexity can happen when we have an unbalanced tree, where we start from the root node and may end up searching the tree until the farthest leaf node.

|                                                              (1)                                                              |                                                              (2)                                                              |                                                              (3)                                                              |                                                              (4)                                                              |
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/47757441/210258444-7ad2bb4f-2c1b-4ba1-ba67-36df5682b72c.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210258446-14278afb-1b46-44b5-847c-ec13f38f8ae4.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210258449-f3339634-bdd3-48bb-9c35-708a8eb5bf41.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210258440-00be8878-4789-40b4-b758-d2ebcc7d8953.png" width="200"> |

_Node class_
```java
public class Node {
	private int value;
	List<Node> children;

	public int getValue() {
		return value;
	}
}
```
_Iterative approach_
```java
public static Node breadthFirstSearchIter(Node root, int target) {
    Queue<Node> queue = new LinkedList<>();
    Node current;
    queue.add(root);

    while (!queue.isEmpty()) {
        current = queue.remove();
        if (current.getValue() == target) return current;
        else queue.addAll(current.children);
    }
    return null;  // Target node not found
}
```
Because the Queue uses the FIFO method, the loop only starts verifying the children of a certain node once all the other neighbor nodes on the same level have been verified, that is, removed from the queue.

#### _Strengths_
- BFS will find the shortest path between the starting point and any other reachable node

#### _Weaknesses_
- BFS on a binary tree generally requires more memory than DFS.

### Depth-First Search (DFS)
<sup>**Time complexity**: _O(n)_ || **Space complexity**: _O(n)_ – iterative Or _O(h)_ – recursive, where _h_ is the maximum tree depth</sup>  
A method for exploring a **tree or graph**. In a DFS, we go as deep as possible down one path before backing up and trying a different one.

DFS uses _Stack_ data structure, so it works on the concept of LIFO. When the target is **far from the source**, DFS is preferable to BFS.

The worst-case time complexity can happen when we have an unbalanced tree, where we start from the root node and may end up searching the tree until the farthest leaf node.

|                                                              (1)                                                              |                                                              (2)                                                              |                                                              (3)                                                              |                                                              (4)                                                              |                                                              (5)                                                              |
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/47757441/210252635-650140ea-1aef-4229-b62e-2597f43fe86c.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210252637-f59b3ea1-a753-4a7b-9550-dc2609dd64e2.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210252638-0265bbf8-98e4-4f15-a7a4-5efdd07ed8eb.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210252641-f885806b-0b14-4c18-9bac-ac74cd2a1d52.png" width="200"> | <img src="https://user-images.githubusercontent.com/47757441/210252629-e6d976b6-0b6f-4ed6-9e92-b6483ba126f3.png" width="200"> |

_Node class_
```java
public class Node {
	private int value;
	Node left;
	Node right;

	public int getValue() {
		return value;
	}
}
```
_Recursive approach_
```java
public static void depthFirstSearch(Node node) {
	if (node != null) {
		System.out.println(node.getValue());    // Pre-order transversal
		depthFirstSearch(node.left);
		// System.out.println(node.value);      // In-order transversal
		depthFirstSearch(node.right);
		// System.out.println(node.value);      // Post-order transversal
	}
}
```
_Iterative approach_ (pre-order)
```java
public static void depthFirstSearchIter(Node root) {
	Stack<Node> stack = new Stack<>();
	Node current = root;
	stack.push(root);

	while (!stack.isEmpty()) {
		current = stack.pop();
		System.out.println(current.getValue());  // Pre-order transversal
		if (current.right != null) {
			stack.push(current.right);
		}
		if (current.left != null) {
			stack.push(current.left);
		}
	}
}
```
In-order, Pre-order, and Post-order transversal algorithms for the iterative approach differ between them.
#### _Strengths_
- DFS on a binary tree generally requires less memory than BFS.
- DFS can be easily implemented with recursion.

#### _Weaknesses_
- DFS doesn't necessarily find the shortest path to a node, while BFS does.

## Sorting Algorithms
A sorting algorithm is used to arrange elements of an array/list in a specific order.

|                |          Best          |        Average         |       Worst-case       |
| :------------: | :--------------------: | :--------------------: | :--------------------: |
| Selection Sort |   _O(n<sup>2</sup>)_   |   _O(n<sup>2</sup>)_   |   _O(n<sup>2</sup>)_   |
|  Bubble Sort   |         _O(n)_         |   _O(n<sup>2</sup>)_   |   _O(n<sup>2</sup>)_   |
| Insertion Sort |         _O(n)_         |   _O(n<sup>2</sup>)_   |   _O(n<sup>2</sup>)_   |
|   Heap Sort    |         _O(n)_         | _O(n&nbsp;log&nbsp;n)_ | _O(n&nbsp;log&nbsp;n)_ |
|   Merge Sort   | _O(n&nbsp;log&nbsp;n)_ | _O(n&nbsp;log&nbsp;n)_ | _O(n&nbsp;log&nbsp;n)_ |
|   Quick Sort   | _O(n&nbsp;log&nbsp;n)_ | _O(n&nbsp;log&nbsp;n)_ |   _O(n<sup>2</sup>)_   |

<sup>_Quick Sort tends to be the fastest in most cases, explained below*_</sup>

### Selection / Bubble / Insertion Sort
- **Selection Sort**. Works by repeatedly selecting the next-smallest element from the unsorted array and moving it to the front.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/211066328-a80139a7-c2cf-4d45-811b-8f4bba20e501.png" width="275">
</p>

- **Bubble Sort**. Works by repeatedly comparing two adjacent elements and swaps them until they are in the intended order. Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/211066330-59a4af6c-e9ce-4470-a29e-5c60d0678ec9.png" width="275">
</p>

- **Insertion Sort**. Works by inserting elements from an unsorted array into a sorted subsection of the array, one item at a time. It places an unsorted element at its suitable place in each iteration.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/211066324-ef45864a-f287-4991-bab4-1ca40d18f191.png" width="275">
</p>

All three algorithms have a quadratic worst-case time complexity and hence work slowly on large datasets.
### Heap / Merge / Quick Sort
- **Heap Sort**. Similar to Selection Sort, where we repeatedly select the largest item and move it to the end of the array. The main difference is that instead of scanning through the entire array to find the largest item, we convert the array into a _max-heap_ to speed things up. A _max-heap_ is a complete binary tree in which the value of each internal node is greater than or equal to the values of its children.  
<sup>_No need to know Heap Sort by heart_</sup>

- **Merge Sort**. Works by dividing the list into halves, then iterates through the new halves, continually dividing them down further to their smaller parts. Subsequently, a comparison of smaller halves is conducted, and the results are combined together to form the final sorted list.
```java
public static int[] mergeSort(int[] arr) {
	if (arr.length <= 1) return arr;  // Base case: single element array
	// Split the input in half
	int middleIndex = arr.length / 2;
	int[] left = Arrays.copyOfRange(arr, 0, middleIndex);
	int[] right = Arrays.copyOfRange(arr, middleIndex, arr.length);

	// Sort each half
	int[] leftSorted = mergeSort(left);
	int[] rightSorted = mergeSort(right);

	return mergeArrays(leftSorted, rightSorted);  // Merge the sorted halves
}

private static int[] mergeArrays(int[] arr1, int[] arr2) {
	int arrOneIdx = 0;
	int arrTwoIdx = 0;
	int mergedArrIdx = 0;
	int[] mergedArray = new int[arr1.length + arr2.length];

	// Both arrays to merge have some items left in them
	while (arrOneIdx < arr1.length && arrTwoIdx < arr2.length) {
		// Pick the smaller element and add it to the merged array
		if (arr1[arrOneIdx] <= arr2[arrTwoIdx]) {
			mergedArray[mergedArrIdx] = arr1[arrOneIdx];
			arrOneIdx++;
		} else {
			mergedArray[mergedArrIdx] = arr2[arrTwoIdx];
			arrTwoIdx++;
		}
		mergedArrIdx++;
	}

	// Copy remaining elements of 'arr1', if any
	while (arrOneIdx < arr1.length) {
		mergedArray[mergedArrIdx] = arr1[arrOneIdx];
		mergedArrIdx++;
		arrOneIdx++;
	}

	// Copy remaining elements of 'arr2', if any
	while (arrTwoIdx < arr2.length) {
		mergedArray[mergedArrIdx] = arr2[arrTwoIdx];
		mergedArrIdx++;
		arrTwoIdx++;
	}

	return mergedArray;
}
```

- **Quick Sort**. Works by dividing the input into two sub-arrays: one with small items and the other with large items. Then, it recursively sorts both the sub-arrays.
```java
/**
* Sorts [arr] from [start] index to [end] index.
*/
public static void quickSort(int[] arr, int start, int end) {
	if (start < end) {
		int partitionIdx = partition(arr, start, end);  // Divide the array into two smaller sub-arrays
		// Recursively sort each sub-array
		quickSort(arr, start, partitionIdx - 1);
		quickSort(arr, partitionIdx + 1, end);
	}
}

private static int partition(int[] arr, int start, int end) {
	swap(arr, end / 2, end);  // Choose middle element as pivot to avoid worst-case
	int pivotIdx = end;
	int pivot = arr[pivotIdx];
	int i = start - 1;

	for (int j = start; j < end; j++) {
		if (arr[j] <= pivot) {
			i++;
			// Swap element at 'i' for element at 'j'
			swap(arr, i, j);
		}
	}
	// Swap the pivot element with the greater element at position 'i + 1'
	swap(arr, i + 1, pivotIdx);
	return i + 1;  // Return the position from where partition is done
}

private static void swap(int[] arr, int i, int j) {
	int temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
```

Quick Sort and Merge Sort are examples of **_divide-and-conquer_** algorithms, they decompose a complex problem into smaller sub-parts, where a defined solution is applied recursively to each sub-part. Each sub-part is then solved separately, and the solutions are recombined to solve the original problem. 

#### Why is Quick Sort usually faster in practice?
The secret of Quick Sort is that it almost doesn't do unnecessary element swaps, which are time consuming. With Heap Sort, even when the data is already sorted, the algorithm will swap 100% of the elements to sort the array. With Merge Sort, it's even worse, we write 100% of elements in a secondary array, and write it back in the original one, even if the data is already sorted.

Quick Sort's performance is mainly dependent on the pivot selection algorithm. Ideally, the pivot should be picked randomly. In the above implementation, we opt for using the middle element of the array as the pivot.

In early versions of Quick Sort, where the leftmost (or rightmost) element was chosen as a pivot, the following scenarios would cause the worst-case to occur:
- When the input array is **already sorted**, and we choose the **leftmost** element as the pivot element. In this case, we'll have two extremely unbalanced arrays. One array will have [0] elements, and the other one will have [n - 1] elements.
- When the given array is **reverse sorted**, and we choose the **rightmost** element as the pivot element. Again, in this case, the pivot elements will split the input array into two unbalanced arrays of size [0] and [n - 1].
- When all the elements in the given array **are the same**. In such a scenario, the pivot element divides the array into one sub-array of length [n - 1], and the time complexity of Quick Sort increases significantly.

An alternative way to avoid Quick Sort's worst-case is to randomly shuffle the input before sorting it. In real life scenarios, the input can be nearly sorted, that's why most programming languages, such as Python, Java and JavaScript, all use a modified version of Merge Sort (known as _Tim Sort_) as their default sorting algorithm.

[^1]: In computer science, exponential growth usually occurs as a consequence of discrete processes like the _divide-and-conquer_ algorithms or in manipulation of binary values. Consequently, we typically use base _2_ in logarithmic functions, since it just arises so frequently, meaning that _log<sub>2</sub> n_ is simplified to _log n_.

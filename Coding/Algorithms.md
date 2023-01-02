<h1 align='center'>Algorithms</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Algorithms are widely used throughout all areas of mathematics and computer science. An algorithm is a set of well-defined instructions to solve a particular problem. They are also used as specifications for performing data processing and play a major role in automated systems.

## Big-O Notation
Big-O notation is a formal expression of an algorithm’s complexity in relation to the growth of the input size. Hence, it is used to rank algorithms based on their performance with large inputs.

We can express it as the best, average, and worst-case complexity of an algorithm. Most discussions of Big-O focus on the "upper-bound" complexity of an algorithm, that is, the worst-case.

### Time complexity
It's hard to pin down the exact runtime of an algorithm. It depends on the speed of the processor, what else the computer is running, etc. So instead of talking about the runtime directly, we use the Big-O notation to talk about _how quickly the runtime grows_.

|Notation|Meaning|Description|
|:---:|:---:|---|
|_O(1)_|Constant Time|The runtime is constant, regardless of the size of the input.<br/><sub>E.g. indexing an array, fetching from hash map given a key, returning a value from a function, etc.</sub>|
|_O(log&nbsp;n)_&nbsp;[^1]|Logarithmic Time|The running time grows in proportion to the logarithm of the input size, meaning that the time barely increases as you exponentially increase the input. The time increases approximately by a constant amount when the number of input elements doubles.<br/><sub>E.g. binary search, finding largest/smallest number in a binary search tree, etc. |
|_O(n)_|Linear Time|The time grows linearly with the number of input elements _n_. If _n_ doubles, the time approximately doubles too. "Approximately" because the time may also include components with lower complexity classes that are omitted in the notation.<br/><sub>E.g. forEach / map / reduce run through the entire collection, comparing two strings, checking for palindrome, etc.</sub>|
|_O(n&nbsp;log&nbsp;n)_|Log-linear Time|A combination of linear and logarithmic complexity. Sorting algorithms that utilize a _divide-and-conquer_ strategy are _linearithmic_.<br/><sub>E.g. merge sort, heap sort, etc. |
|_O(n<sup>2</sup>)_|Quadratic Time|The time grows linearly to the square of the number of input elements.<br/><sub>E.g. bubble sort, insertion sort, selection sort, {1.._n_} nested loops, etc.|

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209826182-d619af3d-45ec-477b-87a5-a4e157d215e6.png" width="500">
</p>

#### _Calculation_
- **Dropping constants**. The below code snippet takes _O(1 + n/2 + 100)_ time to complete, but we simplify it to _O(n)_.
```java
public static void printRandomStuff(int[] items) {
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
|Data type|Size|Description|
|:---:|---|---|
|`boolean`|1 bit|Stores true or false values.|
|`byte`|1 byte|Stores whole numbers from -128 to 127.|
|`char`|2 bytes|Stores a single character/letter or ASCII values.|
|`short`|2 bytes|Stores whole numbers from `-32,768` to `32,767`.|
|`int`|4 bytes|Stores whole numbers from `-2,147,483,648` to `2,147,483,647`.|
|`float`|4 bytes|Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits.|
|`long`|8 bytes|Stores whole numbers from `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`.|
|`double`|8 bytes|Stores fractional numbers. Sufficient for storing 15 decimal digits.|
- **Dropping constants**. The below code snippet has a total memory usage of _O(4*n + 4 + 4 + 4)_, but we simplify it to _O(n)_.
```java
public int sumArray(int[] array) {  // 4B*n
    int size = array.length;  // 4B
    int sum = 0;  // 4B

    for (int iterator = 0; iterator < size; iterator++) {  // 4B iterator
        sum += array[iterator];
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
TODO:

### Linear Search
<sup>**Time complexity**: _O(n)_</sup>  
Linear Search is the simplest algorithm employed to search for an element in a data collection. It examines each element until it finds a match, starting from the beginning of the collection until the end.

### Binary Search
<sup>**Time complexity**: _O(log n)_</sup>  
Binary Search is a searching algorithm used in **sorted arrays** by repeatedly dividing the search interval in half. The idea of the algorithm is to take advantage of the sorted property and reduce the time complexity of the linear search. 

In order for Binary Search to be considered a D&C (_divide-and-conquer_) algorithm, it would need to use two disjoint recursive calls, just like QuickSort does. Binary Search does not have this, even though it can be implemented recursively.

_Iterative approach_
```java
public static int binarySearchIter(int arr[], int x) {
	int mid, left = 0, right = arr.length - 1;
	while (left <= right) {
		mid = left + ((right - left) / 2);  // Find the ~middle index
		if (arr[mid] == x) {  // Check if 'x' is present at mid
			return mid;
		}
		if (arr[mid] < x) left = mid + 1;	// If 'x' greater, ignore left half
		else right = mid - 1;  				// If 'x' smaller, ignore right half
	}
	return -1;  // 'x' was not found
}
```
_Recursive approach_
```java
public static int binarySearch(int arr[], int left, int right, int x) {
    if (left <= right && left <= arr.length - 1) {
		mid = left + ((right - left) / 2);  // Find the ~middle index
		if (arr[mid] == x) {  // Check if 'x' is present at mid
			return mid;
		}
		if (arr[mid] < x)	// If 'x' greater, ignore left half
			return binarySearch(arr, mid + 1, right, x);
		else				// If 'x' smaller, ignore right half
			return binarySearch(arr, left, mid - 1, x);
	}
	return -1;  // 'x' was not found
}
```
The space complexity of Binary Search, without considering inputs, is _O(1)_ in the iterative approach, while for the recursive implementation is _O(log n)_, due to the need for extra function calls.

### Breadth-First Search (BFS)
<sup>**Time complexity**: _O(n)_ || **Space complexity**: _O(n)_</sup>  
A method for exploring a **tree or graph**. In a BFS, we first explore all the nodes one step away, then all the nodes two steps away, etc. In a tree, this is, we first walk through all nodes on the same level before moving on to the next level.

BFS uses _Queue_ data structure for finding the shortest path, so it works on the concept of FIFO. When the target is **close to the source**, BFS performs better than DFS.

The worst-case time complexity can happen when we have an unbalanced tree, where we start from the root node and may end up searching the tree until the farthest leaf node.

|(1)|(2)|(3)|(4)|
|:---:|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/47757441/210258444-7ad2bb4f-2c1b-4ba1-ba67-36df5682b72c.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210258446-14278afb-1b46-44b5-847c-ec13f38f8ae4.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210258449-f3339634-bdd3-48bb-9c35-708a8eb5bf41.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210258440-00be8878-4789-40b4-b758-d2ebcc7d8953.png" width="200">|

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

	while(!queue.isEmpty()) {
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
<sup>**Time complexity**: _O(n)_ || **Space complexity**: _O(n)_ – iterative or _O(h)_ – recursive, where _h_ is the maximum tree depth</sup>  
A method for exploring a **tree or graph**. In a DFS, we go as deep as possible down one path before backing up and trying a different one.

DFS uses _Stack_ data structure, so it works on the concept of LIFO. When the target is **far from the source**, DFS is preferable to BFS.

The worst-case time complexity can happen when we have an unbalanced tree, where we start from the root node and may end up searching the tree until the farthest leaf node.

|(1)|(2)|(3)|(4)|(5)|
|:---:|:---:|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/47757441/210252635-650140ea-1aef-4229-b62e-2597f43fe86c.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210252637-f59b3ea1-a753-4a7b-9550-dc2609dd64e2.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210252638-0265bbf8-98e4-4f15-a7a4-5efdd07ed8eb.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210252641-f885806b-0b14-4c18-9bac-ac74cd2a1d52.png" width="200">|<img src="https://user-images.githubusercontent.com/47757441/210252629-e6d976b6-0b6f-4ed6-9e92-b6483ba126f3.png" width="200">|

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
public void depthFirstSearch(Node node) {
    if (node != null) {
        System.out.println(node.getValue()); 	// Pre-order transversal
        depthFirstSearch(node.left);
        // System.out.println(node.value);	// In-order transversal
        depthFirstSearch(node.right);
        // System.out.println(node.value);	// Post-order transversal
    }
}
```
_Iterative approach_ (pre-order)
```java
public void depthFirstSearch(Node root) {
	Stack<Node> stack = new Stack<>();
	Node current = root;
	stack.push(root);

	while (!stack.isEmpty()) {
		current = stack.pop();
        System.out.println(current.getValue());	 // Pre-order transversal
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
TODO:

[^1]: In computer science, exponential growth usually occurs as a consequence of discrete processes like the _divide-and-conquer_ algorithms or in manipulation of binary values. Consequently, we typically use base _2_ in logarithmic functions, since it just arises so frequently, meaning that _log<sub>2</sub> n_ is simplified to _log n_.
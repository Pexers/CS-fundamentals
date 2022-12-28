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
|_O(log n)_[^1]|Logarithmic Time|The running time grows in proportion to the logarithm of the input size, meaning that the time barely increases as you exponentially increase the input. The time increases approximately by a constant amount when the number of input elements doubles.<br/><sub>E.g. binary search, finding largest/smallest number in a binary search tree, etc. |
|_O(n)_|Linear Time|The time grows linearly with the number of input elements _n_. If _n_ doubles, the time approximately doubles too. "Approximately" because the time may also include components with lower complexity classes that are omitted in the notation.<br/><sub>E.g. forEach / map / reduce run through the entire collection, comparing two strings, checking for palindrome, etc.</sub>|
|_O(n log n)_|Log-linear Time|A combination of linear and logarithmic complexity. Sorting algorithms that utilize a _divide-and-conquer_ strategy are _linearithmic_.<br/><sub>E.g. merge sort, heap sort, etc. |
|_O(n<sup>2</sup>)_|Quadratic Time|The time grows linearly to the square of the number of input elements.<br/><sub>E.g. bubble sort, insertion sort, selection sort, {1.._n_} nested loops, etc.|

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209826182-d619af3d-45ec-477b-87a5-a4e157d215e6.png" width="470">
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
	for (int n : numbers) {  // O(n)
		System.out.println(n);  // O(1)
	}

	for (int first : numbers) {  // O(n^2)
		for (int second : numbers) {  // O(n)
			System.out.println(first + second);  // O(1)
		}
	}
}
```

### Space complexity

#### _Calculation_

## Search Algorithms

## Sorting Algorithms


[^1]: In computer science, exponential growth usually occurs as a consequence of discrete processes like the _divide-and-conquer_ algorithms or in manipulation of binary values. Consequently, we typically use _log<sub>2</sub> n_ as a logarithmic function, since it just arises so frequently. In terms of computational complexity, all the bases are the same as they differ by a constant, so it's actually irrelevant which base we choose.
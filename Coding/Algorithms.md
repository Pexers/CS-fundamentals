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
Sometimes we want to optimize code for using less memory, in addition to using less runtime. Talking about space complexity, or memory cost, is very similar to talking about time cost. We simply look at the total size of any new variables we're allocating with respect to the size of the input.

#### _Calculation_

|Data type|Size|Description|
|:---:|:---:|---|
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

	private void foo(Object param) {  // Stack, foo method block
		String str = param.toString();  // 'str' reference in Stack, String object in Heap (within the String pool)
		System.out.println(str);
	}  // Method block becomes free in Stack

}
```

## Search Algorithms

## Sorting Algorithms


[^1]: In computer science, exponential growth usually occurs as a consequence of discrete processes like the _divide-and-conquer_ algorithms or in manipulation of binary values. Consequently, we typically use base _2_ in logarithmic functions, since it just arises so frequently, meaning that _log<sub>2</sub> n_ is simplified to _log n_.
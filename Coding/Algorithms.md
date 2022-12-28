<h1 align='center'>Algorithms</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

TODO: An algorithm is a set of well-defined instructions to solve a particular problem.

## Big-O Notation
Big-O notation is a formal expression of an algorithm’s complexity in relation to the growth of the input size. Hence, it is used to rank algorithms based on their performance with large inputs.

We can express it as the best, average, and worst-case complexity of an algorithm. Most discussions of Big-O focus on the "upper-bound" complexity of an algorithm, that is, the worst-case.

### Time complexity

|Notation|Meaning|Description|
|---|---|---|
|_O(1)_|Constant Time|The runtime is constant, regardless of the size of the input.<br/><sub>E.g. indexing an array, fetching from hash map given a key, returning a value from a function, etc.</sub>|
|_O(log n)_[^1]|Logarithmic Time|The running time grows in proportion to the logarithm of the input size, meaning that the time barely increases as you exponentially increase the input. The time increases approximately by a constant amount when the number of input elements doubles.<br/><sub>E.g. binary search, finding largest/smallest number in a binary search tree, etc. |
|_O(n)_|Linear Time|The time grows linearly with the number of input elements _n_. If _n_ doubles, the time approximately doubles too. "Approximately" because the time may also include components with lower complexity classes that are omitted in the notation.<br/><sub>E.g. forEach / map / reduce run through the entire collection, comparing two strings, checking for palindrome, etc.</sub>|
|_O(n log n)_|Log-linear Time|A combination of linear and logarithmic complexity. Sorting algorithms that utilize a _divide and conquer_ strategy are _linearithmic_.<br/><sub>E.g. merge sort, heap sort, etc. |
|_O(n<sup>2</sup>)_|Quadratic Time|The time grows linearly to the square of the number of input elements.<br/><sub>E.g. bubble sort, insertion sort, selection sort, {1.._n_} nested loops, etc.|

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/209826182-d619af3d-45ec-477b-87a5-a4e157d215e6.png" width="470">
</p>

[^1]: TODO: In computer science, we . In terms of computational complexity, all the bases are the same as they differ by a constant. So it's actually irrelevant which base we choose. or _O(lg n)_

### Space complexity

## Search Algorithms

## Sorting Algorithms
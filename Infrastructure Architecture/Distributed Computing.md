> **Note**  
> Work in progress.

Fault Tolerance — a cluster of ten machines across two data centers is inherently more fault-tolerant than a single machine. Even if one data center catches on fire, your application would still work.

Low Latency — The time for a network packet to travel the world is physically bounded by the speed of light. For example, the shortest possible time for a request‘s round-trip time (that is, go back and forth) in a fiber-optic cable between New York to Sydney is 160ms. Distributed systems allow you to have a node in both cities, allowing traffic to hit the node that is closest to it.

The fallacies are:

1. The network is reliable;
2. Latency is zero;
3. Bandwidth is infinite;
4. The network is secure;
5. Topology doesn't change;
6. There is one administrator;
7. Transport cost is zero;
8. The network is homogeneous.

CAP Theorem
Consistency — What you read and write sequentially is what is expected (remember the gotcha with the database replication a few paragraphs ago?)
Availability — the whole system does not die — every non-failing node always returns a response.
Partition Tolerant — The system continues to function and uphold its consistency/availability guarantees in spite of network partitions

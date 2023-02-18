> **Note**  
> Work in progress.

Message broker models:
- Point-to-point messaging: This is the distribution pattern utilized in message queues with a one-to-one relationship between the message's sender and receiver. Each message in the queue is sent to only one recipient and is consumed only once. Point-to-point messaging is called for when a message must be acted upon only one time. Examples of suitable use cases for this messaging style include payroll and financial transaction processing. In these systems, both senders and receivers need a guarantee that each payment will be sent once and once only.
- Publish/subscribe messaging: In this message distribution pattern, often referred to as “pub/sub,” the producer of each message publishes it to a topic, and multiple message consumers subscribe to topics from which they want to receive messages. All messages published to a topic are distributed to all the applications subscribed to it. This is a broadcast-style distribution method, in which there is a one-to-many relationship between the message's publisher and its consumers. If, for example, an airline were to disseminate updates about the landing times or delay status of its flights, multiple parties could make use of the information: ground crews performing aircraft maintenance and refueling, baggage handlers, flight attendants and pilots preparing for the plane's next trip, and the operators of visual displays notifying the public. A pub/sub messaging style would be appropriate for use in this scenario.


Popular tools:
RabbitMQ
IBM MQ
Apache Kafka - usa pub/sub
Amazon SQS
Red Hat AMQ
Google Cloud Pub/Sub

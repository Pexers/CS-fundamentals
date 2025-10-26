<h1 align='center'>Object-Oriented Programming</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code to manipulate that data. OOP helps organize software design around data, or objects, rather than functions and logic. It is widely used in modern software development for its modularity, reusability, and scalability.

## Core Concepts
### Object
An object is an instance of a class that encapsulates data and behavior. Objects interact with one another and represent real-world entities in software.

```java
// Example: Creating an object
class Car {
	String model;
	void drive() {
		System.out.println("Driving " + model);
	}
}

Car myCar = new Car();
myCar.model = "Toyota";
myCar.drive();
```

### Class
A class is a blueprint for creating objects. It defines the attributes (data) and methods (behavior) that its objects will have.

```java
// Example: Defining a class
class Animal {
	String name;
	void speak() {
		System.out.println(name + " makes a sound.");
	}
}
```

### Inheritance
Inheritance allows a class (subclass/derived/child) to inherit properties and methods from another class (superclass/base/parent). This promotes code reuse and hierarchical relationships.

```java
// Example: Inheritance
class Animal {
	void eat() {
		System.out.println("Animal eats.");
	}
}

class Dog extends Animal {
	void bark() {
		System.out.println("Dog barks.");
	}
}

Dog d = new Dog();
d.eat(); // Inherited method
d.bark(); // Dog's own method
```

### Polymorphism
Polymorphism enables objects of different classes to be treated as objects of a common superclass. It allows methods to be used interchangeably, providing flexibility and dynamic behavior.

```java
// Example: Polymorphism
class Animal {
	void speak() {
		System.out.println("Animal speaks.");
	}
}

class Cat extends Animal {
	void speak() {
		System.out.println("Cat meows.");
	}
}

Animal a = new Cat();
a.speak(); // Output: Cat meows.
```

### Abstraction
Abstraction hides complex implementation details and exposes only the necessary features of an object. It simplifies interaction and reduces complexity.

```java
// Example: Abstraction using abstract class
abstract class Shape {
	abstract void draw();
}

class Circle extends Shape {
	void draw() {
		System.out.println("Drawing a circle.");
	}
}

Shape s = new Circle();
s.draw();
```

### Encapsulation
Encapsulation restricts direct access to some of an object's components, protecting the integrity of the data. It is achieved by using access modifiers (private, protected, public).

```java
// Example: Encapsulation
class Person {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

Person p = new Person();
p.setName("Alice");
System.out.println(p.getName());
```

### Interface
An interface defines a contract of methods that implementing classes must provide, without specifying how these methods are implemented. Interfaces enable abstraction and polymorphism, allowing unrelated classes to implement the same set of behaviors.

```java
// Example: Interface
interface Drawable {
	void draw();
}

class Square implements Drawable {
	public void draw() {
		System.out.println("Drawing a square.");
	}
}

Drawable d = new Square();
d.draw();
```

## Terminology
- **subclass = derived class = child class:** These terms are equivalent and refer to a class that inherits from another class.
- **superclass = base class = parent class:** These terms are equivalent and refer to the class being inherited from.
- **concrete class:** A class that can be instantiated (i.e., you can create objects from it). It provides implementations for all its methods.

## Library vs Package vs Dependency
- **Library:** A collection of pre-written code that provides functionality for use in programs. Libraries are typically imported and used directly.
- **Package:** A way to organize related modules or libraries, often distributed as a single unit. In some languages, packages also provide namespaces.
- **Dependency:** Any external code (library, package, framework) that a project relies on to function. Dependencies must be managed and installed for the project to work correctly.

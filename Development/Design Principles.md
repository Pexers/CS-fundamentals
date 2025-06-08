<h1 align='center'>Design Principles</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

The application's success is inevitably dependent on the software engineers' willingness to use these best practices for software development introduced by some of the well-known and experienced industry experts.

There are many different software development principles that can help in creating an application by maintaining the code clean. These principles should be constantly implied by software developers from time to time for the seamless evolvement of projects.

## 1. SOLID
The broad goal of the SOLID principles is to reduce dependencies so that engineers can change one area of software without impacting others. Additionally, they're intended to make designs easier to understand, maintain, and extend. Ultimately, using these design principles makes it easier for software engineers to avoid issues and to build adaptive, effective, and agile software.

The SOLID principles were developed by Robert C. Martin in a 2000 essay, "_Design Principles and Design Patterns_", although the acronym was coined later by Michael Feathers.

1. **Single Responsibility**. "_A class should have one and only one reason to change, meaning that a class should have only one job._"
It is as simple as it sounds, meaning that every class or module should come with its own responsibility for a single part of the software's functionality. Merge conflicts appear when different teams change the same file. But if the SRP is followed, fewer conflicts will appear – files will only have a single reason to change, and conflicts that do exist will be easier to resolve.
2. **Open-Closed**. Requires that classes should be open for extension and closed to modification. Which means that we should be able to add new functionality without touching the existing class code. This is because whenever we modify the existing code, there's a risk of creating potential bugs. We should avoid touching the tested and reliable (mostly) production code if possible.
3. **Liskov Substitution**. Requires that every subclass should be substitutable for its superclass. This is the expected behavior, since when using inheritance we assume that the child class inherits everything that the parent class has. The child class extends the behavior but never narrows it down. We can think of the methods defined in the parent class as defining a contract. Every derived class is expected to stick to this contract. If a child class does not adhere to the parent's contract, it's violating the LSP.
4. **Interface Segregation**. States that many client-specific interfaces are better than one general-purpose interface. Clients should not be forced to implement a function they do not need.
5. **Dependency Inversion**. States that classes should depend upon interfaces or abstract classes, instead of concrete classes and functions. In other words,high level modules should not depend upon low level modules, both should depend on abstractions. If you consequently apply the Open-Closed Principle and the LSP to your code, it will also follow the DIP.

## 2. DRY - Don't Repeat Yourself
Popularized by the book "_The Pragmatic Programmer_", the DRY principle states that "_every piece of knowledge must have a single, unambiguous, authoritative representation within a system_."

The main goal of DRY is to reduce repetition of code, logic, and data, thereby lowering technical debt and making systems easier to maintain. When code is duplicated, bugs and inconsistencies are more likely to occur, and changes become harder to manage.

**How to apply DRY:**
- Extract repeated code into functions, classes, or modules.
- Use configuration files or constants for repeated values.
- Leverage frameworks and libraries to avoid reinventing the wheel.
- Refactor similar logic into reusable components.

## 3. KISS - Keep It Simple, Stupid
The KISS principle is about striving for simplicity. Modern programming languages, frameworks and APIs have powerful means to create sophisticated solutions for various kinds of problems. Sometimes developers might feel tempted to write "clever" solutions that use all these complex features. The KISS principle states that a solution is better when it uses less inheritance, less polymorphism, fewer classes, etc.

A solution that follows the KISS principle might look boring or even “stupid” but simple and understandable. The KISS principle states that there is no value in a solution being "clever" but being easily understandable. This does not mean that features like inheritance and polymorphism should not be used at all. Rather they should only be used when they are necessary or there is some substantial advantage.

This is a very general principle, so there is a large variety of possible strategies to adhere more to this principle largely depending on the given design problem:
- Avoid inheritance, polymorphism, dynamic binding and other complicated OOP concepts. Use delegation and simple if-constructs instead.
- Avoid low-level optimization of algorithms, especially when involving Assembler, bit-operations, and pointers when slower implementations will work just fine.
- Avoid numerous classes and methods as well as large code blocks.
- For slightly unrelated but rather small pieces of functionality use private methods instead of an additional class.

## 4. YAGNI - You Aren't Gonna Need It
The YAGNI principle states that features should only be added when required. It helps developers avoid wasted effort on features that are assumed to be needed at some point in the future.

The main difference compared to KISS is that YAGNI focuses on removing unnecessary functionality and logic, while KISS focuses on avoiding complexity for simplicity reasons.

## 5. SoC - Separation of Concerns
Separation of Concerns (SoC) is a fundamental design principle that advocates for organizing a software system so that each part addresses a distinct concern or responsibility. A "concern" is any piece of interest or focus in a program—such as data storage, user interface, business logic, or security.

By separating concerns, you make your codebase easier to understand, maintain, and extend. Changes in one part of the system are less likely to impact others, reducing the risk of bugs and making collaboration easier. For example, in a web application, keeping the logic for handling HTTP requests separate from database access logic is an application of SoC.

Common ways to implement SoC include using layers (such as presentation, business, and data layers), modules, or services that each handle a specific aspect of the application.

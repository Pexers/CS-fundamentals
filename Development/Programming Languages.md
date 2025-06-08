> [!NOTE]  
> Work in progress.

#### Compiled Languages
Compiled languages are converted directly into machine code that the processor can execute. As a result, they tend to be faster and more efficient to execute than interpreted languages. They also give the developer more control over hardware aspects, like memory management and CPU usage. Compiled languages need a "build" step – they need to be manually compiled first. You need to "rebuild" the program every time you need to make a change. 

Pure compiled languages:
- C
- C++
- Rust
- Go: the Go compiler turns the code into bytes ready to execute on a system which can run compiled C code.

#### Interpreted Languages
An interpreted language is one where the instructions are not directly executed by the target machine, but instead read and executed by some other program (which normally is written in the language of the native machine). Interpreted languages were once significantly slower than compiled languages. However, with the development of just-in-time compilation, that gap has been shrinking.

Common interpreted languages:
- PHP
- Ruby
- Python (can be compiled)
- JavaScript

#### Languages that are both Compiled and Interpreted
Most programming languages can have both compiled and interpreted implementations – the language itself is not necessarily compiled or interpreted. However, for simplicity's sake, they're typically referred to as such.

Python, for example, can be executed as either a **compiled program** or as an **interpreted language in interactive mode**. On the other hand, most command line tools, CLIs, and shells can theoretically be classified as interpreted languages.

- C#: IL files
- Java: its source code is first compiled into a binary byte-code. This byte-code runs on the Java Virtual Machine (JVM), which is usually a software-based interpreter.
- Kotlin


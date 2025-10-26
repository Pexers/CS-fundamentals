<h1 align='center'>Data Serialization Languages</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

Data serialization languages are formats used to encode data structures or objects so they can be stored, transmitted, and reconstructed later. They are essential for data exchange between systems, APIs, and configuration files.

### Common Data Serialization Languages

- **BSON (Binary JSON):**
	- Binary-encoded serialization of JSON-like documents.
	- Used by MongoDB for efficient storage and retrieval.

- **JSON (JavaScript Object Notation):**
	- Lightweight, human-readable, and easy to parse.
	- Commonly used in web APIs and configuration files.
	- Supports objects, arrays, numbers, strings, booleans, and null.

- **Protocol Buffers (protobuf):**
	- Language-neutral, platform-neutral, extensible binary format developed by Google.
	- Requires schema definition; used for high-performance communication between services.

- **TOML (Tom's Obvious, Minimal Language):**
	- Minimal, human-readable configuration file format.
	- Supports hierarchical data using tables and arrays.
	- Popular in Rust and Python projects for configuration.

- **XML (eXtensible Markup Language):**
	- Text-based, hierarchical, and self-descriptive.
	- Widely used for document storage and data interchange.
	- Verbose but highly flexible.

- **YAML (YAML Ain't Markup Language):**
	- Human-friendly, indentation-based format.
	- Supports complex data structures and multiple documents.
	- Commonly used for configuration files (e.g., Docker Compose, Kubernetes).


### BSON Example
BSON is a binary format, but its structure is similar to JSON. Example (conceptual):
```
{
	name: "John Doe",
	age: 30,
	languages: ["Python", "JavaScript", "Go"]
}
```
Actual BSON is not human-readable, but tools like MongoDB use this structure internally.

### JSON Example
```json
{
	"name": "John Doe",
	"age": 30,
	"languages": ["Python", "JavaScript", "Go"]
}
```

### Protocol Buffers Example
Protocol Buffers require a schema definition. Example schema and data:

**Schema (person.proto):**
```proto
syntax = "proto3";
message Person {
	string name = 1;
	int32 age = 2;
	repeated string languages = 3;
}
```

### TOML Example
```toml
name = "John Doe"
age = 30
languages = ["Python", "JavaScript", "Go"]
```

### XML Example
```xml
<person>
	<name>John Doe</name>
	<age>30</age>
	<languages>
		 <language>Python</language>
		 <language>JavaScript</language>
		 <language>Go</language>
	</languages>
</person>
```

### YAML Example
YAML documents start with three dashes (`---`), indicating the beginning of a new document. YAML supports multiple documents in a single file, separated by these dashes.

```yaml
---
name: John Doe
age: 30
languages:
	- Python
	- JavaScript
	- Go
```

Compliant YAML parsers recognize each set of dashes as the start of a new document.

**Serialized Data (binary, not human-readable):**
The data is encoded in a compact binary format after compiling the schema.

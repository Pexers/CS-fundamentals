<h1 align='center'>Domain Name System</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

The **Domain Name System (DNS)** is a hierarchical and distributed naming system that translates human-readable domain names, such as `www.example.com`, into machine-readable IP addresses, such as `93.184.216.34`. It is often described as the "phonebook of the Internet" because it allows users to access resources using memorable names instead of numeric addresses.

DNS operates on a client-server model using the **UDP** protocol on port **53** for standard queries, with **TCP** port **53** used for zone transfers and large responses.

## How DNS Works

At its core, DNS maps domain names to IP addresses through a globally distributed database of records. When a user enters a domain name into a browser, a DNS resolver is responsible for finding the corresponding IP address by querying multiple DNS servers on behalf of the client.

Key components include:

- **DNS Resolver**: A server that receives queries from clients and recursively resolves them by querying other DNS servers.
- **Root Name Server**: The top-level DNS server that directs queries to the appropriate TLD name server.
- **TLD Name Server**: Manages domains under a specific top-level domain, such as `.com`, `.org`, or `.net`.
- **Authoritative Name Server**: Holds the actual DNS records for a domain and provides definitive answers.

## DNS Namespace Hierarchy

The DNS namespace is structured as an inverted tree, read from right to left:

```
www.example.com.
│   │       │   │
│   │       │   └── Root domain (implied trailing dot)
│   │       └────── Top-Level Domain (TLD): .com
│   └────────────── Second-Level Domain: example
└────────────────── Subdomain/Host: www
```

- **Root Domain** (`.`): The highest level of the DNS hierarchy, managed by root name servers.
- **Top-Level Domain (TLD)**: Domains such as `.com`, `.org`, `.net`, and country-code TLDs like `.uk` or `.de`.
- **Second-Level Domain**: The domain name registered by an individual or organization, such as `example` in `example.com`.
- **Subdomain**: A subdivision of a domain, such as `www`, `mail`, or `api`.

## DNS Record Types

DNS records are entries stored on authoritative name servers that provide information about a domain. The most common record types are described below.

### A Record

An **A record** maps a domain name to an IPv4 address.

```
example.com.    IN    A    93.184.216.34
```

Use an A record when you want a hostname to resolve directly to an IPv4 address.

### AAAA Record

An **AAAA record** (quad-A record) maps a domain name to an IPv6 address.

```
example.com.    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946
```

### CNAME Record

A **CNAME record** (Canonical Name record) maps one domain name to another, instead of pointing directly to an IP address. It is commonly used to alias one name to another.

```
www.example.com.    IN    CNAME    example.com.
```

> [!IMPORTANT]
> A CNAME record cannot coexist with other records for the same name. Additionally, CNAME records should not be placed at the root of a domain (apex); use an **ALIAS** or **ANAME** record if your DNS provider supports it.

### MX Record

An **MX record** (Mail Exchange record) specifies the mail servers responsible for receiving email on behalf of a domain. MX records include a priority value, where lower numbers indicate higher priority.

```
example.com.    IN    MX    10    mail.example.com.
example.com.    IN    MX    20    mail2.example.com.
```

### NS Record

An **NS record** (Name Server record) delegates a domain or subdomain to a set of authoritative name servers.

```
example.com.    IN    NS    ns1.example.com.
example.com.    IN    NS    ns2.example.com.
```

### PTR Record

A **PTR record** (Pointer record) maps an IP address back to a domain name. It is primarily used for reverse DNS lookups, often for email anti-spam verification.

```
34.216.184.93.in-addr.arpa.    IN    PTR    example.com.
```

### SOA Record

An **SOA record** (Start of Authority record) provides administrative information about a DNS zone, including the primary name server, the responsible administrator's email, and timing parameters for zone transfers and caching.

```
example.com.    IN    SOA    ns1.example.com. admin.example.com. (
                        2024010101  ; Serial
                        3600        ; Refresh
                        1800        ; Retry
                        604800      ; Expire
                        86400       ; Minimum TTL
)
```

### TXT Record

A **TXT record** (Text record) stores arbitrary text information associated with a domain. It is commonly used for domain verification, SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC policies.

```
example.com.    IN    TXT    "v=spf1 include:_spf.example.com ~all"
```

### SRV Record

An **SRV record** (Service record) defines the hostname and port number for specific services, such as SIP or XMPP.

```
_sip._tcp.example.com.    IN    SRV    10 5 5060 sipserver.example.com.
```

### CAA Record

A **CAA record** (Certification Authority Authorization record) specifies which certificate authorities are permitted to issue SSL/TLS certificates for a domain.

```
example.com.    IN    CAA    0 issue "letsencrypt.org"
```

## DNS Resolution Process

When a client requests the IP address for `www.example.com`, the following steps occur:

1. **Client Query**: The client sends a query to its configured DNS resolver, typically provided by the operating system or local network.
2. **Resolver Cache**: The resolver checks its cache for a recent answer. If found, it returns the result immediately.
3. **Root Server Query**: If the answer is not cached, the resolver queries a root name server for the `.com` TLD name servers.
4. **TLD Server Query**: The resolver queries a `.com` TLD server for the authoritative name servers of `example.com`.
5. **Authoritative Server Query**: The resolver queries the authoritative name server for `example.com`, which returns the A record for `www.example.com`.
6. **Response to Client**: The resolver caches the result and returns the IP address to the client.

This process is known as **recursive resolution**, while the queries between resolver and authoritative servers are called **iterative queries**.

## DNS Caching and TTL

DNS responses are cached at multiple levels to improve performance and reduce load on authoritative servers:

- **Browser Cache**: Modern browsers cache DNS records for a short period.
- **Operating System Cache**: The OS maintains a local DNS cache.
- **Resolver Cache**: DNS resolvers cache responses based on the record's TTL value.

The **Time To Live (TTL)** is a value in seconds that tells caches how long a DNS record should be considered valid. After the TTL expires, the cache must query the authoritative server again for an updated value.

> [!TIP]
> Lower TTL values allow faster propagation of DNS changes but increase query load. Higher TTL values reduce query load but slow down propagation.

## DNSSEC

**DNSSEC** (Domain Name System Security Extensions) adds a layer of security to DNS by enabling cryptographic verification of DNS responses. It protects against attacks such as DNS spoofing and cache poisoning by allowing resolvers to verify that DNS data has not been tampered with and originates from the legitimate authoritative source.

DNSSEC uses digital signatures and public-key cryptography but does not encrypt DNS traffic itself.

## Common DNS Tools

Several command-line tools are useful for querying and troubleshooting DNS:

- **`dig`**: A flexible DNS lookup utility.
  ```bash
  dig www.example.com A
  ```
- **`nslookup`**: A simple tool for querying DNS records.
  ```bash
  nslookup www.example.com
  ```
- **`host`**: A straightforward utility for DNS lookups.
  ```bash
  host www.example.com
  ```
- **`whois`**: Retrieves domain registration information.
  ```bash
  whois example.com
  ```

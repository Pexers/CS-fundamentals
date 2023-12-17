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

---

Forward Proxy vs. Reverse Proxy
A forward proxy, often called a proxy, proxy server, or web proxy, is a server that sits in front of a group of client machines. When those computers make requests to sites and services on the Internet, the proxy server intercepts those requests and then communicates with web servers on behalf of those clients, like a middleman.
- Avoid institutional browsing restrictions: some governments, schools, and other organizations use firewalls to give their users access to a limited version of the Internet. A forward proxy can be used to get around these restrictions, as they let the user connect to the proxy rather than directly to the sites they are visiting.
- Block access to certain content:  proxies can also be set up to block a group of users from accessing certain sites. For example, a school network might be configured to connect to the web through a proxy which enables content filtering rules, refusing to forward responses from Facebook and other social media sites.
- Protect identity online: in some cases, regular Internet users simply desire increased anonymity online, but in other cases, Internet users live in places where the government can impose serious consequences to political dissidents. Criticizing the government in a web forum or on social media can lead to fines or imprisonment for these users. If one of these dissidents uses a forward proxy to connect to a website where they post politically sensitive comments, the IP address used to post the comments will be harder to trace back to the dissident. Only the IP address of the proxy server will be visible.

A reverse proxy is a server that sits in front of web servers and forwards client (e.g. web browser) requests to those web servers. Reverse proxies are typically implemented to help increase security, performance, and reliability.

- Load balancing - A popular website that gets millions of users every day may not be able to handle all of its incoming site traffic with a single origin server. Instead, the site can be distributed among a pool of different servers, all handling requests for the same site. In this case, a reverse proxy can provide a load balancing solution which will distribute the incoming traffic evenly among the different servers to prevent any single server from becoming overloaded. In the event that a server fails completely, other servers can step up to handle the traffic.
- Protection from attacks - With a reverse proxy in place, a web site or service never needs to reveal the IP address of their origin server(s). This makes it much harder for attackers to leverage a targeted attack against them, such as a DDoS attack. Instead the attackers will only be able to target the reverse proxy, which will have tighter security and more resources to fend off a cyber attack.
- Global Server Load Balancing (GSLB) - In this form of load balancing, a website can be distributed on several servers around the globe and the reverse proxy will send clients to the server that's geographically closest to them. This decreases the distances that requests and responses need to travel, minimizing load times.
- Caching - A reverse proxy can also cache content, resulting in faster performance. For example, if a user in Paris visits a reverse-proxied website with web servers in Los Angeles, the user might actually connect to a local reverse proxy server in Paris, which will then have to communicate with an origin server in L.A. The proxy server can then cache (or temporarily save) the response data. Subsequent Parisian users who browse the site will then get the locally cached version from the Parisian reverse proxy server, resulting in much faster performance.
- SSL encryption - Encrypting and decrypting SSL (or TLS) communications for each client can be computationally expensive for an origin server. A reverse proxy can be configured to decrypt all incoming requests and encrypt all outgoing responses, freeing up valuable resources on the origin server.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/226172537-9465e191-ac6a-4ba0-a3cb-b85986527234.jpg" width="570">
</p>

Why is it called 'reversed' proxy?
While a forward proxy proxies on **behalf of clients** (or requesting hosts), a reverse proxy proxies **on behalf of servers**. In forward we protect the clients, while in reverse, we're protecting the servers.

Forward Proxy vs VPN
A VPN and proxy server both mask the IP address. But a VPN will also encrypt the data you send and receive, something that a proxy server doesn't do. If you are already using a VPN, then, connecting to a website or app through a proxy server would be an unnecessary step.

### Certbot cheatsheet
```sh
# List certificates
$ certbot certificates

# Obtain a new SSL certificate
$ certbot certonly --nginx --non-interactive --keep-until-expiring --agree-tos --no-eff-email --email EMAIL --domain DOMAIN_1 --domain DOMAIN_2

# Delete certificate from system
$ certbot delete --cert-name DOMAIN
```

### NGINX cheatsheet
```sh
$ nginx -t && nginx -s reload
```

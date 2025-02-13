> **Note**  
> Work in progress.

The Internet is a vast, sprawling collection of networks that connect to each other. In fact, the word "Internet" could be said to come from this concept: interconnected networks.

Since computers connect to each other within networks and these networks also all connect with each other, one computer can talk to another computer in a faraway network thanks to the Internet. This makes it possible to rapidly exchange information between computers across the world.

#### Physical infrastructure
A lot of different kinds of hardware and infrastructure go into making the Internet work for everyone. Some of the most important types include the following:

- **Routers**: forward packets to different computer networks based on their destination. Routers are like the traffic cops of the Internet, making sure that Internet traffic goes to the right networks.
- **Switches**: connect devices that share a single network. They use packet switching to forward packets to the correct devices. They also receive outbound packets from those devices and pass them along to the right destination.
- **Web servers**: specialized high-powered computers that store and serve content (webpages, images, videos) to users, in addition to hosting applications and databases. Servers also respond to DNS queries and perform other important tasks to keep the Internet up and running. Most servers are kept in large data centers, which are located throughout the world.

Consider this document. In order for you to see it, it was sent over the Internet piece by piece in the form of several thousand data packets. These packets traveled over cables and radio waves and through routers and switches from a web server to your computer or device. The specific steps involved in this process are:
1. _DNS query_: When your browser started to load this webpage, it likely first made a DNS query to find out the website's IP address.
2. _TCP handshake_: Your browser opened a connection with that IP address.
3. _TLS handshake_: Your browser also set up encryption between a web server and your device so that attackers cannot read the data packets that travel between those two endpoints.
4. _HTTP request_: Your browser requested the content that appears on this webpage.
5. _HTTP response_: A server transmitted the content in the form of HTML, CSS, and JavaScript code, broken up into a series of data packets. Once your device received the packets and verified it had received all of them, your browser interpreted the HTML, CSS, and JavaScript code contained in the packets to render this document.

#### Public Vs Private IP Addresses
The main difference between public and private IP addresses is how far they reach, and what they're connected to. A public IP address identifies you to the wider internet so that all the information you're searching for can find you. A private IP address is used within a private network to connect securely to other devices within that same network.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/222959414-c82ad031-6768-4665-aa87-17617ea7f84f.png" width="400">
</p>

|Public IP address|Private IP address|
|---|---|
|External (global) reach.|Internal (local) reach.|
|Used for communicating outside your private network, over the internet.|Used for communicating within your private network, with other devices in your home or office.|
|A unique numeric code never reused by other devices.|A non-unique numeric code that may be reused by other devices in other private networks.|
|Found by Googling: "What is my IP address?".|Found via your device's internal settings.|
|Assigned and controlled by your internet service provider.|Assigned to your specific device within a private network.|
|Not free.|Free.|
|Any number not included in the reserved private IP address range.</br>Example: 8.8.8.8|Class A: 10.0.0.0 — 10.255.255.255</br>Class B: 172.16.0.0 — 172.31.255.255</br>Class C: 192.168.0.0 — 192.168.255.255</br>Example: 10.11.12.13|

## URI vs URL vs Domain
- **URI** (Uniform Resource Identifier): any identifier of a specific resource of the internet. Like a page, or book, or a document.
- **URL** (Uniform Resource Locator): a type of URI, that not only identifies a resource but also provides a way to access it through a scheme (protocol).
- **Domain**: the core part of a web address that identifies the website. It serves as an easy-to-remember alias for an IP address.

_Example_
```sh
# URI
mailto:someone@example.com

# URL
https://www.example.com.pt
sftp://username@hostname:/path/to/file
file://C:/Users/Username/Documents/file.txt # Local file address

# Domain
www.example.com.pt
```
```sh
# URL 
{scheme}://{sub-domain}.{second-level-domain}.{top-level-domain}.{country-code-top-level-domain}:{port}/{path}
```

1. Scheme/Protocol/Method: `HTTPS`, `SFTP`, `MTQP`, etc.
2. [optional] Sub-domain: `www`
3. Second-level domain (SLD): `example`, `google`
4. Top-level domain (TLD): `.com`, `.dev`
5. [optional] Country code top-level domain: `.pt`, `.de`
    - Some countries have multiple TLDs for different purposes: `gov.pt` (government), `edu.pt` (educational institutions)
6. Port: can be any port, but most commons are `80` for HTTP, `443` for HTTPS
7. Path: path to the web resource

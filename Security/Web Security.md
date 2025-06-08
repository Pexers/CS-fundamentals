<h1 align='center'>Web Security</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

> [!NOTE]
> Work in progress.

## HTTPS
- HTTPS uses an encryption protocol to encrypt communications. The protocol is called Transport Layer Security (TLS), although formerly it was known as Secure Sockets Layer (SSL). This protocol secures communications by using what's known as an asymmetric public key infrastructure. This type of security system uses two different keys to encrypt communications between two parties:
    - The private key: this key is controlled by the owner of a website and it's kept, as the reader may have speculated, private. This key lives on a web server and is used to decrypt information encrypted by the public key.
    - The public key: this key is available to everyone who wants to interact with the server in a way that's secure. Information that's encrypted by the public key can only be decrypted by the private key.
- CORS
- CSP

### Certbot cheatsheet
```sh
# List certificates
$ certbot certificates

# Obtain a new SSL certificate via IP
$ certbot certonly --nginx --non-interactive --keep-until-expiring --agree-tos --no-eff-email --email EMAIL --domain DOMAIN_1 --domain DOMAIN_2

# Obtain a new SSL certificate via DNS/ACME challenge
$ certbot certonly --manual --preferred-challenges dns --keep-until-expiring --agree-tos --no-eff-email --email EMAIL --domain DOMAIN_1

# Delete certificate from system
$ certbot delete --cert-name DOMAIN
```

## Sub-domain discovery
1. Active: brute forcing domains, crawlers that collect data from websites.
2. Public certificate APIs: they simply collect, index, and provide searchable access to Certificate Transparency (CT) logs/data (Google's CT Log API, Let's Encrypt CT Log, ...). These services are many times paid, or require a subscription, some examples are: [crt.sh](https://crt.sh/), [Censys.io](https://censys.io/).
    - To avoid finding out all subdomains, each with a dedicated certificate, from a certain domain, it's advised to use a Load Balancer to which a single certificate is issued/assigned, using a subdomain wildcard. The consequences of not applying this technique is that a malicious entity can easily find all subdomains that belong to a company's domain, and start a DDoS on those.
3. A Passive DNS (pDNS) API: helps discover subdomains by querying historical DNS records collected from various sources like DNS resolvers, sensors, and network traffic logs. This method does not actively scan or probe a target but instead leverages previously observed DNS resolution data.

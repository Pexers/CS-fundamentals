> **Note**  
> Work in progress.

"The Internet is a vast network that connects computers all over the world. Through the Internet, people can share information and communicate from anywhere with an Internet connection. An Internet service provider (ISP) is an organization that provides services for accessing, using, managing, or participating in the Internet. It uses standard internet protocols, such as TCP/IP, HTTP, etc."

There are three types of port forwarding with SSH:

Local port forwarding: connections from the SSH client are forwarded via the SSH server, then to a destination server

Remote port forwarding: connections from the SSH server are forwarded via the SSH client, then to a destination server

Dynamic port forwarding: connections from various programs are forwarded via the SSH client, then via the SSH server, and finally to several destination servers

Local port forwarding is the most common type. For example, local port forwarding lets you bypass a company firewall that blocks Wikipedia.

Remote port forwarding is less common. For example, remote port forwarding lets you connect from your SSH server to a computer on your company's intranet.

Dynamic port forwarding is rarely used. For example, dynamic port forwarding lets you bypass a company firewall that blocks web access altogether. Although this is very powerful, it takes a lot of work to set up, and it's usually easier to use local port forwarding for the specific sites you want to access.
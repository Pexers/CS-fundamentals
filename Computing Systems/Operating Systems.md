> **Note**  
> Work in progress.

### Linux distributions

Given that Linux is open-source, that are many Linux Distributions (distros):
Ubuntu, Debian, Alpine, Fedora, CentOS, etc.

#### Linux Vs Unix
Linux is not Unix, but it is a Unix-like operating system. Linux system is derived from Unix and it is a continuation of the basis of Unix design. Linux distributions are the most famous and healthiest example of direct Unix derivatives.

### Linux privileges and permissions
TODO:
Using `sudo` allows regular users to run programs with the security privileges of the superuser or root. This list can be displayed using ...

File permissions:
- **r**: the read permission.
- **w**: the write permission.
- **x**: the execute permission.
- ``---``: means no permissions have been granted at all.

On each line, the first character identifies the type of entry that is being listed. If it is a dash (`-`) it is a file. If it is the letter `d`, it is a directory. The next nine characters represent the settings for the three sets of permissions.
```sh
$ ls -l
total 8
-rw-r--r-- 1 pedro 197613 163 Feb 10 18:47  Dockerfile
-rw-r--r-- 1 pedro 197613 999 Feb 10 18:38  lenpaste.js
-rw-r--r-- 1 pedro 197613 214 Feb 10 19:03  pipeline.sh
drwxr-xr-x 1 pedro 197613   0 Feb 10 17:24  pods/
```
- _First three characters_: show the permissions for the user who owns the file (user permissions). In line 1, these are the `rw-`.
- _Middle three characters_: show the permissions for members of the file's group (group permissions). In line 1, these are the `r--`.
- _Last three characters_: show the permissions for anyone not in the first two categories (other permissions). In line 1, these are the `r--`.

Who can we set the permissions for:
- **User (u)**: the owner of the file.
- **Group (g)**: the members of the group the file belongs to.
- **Others (o)**: the people not governed by the `u` and `g` permissions.
- **All (a)**: all of the above.

### Linux CLI cheat sheet
_Directory Operations_
```sh
# Make directory
$ mkdir DIR

# Remove directory
$ rmdir DIR

# Rename directory
$ mv DIR DIR_NEW_NAME

# Change directory to home directory
$ cd 

# Change directory to DIR
$ cd DIR

# Go up a directory
$ cd ..

# List all files. Include hidden: -a | Include sub-directories (recursively): -R | Include permission details: -l
$ ls -a -l -R

# Show current directory
$ pwd
```
_File Operations_
```sh
# Create empty file
$ touch FILE

# Delete file
$ rm FILE

# Rename file
$ mv FILE FILE_NEW_NAME

# Move file to a new location
$ mv FILE PATH

# Copy file
$ cp FILE1 FILE2

# Get type of file
$ file FILE

# Display file content
$ cat FILE

# Join FILE1 and FILE2 and store the output in FILE3
$ cat FILE1 FILE2 > FILE3
```
_File permissions_ TODO:
```sh
# Allows to change the permission of a file (Read, Write, Execute)
$ chmod

$ chown
```
_User management_
```sh
# Add a new user
$ sudo adduser USERNAME

# Change password of user
$ sudo passwd USERNAME
```
_Networking_
```sh
# Used to transfer data to or from a server, using any of the supported protocols 
$ curl -O DOMAIN  # -O is used to write output to a local file named like the remote file
$ curl -H 'Content-Type: application/json' \
    -d  '{"fruit" : "apple"}' \
    -X POST \
    DOMAIN
$ wget FILE_DOMAIN  # Retrieve files

# Login into a remote Linux machine using SSH
$ ssh USERNAME@IP_ADDRESS

# Used to display the route and the network interface
$ ifconfig

# Send ICMP echo requests to check the network connectivity. Stands for Packet INternet Groper
$ ping DESTINATION

# Check open ports. The '-tulpn' flags instruct netstat to display all the listening ports (0:::port)
$ netstat -tulpn
$ apt-get install -y net-tools  # Install net-tools

# Used in DNS lookup to query the DNS name server. It is also used to troubleshoot DNS related issues. Stands for Domain Information Groper
$ dig DOMAIN
$ nslookup DOMAIN  # Used for DNS related queries. It is the older version of dig

# It detects the delay and determines the pathway to a target 
$ traceroute DESTINATION
$ tracepath DESTINATION  # Similar to traceroute, however, it doesn't require root privileges

# Is the replacement for netstat command. Gives information about all TCP (-t), UDP (-u), and UNIX (-x) socket connections
$ ss -a

# Displays the domain name for a given IP address and IP address for a given hostname
$ host HOSTNAME
$ host IP_ADDRESS

# Used to view and add content to the kernel's Address Resolution Protocol (ARP) table
$ arp -n
```
_System operations_
```sh
# Clears the terminal
$ clear

# Gives a list of all past commands typed in the current terminal session
$ history

# Display hostname of the system
$ hostname

# Shows information of all logged in users
$ finger [USERNAME]

# List all environment variables
$ env

# Display value of environment variable
$ echo $VARIABLE

# Set value of environment variable
$ export VARIABLE=VALUE

# Create a new environment variable
$ VARIABLE=VALUE

# Remove environment variable
$ unset VARIABLE

# List all alises. Aliases are like custom shortcuts used to represent a command
$ alias
```

#### Bash Vs Shell
Bash (Bourne Again SHell) vs Shell
`#!/bin/bash`
`#!/bin/sh`

Which one to use?
Prefer sh for the following reasons:

- it is standardized
- it is much simpler and easier to learn
- it is portable across POSIX systems — even if they happen not to have bash, they are required to have sh.

There are advantages to using bash as well. Its features make programming more convenient and similar to programming in other modern programming languages. These include things like scoped local variables and arrays. Plain sh is a very minimalistic programming language.
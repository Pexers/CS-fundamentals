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
drwxrwxr-x  29  root  admin  928 Mar 10 17:09 Applications
drwxr-xr-x  69  root  wheel 2208 Mar 10 12:20 Library
drwxr-xr-x@ 10  root  wheel  320 Oct 18 13:36 System
drwxr-xr-x  5   root  admin  160 Mar 3  10:08 Users
drwxr-xr-x  3   root  wheel   96 Mar 10 23:57 Volumes
drwxr-xr-x@ 39  root  wheel 1248 Oct 18 13:36 bin
dr-xr-xr-x  4   root  wheel 4661 Mar 10 23:57 dev
lrwxr-xr-x@ 1   root  wheel   11 Oct 18 13:36 etc -> private/etc
```
- _First three characters_: show the permissions for the user who owns the file (user permissions). In line 1, these are the `rw-`.
- _Middle three characters_: show the permissions for members of the file's group (group permissions). In line 1, these are the `r--`.
- _Last three characters_: show the permissions for anyone not in the first two categories (other permissions). In line 1, these are the `r--`.

Who can we set the permissions for:
- **User (u)**: the owner of the file.
- **Group (g)**: the members of the group the file belongs to.
- **Others (o)**: the people not governed by the `u` and `g` permissions.
- **All (a)**: all of the above.

### Linux CLI cheatsheet
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
$ cd ~  # Does the same

# Change directory to DIR
$ cd DIR  # Current path
$ cd /DIR1/DIR2  # Change to any other path

# Go up a directory
$ cd ..

# List all files. Include hidden: [-a]. Include sub-directories (recursively): [-R]. Include permission details: [-l]
$ ls -a -l -R

# Show path of current directory
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

# Edit a file using VIM
# Enter letter [i] to switch from Command Mode to Insert Mode
# Enter letter [v] to switch from Command Mode to Visual Mode
# Enter [ESC] to switch back to Command Mode
# Copy/Paste: copy text using cursor selection / paste text by clicking on the mouse wheel 
$ vim FILE
:wq  # Write (save) and Quit
:q!  # Quit without saving
```
_File permissions_
TODO:
```sh
# Allows to change the permissions of a file: Read, Write, Execute. Stands for Change Mode
$ chmod

# Allows to change the owner of a given file. Stands for Change Ownership
$ chown USER FILE
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
$ curl -O DOMAIN  # Use [-O] to write output to a local file named like the remote file
$ curl -H 'Content-Type: application/json' \
    -d  '{"fruit" : "apple"}' \
    -X POST \
    DOMAIN
$ wget FILE_DOMAIN  # Retrieve files

# Open SSH commands 
$ ssh USERNAME@IP_ADDRESS  # Login into a remote Linux machine using SSH
$ ssh USERNAME@IP_ADDRESS -i ~/.ssh/id_rsa  # Provide an SSH private key
$ ssh-keygen  # Generates public/private RSA key pair (~/.ssh/id_rsa=>private; ~/.ssh/id_rsa.pub=>public)
$ ssh-copy-id -i ~/.ssh/id_rsa.pub USERNAME@IP_ADDRESS  # Logs into the server host, copies the public key, and grants access by adding it to the authorized_keys file
$ apt-get install openssh-server  # Listens for incoming connection requests (usually on TCP port 22 on the host system) and responds to them
$ apt-get install openssh-client  # Establishes secure and authenticated SSH connections to SSH servers

# Used to display the route and the network interface
$ ifconfig

# Send ICMP echo requests to check the network connectivity. Stands for Packet INternet Groper
$ ping DESTINATION

# Check open ports. The [-tulpn] flags instruct netstat to display all the listening ports (0:::port)
$ netstat -tulpn
$ apt-get install net-tools  # Install net-tools

# Used in DNS lookup to query the DNS name server. It is also used to troubleshoot DNS related issues. Stands for Domain Information Groper
$ dig DOMAIN
$ nslookup DOMAIN  # Used for DNS related queries. It is the older version of dig

# It detects the delay and determines the pathway to a target 
$ traceroute DESTINATION
$ tracepath DESTINATION  # Similar to traceroute, however, it doesn't require root privileges

# Is the replacement for netstat command. Gives information about all TCP [-t], UDP [-u], and UNIX [-x] socket connections
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

#### Linux `$PATH` environmental variable
The `$PATH` environmental variable is a colon-delimited list of directories that tells the shell which directories to search for executable files.

```sh
# Check what directories are in $PATH
$ echo $PATH

# Adding a directory to $PATH. WARNING: only valid in the current shell session
$ export PATH="$HOME/bin:$PATH"

# Adding a directory executable permanently
$ vim /.profile
$ vim /.bashrc
$ vim /etc/environment  # Ubuntu
$ vim /etc/paths.d  # Mac. Will never be affected by system upgrades
$ vim /etc/paths    # Mac. Will be modified and/or replaced by system upgrades (use paths.d instead)
$ vim /etc/profile  # Add 'export PATH="$HOME/bin:$PATH"' to be executed every time the shell runs (not the best solution)

# Makes changes effective (or restart shell)
$ source FILE

# Show executable path of a command
$ which COMMAND
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
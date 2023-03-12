> **Note**  
> Work in progress.

### Linux distributions

Given that Linux is open-source, that are many Linux Distributions (distros):
Ubuntu, Debian, Alpine, Fedora, CentOS, etc.

#### Linux Vs Unix
Linux is not Unix, but it is a Unix-like operating system. Linux system is derived from Unix and it is a continuation of the basis of Unix design. Linux distributions are the most famous and healthiest example of direct Unix derivatives.

### Linux privileges and permissions
TODO:
Using `sudo`, which stands for "super user do", allows regular users to run programs with the security privileges of the superuser or root. This list can be displayed using ...

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
- _First three characters_: show the permissions for the user who owns the file (user permissions).
- _Middle three characters_: show the permissions for members of the file's group (group permissions).
- _Last three characters_: show the permissions for anyone not in the first two categories (other permissions).

Who can we set the permissions for:
- **User (u)**: the owner of the file.
- **Group (g)**: the members of the group the file belongs to.
- **Others (o)**: the people not governed by the `u` and `g` permissions.
- **All (a)**: all of the above.

### Linux CLI cheatsheet

#### OpenSSH
- Generated key pairs should be placed inside the `~/.ssh` directory.
- The host machine should be configured with public key inside the `~/.ssh/authorized_keys` file.
```sh
# Log in to a remote machine using SSH
$ ssh USERNAME@HOSTNAME  
$ ssh USERNAME@HOSTNAME -i PRIVATE_KEY_FILE  # Provide an SSH private key

# Set one of the following permissions to the private key file
$ chmod 0400 PRIVATE_KEY_FILE  # Read permission
$ chmod 0600 PRIVATE_KEY_FILE  # Read-Write permission

# Generate SSH key pair. Place them inside the '~/.ssh/' directory
$ ssh-keygen  # Defaults to RSA
$ ssh-keygen -t ed25519 -C "your_email@example.com"  # Uses EdDSA digital signature algorithm
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  # Uses RSA algorithm

# SSH agent
$ eval "$(ssh-agent -s)"  # Start the SSH agent
$ ssh-add PRIVATE_KEY_FILE  # Add SSH private key to agent. Avoids having to specify the key file every time
$ ssh-add -l  # List private keys associated with the SSH agent
$ ssh-copy-id -i PUBLIC_KEY_FILE USERNAME@HOSTNAME  # Log in to the host, copy a new public key, and grant access by adding it to the 'authorized_keys' file. Note: requires to run 'ssh-add' first

# Copy files using SCP (Secure File Copy)
$ scp LOCAL_FILE USERNAME@HOSTNAME:~/REMOTE/FOLDER  # From local to remote
$ scp USERNAME@HOSTNAME:~/REMOTE/FILE LOCAL_FILE  # From remote to local

# Close the SSH connection
$ exit

# Install OpenSSH
$ apt-get install openssh-server  # Listens for incoming connection requests (usually on TCP port 22 on the host system) and responds to them
$ apt-get install openssh-client  # Establishes secure and authenticated SSH connections to SSH servers
```
#### `$PATH` environment variable
The `$PATH` environment variable is a colon-delimited list of directories that tells the shell which directories to search for executable files.
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
#### Other
_Directory Operations_
```sh
# Make directory
$ mkdir DIR

# Remove directory
$ rm DIR  # Only works for empty directories
$ rm -rf DIR  # Remove contents recursively [-r] with force [-f] (never prompts questions)

# Rename directory
$ mv DIR DIR_NEW_NAME

# Change directory
$ cd  # Navigate to home directory
$ cd ~  # The same as the previous one
$ cd ..  # Go up a directory
$ cd DIR  # Change directory
$ cd /DIR1/DIR2  # Change to any other path

# List all files, include hidden [-a], permission details [-l], and sub-directories recursively [-R]
$ ls -alR

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

# Edit a file using VIM
# Enter letter [i] to switch from Command Mode to Insert Mode
# Enter letter [v] to switch from Command Mode to Visual Mode
# Enter [ESC] to switch back to Command Mode
# Copy/Paste: copy text using cursor selection / paste text by clicking on the mouse wheel 
$ vim FILE
:wq  # Write (save) and Quit
:q!  # Quit without saving

# Display file content
$ cat FILE

# Join FILE1 and FILE2 and store the output in FILE3
$ cat FILE1 FILE2 > FILE3

# Get type of file
$ file FILE
```
_File permissions_
TODO:
```sh
# Allows to change the permissions of a file: Read, Write, Execute. Stands for Change Mode
$ chmod CODE FILE

# Allows to change the owner of a given file. Stands for Change Ownership
$ chown USER FILE
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

# Displays the hostname for a given (public) IP address and an IP address for a given hostname
$ host HOSTNAME
$ host IP_ADDRESS

# Used to view and add content to the kernel's Address Resolution Protocol (ARP) table
$ arp -n
```
_Package manager_
```sh
# APT (Advanced Package Tool) 

# Update package index. Holds records of available packages from the repositories enabled in the system
$ apt update

# Install package
$ apt install PACKAGE

# Uninstall package
$ apt remove PACKAGE  # Uninstalls the package, but it may leave some configuration files behind
$ apt purge PACKAGE  # Remove the package including all configuration files

# Upgrade installed package
$ apt upgrade

# List packages
$ apt list --installed  # List installed packages
$ apt list --upgradeable  # List upgradeable packages
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
_User management_
```sh
# Add a new user
$ sudo adduser USERNAME

# Change password of user
$ sudo passwd USERNAME
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
> **Note**  
> Work in progress.

## Linux

#### Linux Vs Unix
Linux is not Unix, but it is a Unix-like operating system. Linux system is derived from Unix and it is a continuation of the basis of Unix design. Linux distributions are the most famous and healthiest example of direct Unix derivatives.

### Distributions

Given that Linux is open-source, that are many Linux Distributions (distros):
Ubuntu, Debian, Alpine, Fedora, CentOS, etc.

TODO: Pros & Cons of each, when to use them?

### Privileges and permissions
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
_Directory Operations_
```sh
# Make directory
$ mkdir DIR
$ mkdir -p PATH/TO/DIR  # Make all missing directories of path

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

# Listing files
$ ls -lsht  # Listing format [-l], print file size [-s], human-readable [-h], sort by modification time [-t]

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

# Zip operations
$ zip -R ZIP_NAME.zip FILE1 DIR1 FILE2 DIR2
$ unzip ZIP_NAME.zip -d PATH
```
TODO: _File permissions_
```sh
# Allows to change the permissions of a file: Read, Write, Execute. Stands for Change Mode
$ chmod CODE FILE

# Allows to change the owner of a given file. Stands for Change Ownership
$ chown USER FILE
```
_Networking_
```sh
# Used to transfer data to or from a server, using any of the supported protocols 
$ curl -O URL  # Use [-O] to write output to a local file named like the remote file
# POST request with basic authentication
$ curl -X POST \
    -u USER:TOKEN \
    -H 'Content-Type: application/json' \
    -d '{"fruit": "apple"}' \
    URL

$ wget FILE_DOMAIN  # Retrieve files

# Used to display the route and the network interface
$ ifconfig

# Send ICMP echo requests to check the network connectivity. PING stands for Packet INternet Groper
$ ping DESTINATION

# Check open ports. The [-tulpn] flags instruct netstat to display all the listening ports (0:::port)
$ netstat -tulpn
$ apt install net-tools  # Install net-tools

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
_System operations_
```sh
# Clears the terminal
$ clear

# Gives a list of all past commands typed in the current terminal session
$ history

# Disk usage analysis
$ du -s -h PATH  # Summarize [-s] human readable [-h] disk usage
$ df -H # See system usage distribution
$ ncdu  # See what directories are using disk space

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

# List users
$ cat /etc/passwd
```
_User management_
```sh
# Add a new user
$ sudo adduser USERNAME

# Change password of user
$ sudo passwd USERNAME

# Enable the usage of sudo for a specific user
$ usermod -a -G sudo USERNAME  # Append [-a] non-root user to sudoers group [-G]
$ echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers  # Disable password request for sudoers group
```
#### OpenSSH
- Generated key pairs should be placed inside the `~/.ssh` directory.
- The host machine should be configured with public key inside the `~/.ssh/authorized_keys` file.
```sh
# Log in to a remote machine using SSH
$ ssh USERNAME@HOSTNAME
$ ssh USERNAME@HOSTNAME -i PRIVATE_KEY_FILE  # Provide an SSH private key
$ sshpass -p PASSWORD ssh USERNAME@HOSTNAME  # Use SSH Pass to authenticate using a password (not the best option)

# Set one of the following permissions to the private key file
$ chmod 400 PRIVATE_KEY_FILE  # Read permission
$ chmod 600 PRIVATE_KEY_FILE  # Read-Write permission

# Generate SSH key pair. Place them inside the '~/.ssh/' directory
$ ssh-keygen  # Defaults to RSA
$ ssh-keygen -t ed25519 -C "YOUR_EMAIL"  # Uses EdDSA digital signature algorithm
$ ssh-keygen -t rsa -b 4096 -C "YOUR_EMAIL"  # Uses RSA algorithm

# SSH agent
$ eval "$(ssh-agent -s)"  # Start the SSH agent
$ ssh-add PRIVATE_KEY_FILE  # Add SSH private key to agent. Avoids having to specify the key file every time
$ ssh-add -l  # List private keys associated with the SSH agent
$ ssh-copy-id -i PUBLIC_KEY_FILE USERNAME@HOSTNAME  # Log in to the host, copy a new public key, and grant access by adding it to the 'authorized_keys' file. Note: requires to run 'ssh-add' first

# Copy files and directories using SCP (Secure File Copy)
$ scp USERNAME@HOSTNAME:~/REMOTE/FILE LOCAL_FILE  # Copy file from remote to local
$ scp LOCAL_FILE USERNAME@HOSTNAME:~/REMOTE/DIR  # Copy file from local to remote
$ scp -r LOCAL_DIR USERNAME@HOSTNAME:~/REMOTE/DIR  # Copy directory from local to remote

# Close the SSH connection
$ exit

# Install OpenSSH
$ apt install openssh-server  # Listens for incoming connection requests (usually on TCP port 22 on the host system) and responds to them
$ apt install openssh-client  # Establishes secure and authenticated SSH connections to SSH servers
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
$ vim ~/.zshrc      # Mac.
$ vim /etc/paths.d  # Mac. Will never be affected by system upgrades
$ vim /etc/paths    # Mac. Will be modified and/or replaced by system upgrades (use paths.d instead)
$ vim /etc/profile  # Add 'export PATH="$HOME/bin:$PATH"' to be executed every time the shell runs (not the best solution)

# Makes changes effective (or restart shell)
$ source FILE

# Show executable path of a command
$ which COMMAND
```
#### APT Package manager
Alternatives to APT (Advanced Package Tool): YUM, Pacman, DNF.
```sh
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
#### systemd
_Manage services_
```sh
# Manage services using systemctl
$ systemctl start SERVICE  # Start
$ systemctl stop SERVICE  # Stop
$ systemctl restart SERVICE  # Restart
$ systemctl reload SERVICE  # Reload all config files in a service
$ systemctl --type=service --state=running  # List running services
$ systemctl status SERVICE  # See status
$ systemctl show SERVICE  # Show properties of a service
$ systemctl disable SERVICE.service  # Disable service from starting-up on system boot
$ systemctl list-unit-files  # List services that start-up on system boot
$ systemctl list-timers  # List scheduled timers
$ systemctl daemon-reload  # Reload systemctl daemon

# Update hostname
$ hostnamectl set-hostname NAME
```
_System information_
```sh
$ systemctl list-dependencies  # Show a unit's dependencies
$ systemctl list-sockets  # List sockets
$ systemctl list-jobs  # View active systemd jobs

# See history of cronjobs
$ grep CRON /var/log/syslog
```
_System management_
```sh
$ systemctl reboot  # Reboot the system
$ systemctl poweroff  # Power off the system
```
_Logging_
```sh
$ journalctl  # Show all collected log messages
$ journalctl -u network.service  # See network service messages
$ journalctl -k  # Show kernel messages
$ journalctl --list-boots  # See system boots
```
_Encryption_
```sh
# GPG (GNU Privacy Guard)
$ gpg --list-keys  # List all keys
$ gpg --generate-key --batch <(echo 'Key-Type: 1'; echo 'Name-Real: REAL_NAME'; echo 'Name-Email: RECIPIENT'; echo '%no-protection')  # Generate passwordless key pair
$ gpg --encrypt --output ENCRYPTED_FILE.gpg --batch --yes --recipient RECIPIENT FILE  # Encrypt file using key
$ gpg --decrypt --yes --output destroy-demo-server.env  destroy-demo-server.gpg  # Decrypt GPG file
$ gpg --delete-secret-key RECIPIENT  # Delete private key
$ gpg --delete-key RECIPIENT  # Delete public key
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

TODO: follow this guide by Google https://google.github.io/styleguide/shellguide.html

#### Exit status
- `0`: an exit status of 0 is the best possible scenario, generally speaking. It tells you that your latest command or script executed successfully.
- `1`: catchall for general errors.
- `2`: misuse of shell built-ins (according to Bash documentation).
- `126`: permission problem or command is not an executable.
- `127`: command not found, possible problem with `$PATH` or a typo.
- `128`: invalid argument to exit. `exit` only takes integer args in the range 0 - 255 (no decimals allowed).
- `130`: script terminated by Control-C.
- `255`: exit status out of range, for instance `-1`.

#### Output redirection
```sh
# The standard output stream will be redirected to the file only, it will not be visible in the terminal. If the file already exists, it gets overwritten
$ COMMAND > output.txt

# The standard output stream will be redirected to the file only, it will not be visible in the terminal. If the file already exists, the new data will get appended to the end of the file
$ COMMAND >> output.txt

# The standard error stream will be redirected to the file only, it will not be visible in the terminal. If the file already exists, it gets overwritten
$ COMMAND 2> output.txt

# The standard error stream will be redirected to the file only, it will not be visible in the terminal. If the file already exists, the new data will get appended to the end of the file
$ COMMAND 2>> output.txt

# Both the standard output and standard error stream will be redirected to the file only, nothing will be visible in the terminal. If the file already exists, it gets overwritten
$ COMMAND &> output.txt

# Both the standard output and standard error stream will be redirected to the file only, nothing will be visible in the terminal. If the file already exists, the new data will get appended to the end of the file
$ COMMAND &>> output.txt

# The standard output stream will be copied to the file, it will still be visible in the terminal. If the file already exists, it gets overwritten
$ COMMAND | tee output.txt

# The standard output stream will be copied to the file, it will still be visible in the terminal. If the file already exists, the new data will get appended to the end of the file
$ COMMAND | tee --append output.txt

# Both the standard output and standard error streams will be copied to the file while still being visible in the terminal. If the file already exists, it gets overwritten
$ COMMAND |& tee output.txt

# Both the standard output and standard error streams will be copied to the file while still being visible in the terminal. If the file already exists, the new data will get appended to the end of the file
$ COMMAND |& tee --append output.txt
```
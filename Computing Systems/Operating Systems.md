<h1 align='center'>Operating Systems</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

> [!NOTE]
> Work in progress.

## Linux

#### Linux Vs Unix
Linux is not Unix, but it is a Unix-like operating system. Linux system is derived from Unix and it is a continuation of the basis of Unix design. Linux distributions are the most famous and healthiest example of direct Unix derivatives.

### Distributions
Linux is open-source, so there are many different Linux distributions ("distros"), each tailored for specific use cases, preferences, or hardware. Some of the most popular distributions include:
- Ubuntu: User-friendly, great community support, widely used for desktops and servers.
- Debian: Known for stability and reliability; the base for many other distros (including Ubuntu).
- Alpine: Lightweight and security-focused, commonly used in containers and minimal environments.
- Fedora: Features the latest open-source technologies, upstream for Red Hat Enterprise Linux.
- CentOS: Previously a free, enterprise-class distro based on Red Hat; now replaced by CentOS Stream.

### Linux CLI cheatsheet
_Directory Operations_
```sh
# Make directory
$ mkdir DIR
$ mkdir -p PATH/TO/DIR  # Make all missing directories of path

# Remove directory
$ rm DIR  # Only works for empty directories
$ rm -rf DIR  # Remove contents recursively [-r] with force [-f] (never prompts questions)

# Listing files
$ ls -lasth  # Listing format [-l], all files [-a], print file size [-s], sort by modification time [-t], human-readable sizes [-h]

# Show path of current directory
$ pwd
```
_System operations_
```sh
# Gives a list of all past commands typed in the current terminal session
$ history

# Disk usage analysis
$ du -s -h PATH  # Summarize [-s] human readable [-h] disk usage
$ df -h # See system usage distribution
$ ncdu  # See what directories are using disk space

# Display hostname of the system
$ hostname

# Check NTP (Network Time Protocol) server clock time synchronization
$ timedatectl

# Shows information of all logged in users
$ finger [USERNAME]

# List all environment variables
$ env

# Remove environment variable
$ unset VARIABLE

# List all alises. Aliases are like custom shortcuts used to represent a command
$ alias

# List users
$ cat /etc/passwd
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
#### APT Package manager
Some alternatives to APT (Advanced Package Tool) include: YUM, Pacman, DNF.
```sh
# Managing system packages
# update: updates the package index that holds records of available packages from the repositories enabled in the system
# upgrade: upgrades the actual packages installed on the system
# autoclean: clear out the local repository of retrieved package files
# autoremove: remove packages that were automatically installed to satisfy dependencies for some other package and that are no longer needed
$ apt-get update; apt-get upgrade -y; apt-get autoclean; apt-get autoremove -y

$ apt install PACKAGE # Install package
$ apt remove PACKAGE  # Uninstall package, but it may leave some configuration files behind
$ apt purge PACKAGE   # Remove the package including all configuration files

# List packages
$ apt list --installed  # List installed packages
$ apt list --upgradeable  # List upgradeable packages
```

**UnattendedUpgrades** is enabled by default in Ubuntu systems for security updates, starting from 16.0 LTS and later.
- Checking if UnattendedUpgrades is enabled on your system.
    1. Check the service status.
        ```sh
        $ systemctl status unattended-upgrades
        ```
    2. Check the `/etc/apt/apt.conf.d/20auto-upgrades` configuration file.
        ```conf
        APT::Periodic::Update-Package-Lists "1";
        APT::Periodic::Unattended-Upgrade "1";
        ```
- Useful options from the `/etc/apt/apt.conf.d/50unattended-upgrades` configuration file that can be enabled.
    ```conf
    Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
    Unattended-Upgrade::Remove-Unused-Dependencies "true";
    Unattended-Upgrade::Automatic-Reboot "true";
    Unattended-Upgrade::Automatic-Reboot-Time "00:00";
    ```

#### OpenSSH
- Generated key pairs should be placed inside the `~/.ssh` directory.
- The host machine should be configured with public key inside the `~/.ssh/authorized_keys` file.
```sh
# Log in to a remote machine using SSH
$ ssh USERNAME@HOSTNAME
$ ssh USERNAME@HOSTNAME -i PRIVATE_KEY_FILE  # Provide an SSH private key
$ sshpass -p PASSWORD ssh USERNAME@HOSTNAME  # Use SSH Pass to authenticate using a password (not the best option)

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

# Install OpenSSH
$ apt install openssh-server  # Listens for incoming connection requests (usually on TCP port 22 on the host system) and responds to them
$ apt install openssh-client  # Establishes secure and authenticated SSH connections to SSH servers
```
#### `$PATH` environment variable
The `$PATH` environment variable contains a colon-delimited list of directories that tells the shell which directories to search for executable files when you enter a command. The shell checks directories in order from left to right.

```sh
# Adding a directory to $PATH. WARNING: only valid in the current shell session
$ export PATH="$HOME/bin:$PATH"

# Adding a directory executable permanently
$ vim ~/.profile         # User-specific, works for most shells
$ vim ~/.bashrc          # For bash users
$ vim ~/.zshrc           # For zsh users (macOS default)
$ sudo vim /etc/environment   # System-wide (Ubuntu)
$ sudo vim /etc/paths.d/my_custom_path  # macOS, safest for system-wide changes
$ sudo vim /etc/paths         # macOS, but may be overwritten by system updates

# Show executable path of a command
$ which COMMAND
```
#### systemd
_Manage services_
```sh
# Manage services using systemctl
$ systemctl start SERVICE  # Start
$ systemctl stop SERVICE  # Stop
$ systemctl restart SERVICE  # Restart
$ systemctl reload SERVICE  # Reload all config files in a service
$ systemctl list-units --type=service  # List services
$ systemctl --type=service --state=running  # List running services
$ systemctl list-unit-files  # List services that start-up on system boot
$ systemctl list-timers  # List scheduled timers
$ systemctl status SERVICE  # See status
$ systemctl show SERVICE  # Show properties of a service
$ systemctl disable SERVICE.service  # Disable service from starting-up on system boot
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

# Using logrotate
$ logrotate -dv /etc/logrotate.conf # Dry-run logrotate in verbose
$ logrotate -fv /etc/logrotate.conf # Force logrotate in verbose
$ cat /var/lib/logrotate/status # See last log rotations
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

Follow this guide by Google https://google.github.io/styleguide/shellguide.html

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

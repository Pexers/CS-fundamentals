<h1 align='center'>Configuration Management</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

> [!NOTE]
> Work in progress.

## Configuration Management
The process of maintaining systems, such as computer hardware and software, in a desired state. Configuration Management (CM) is also a method of ensuring that systems perform in a manner consistent with expectations over time.

### Ansible
An infrastructure as Code tool. Enables to make changes on multiple machines at once using the "Control Station". Avoids the tedious time-consuming manual work of SSH to every machine one by one to do the same tasks over and over again.

- Owned by RedHat
- Agentless: connects over SSH and runs commands. We don't need to configure an agent on each machine we want to interact with.
- Playbook: YAML file. A Playbook has Plays, and each Play can have multiple Tasks.

Both the playbook and inventory files are located in the **Ansible Management Node**.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/223193218-00638914-67e7-4e62-85f9-41f3e96ca484.png" width="350">
</p>

#### Ansible Tower
It is a web-based solution that allows use for several different kinds of IT teams. Ansible Tower is the enterprise version of Ansible. It allows sysadmins to deploy all of the benefits of Ansible at scale. And, like Ansible, it integrates with a broad base of your existing technology infrastructure: networking, security, application deployment, storage, software development lifecycle processes, etc.

#### Ansible Vs Puppet Vs Chef Vs Salt
- Ansible in agentless, it only requires SSH installed. Salt, for instance, needs Python
- Uses YAML instead of Ruby to define the state of the systems. Ruby is harder to interpret when compared to YAML.

#### Components
- Roles:
  - are 'reusable subsets of a play', mainly they group tasks and resources to accomplish a certain goal
  - self-contained portable units of ansible
  - Expressed in YAML
- Modules:
  - abstracts complexity away from users to make powerful automation simple
  - small programs that perform actions on remote hosts.
  - are expressed as code (Python, Powershell)
  - called by **Ansible tasks**
  - do all the heavy lifting in Ansible
- Plugins:
  - extend Ansible's core functionality
  - offer options and extensions for the core features of Ansible: transforming data, logging output, connecting to inventory, and more.
- Collections:
  - We can add modules and plugins by creating a collection

If you are looking to add functionality to Ansible, you might wonder whether you need a module or a plugin. Here is a quick overview to help you understand what you need:
- Plugins extend Ansible's core functionality. Most plugin types execute on the control node within the `/usr/bin/ansible` process. Plugins offer options and extensions for the core features of Ansible: transforming data, logging output, connecting to inventory, and more.
- Modules are a type of plugin that execute automation tasks on a 'target' (usually a remote system). Modules work as standalone scripts that Ansible executes in their own process outside of the controller. Modules interface with Ansible mostly via JSON, accepting arguments and returning information by printing a JSON string to stdout before exiting. Unlike the other plugins (which must be written in Python), modules can be written in any language; although Ansible provides modules in Python and Powershell only.

#### Inventory
Inventory files define the managed nodes you automate with groups so you can run automation tasks on multiple hosts at the same time. Once your inventory is defined, you use patterns to select the hosts or groups you want Ansible to run against.

The default location for this file is `/etc/ansible/hosts`. You can specify a different inventory file at the command line using the `-i <path>` option or in configuration using `inventory`.

Hosts can be defined either by **IP address** or **DNS name** or if DNS is not resolvable using the `ansible_host` command syntax.

We can specify the SSH credentials using `ansible_ssh_user` and `ansible_ssh_private_key_file` variables.

_Inventory file using INI format_
```ini
# Ungrouped hosts with and without DNS resolution respectively
example.com
web_server ansible_host=192.168.20.170

# Grouped hosts
[routers]
router_1 ansible_host=192.168.1.210
router_2 ansible_host=192.168.1.211

# Variables used by Ansible to connect via SSH
[routers:vars]
ansible_ssh_user=a_user
ansible_ssh_private_key_file=~/.ssh/mykey
```
_Inventory file using YAML format_
```yaml
all:
  hosts:
    example.com:
    web_server:
      ansible_host: 192.168.20.170
    routers:
      hosts:
        router_1:
          ansible_host: 192.168.20.170
        router_2:
          ansible_host: 192.168.1.211
      vars:
        ansible_ssh_user: a_user
        ansible_ssh_private_key_file: ~/.ssh/mykey
```
We can also create parent/child relationships among groups. Parent groups are also known as nested groups or groups of groups. For example, if all the production hosts are already in groups such as `atlanta_prod` and `denver_prod`, we can create a `production` group that includes those smaller groups. This approach reduces maintenance because we can add or remove hosts from the parent group by editing the child groups.

To create parent/child relationships for groups:
- in INI format, use the `:children` suffix.
- in YAML format, use the `children:` entry.

#### Playbooks
We can have multiple Plays in the same Playbook. Each Play can define:
_hosts_: used to identify what machines should run the tasks of a Play.
_remote_user_: for instance `root`.

_Playbook file with a single Play, three tasks and one special task (handler)_
```yaml
---
- name: install and start nginx server  # The play name
  hosts: web_server  # Host name or group
  remote_user: a_username

  tasks:
  - name: create directory for nginx
    file:
      path: /path/to/nginx/dir
      state: directory
  - name: install nginx latest version
    apt:  # or 'yum'
      name: nginx
      state: latest
  - name: start nginx
    service:
      name: nginx
      state: started
  handlers:
  - name: restart nginx
    service:
      name=nginx
      state=restarted
```
Handlers are usually used to start, restart, reload and stop services on target nodes only when there is a change in the state of the task, and not when no change is made.

#### Configuring SSH communication between Ansible hosts
1. Install SSH server using `apt install openssh-server` or client using `apt install openssh-client`.
2. Generate SSH key pair using `ssh-keygen`.
3. Copy public key to the host and add it to the `authorized_keys` file using `ssh-copy-id -i ~/.ssh/id_rsa.pub USERNAME@IP_ADDRESS`.
4. Check SSH connection and provide private key using `ssh USERNAME@IP_ADDRESS -i ~/.ssh/id_rsa`.

#### Ansible CLI cheatsheet
```sh
# Run a playbook
$ ansible-playbook -i INVENTORY_FILE PLAYBOOK_FILE
```

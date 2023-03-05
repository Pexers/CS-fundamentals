> **Note**  
> Work in progress.

## Configuration Management
The process of maintaining systems, such as computer hardware and software, in a desired state. Configuration Management (CM) is also a method of ensuring that systems perform in a manner consistent with expectations over time.

### Ansible
An infrastructure as Code tool. Enables to make changes on multiple machines at once using the "Control Station". Avoids the tedious time-consuming manual work of SSH to every machine one by one to do the same tasks over and over again.

- Owned by RedHat
- Agentless: connects over SSH and runs commands. We don't need to configure an agent on each machine we want to interact with.
- Playbook: YAML file. A Playbook has Plays, and each Play can have multiple Tasks.

Hosts of Inventory file is located in the **Management Node** as well as the playbook file.

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/220987896-ddf29e6a-08a9-4bb3-95b1-4fc0d96bfce1.png" width="350">
</p>

#### Ansible Vs Puppet Vs Chef Vs Salt
- Ansible in agentless, uses SSH
- Uses YAML instead of Ruby to define the state of the systems (more difficult to learn)

#### Ansible components
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

If you are looking to add functionality to Ansible, you might wonder whether you need a module or a plugin. Here is a quick overview to help you understand what you need:
- Plugins extend Ansible's core functionality. Most plugin types execute on the control node within the `/usr/bin/ansible` process. Plugins offer options and extensions for the core features of Ansible: transforming data, logging output, connecting to inventory, and more.
- Modules are a type of plugin that execute automation tasks on a 'target' (usually a remote system). Modules work as standalone scripts that Ansible executes in their own process outside of the controller. Modules interface with Ansible mostly via JSON, accepting arguments and returning information by printing a JSON string to stdout before exiting. Unlike the other plugins (which must be written in Python), modules can be written in any language; although Ansible provides modules in Python and Powershell only.

#### Ansible inventory Vs hosts file
Your inventory defines the managed nodes you automate, with groups so you can run automation tasks on multiple hosts at the same time. Once your inventory is defined, you use patterns to select the hosts or groups you want Ansible to run against.

The default INI format hosts file:
```ini
mail.example.com

[web_servers]
foo.example.com
bar.example.com

[db_servers]
one.example.com
two.example.com
three.example.com
```

Ansible YAML Inventory using YAML:
```yaml
all:
  hosts:
    mail.example.com:
  children:
    web_servers:
      hosts:
        foo.example.com:
        bar.example.com:
    db_servers:
      hosts:
        one.example.com:
        two.example.com:
        three.example.com:
```

#### Ansible playbooks
Run a playbook:
`$ ansible-playbook <playbook_file>`

Each Play can define:
_hosts_: used to identify what machines should run the tasks of a Play.
_remote_user_: for instance `root`.

We can have multiple Plays in the same Playbook.

```yaml
---
- name: install and start nginx server  # The play name
  hosts: web_servers  # Host group name
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

#### Ansible Tower
It is a web-based solution that allows use for several different kinds of IT teams. Ansible Tower is the enterprise version of Ansible. It allows sysadmins to deploy all of the benefits of Ansible at scale. And, like Ansible, it integrates with a broad base of your existing technology infrastructure: networking, security, application deployment, storage, software development lifecycle processes, etc.

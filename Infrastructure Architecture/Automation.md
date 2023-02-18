> **Note**  
> Work in progress.

Jenkins, GitLab CI/CD, GitHub Actions, Azure DevOps,
Ansible, Puppet, Chef
- Ansible in agentless
- Uses YAML instead of Ruby (more difficult to learn)

Infrastructure as Code - Terraform, Pulumi

---

Ansible:
Enables to make changes on multiple machines at once using the "Control Station". Avoids the tedious time-consuming manual work of SSH to every machine one by one to do the same tasks over and over again.

- Owned by RedHat
- Agentless: connects over SSH and runs commands. We don't need to install an agent on each machine we want to interact with.
- Playbook: YAML file. A Playbook has Plays, and each Play can have multiple Tasks.

Ansible Vs Puppet Vs Chef
- Ansible in agentless
- Uses YAML instead of Ruby (more difficult to learn)

Works using modules for specific stuff. There's a Docker Module to manage containers (create, destroy, etc), a Jenkins Module to manage Jobs, Cloud Modules, Database Modules, etc. All of these using YAML.

Run a playbook:
$ ansible-playbook <playbook_file>

Each Play can define:
_hosts_: used to identify what machines should run the tasks of a Play.
_remote_user_: for instance `root`.

We can have multiple Plays in the same Playbook.

```yaml
- name: install and start nginx server  # Play name
  hosts: webservers
  remote_user: root
  
  tasks:
  - name: create directory for nginx
    file:
      path: /path/to/nginx/dir
      state: directory
  - name: install nginx latest version
    yum:
      name: nginx
      state: latest
  - name: start nginx
    service:
      name: nginx
      state: started
```

Hosts file:
```
...
[webservers]
10.24.0.1
10.24.0.2

[databases]
10.24.0.7
10.24.0.8
```

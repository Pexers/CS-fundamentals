<h1 align='center'>Virtualization</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Virtualization is the creation of a virtual (rather than actual) version of something, such as a server, a desktop, a storage device, an operating system or network resources.

There are many different types of virtualization:
- Hardware Virtualization;
- Operating System (OS) Virtualization;
- Network Virtualization;
- Storage Virtualization;
- ... and others.

For the purposes of this document, we're going focus more on computer system's virtualization.

## Virtual Machines Vs Containers
A **virtual machine** (VM) is a computer file, typically called an image, that behaves like another computer within a host computer. The mechanism behind it is capable of emulating system software (with its own guest OS, kernel, etc.), but also physical computer hardware (CPU cores, memory, disk space), and divide it into multiple separate computers (VMs). Therefore, it is considered a **hardware-level** virtualization.

A **container** is defined as a standard unit of software that packages up code and all its dependencies so that the application can run quickly and reliably from one computing environment to another. However, containers do not come with a full operating system image, but instead a very small subset of it. The mechanism behind it is called _Containerization_, and it is defined as a form of **OS-level** virtualization through which applications are packaged in isolated environments (containers). Unlike VMs, containers share the **host's OS kernel**, usually a Linux kernel, but at the same time isolate the application processes from the rest of the system. This enables multiple workloads to run on a single OS kernel instance. Since they share the same kernel, they do not need to boot an entire new OS every time they start.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/213234299-3f515b43-eca0-4a40-8531-4ac9b27f3515.png" width="700">
</p>

- **Virtualization software**
  - _Hypervisor_: also known as a _virtual machine monitor_ (VMM), is a piece of software that creates and runs virtual machines. It allows one host computer to support multiple guest VMs by virtually sharing its resources, such as processing (CPU), memory (RAM) and disk space. Two of the most popular hypervisors are the Oracle Virtual Box and VMware.
  - _Container engine_: a piece of software that accepts user requests, including command line options, pulls images, and from the end user's perspective runs containers. Not to be confused with a _container runtime_, which is a low-level component of the container engine that mounts the container and works with the host's OS kernel to start and support the containerization process. Popular container engines include Docker, RKT ("Rocket") from RedHat, and LXD (Linux Containers).

- **Storage space**
  - Virtual machines can take up a lot of storage space since they virtualize an entire machine down to the hardware layers. They can quickly grow to several gigabytes in size. This can lead to disk space shortage issues on the VMs' host machine.
  - Containers take up much less space than VMs, given that container images are typically only a few megabytes in size. Containers can handle more applications, and reduce the need for multiple VMs and operating systems. This allows far more containers to run on the same compute capacity as a single VM.

- **Portability**
  - Virtual machines can be relocated as needed among the physical computers in a network. This makes it possible to allocate workloads to servers that have spare computing power. However, it’s an entire operating system along with all additional user and system data being replicated, which means we’re looking at one or more files that total a few GB in size. As such, VMs are portable but will take significantly longer than containers to move from one location to another.
  - With containers, applications can be built once, placed inside a container image – or series of images, if the app is composed of multiple services – and executed on the host's OS kernel that supports a container engine (e.g. Docker). We can't run Windows containers on Linux, but the other way around is possible thanks to **WSL 2** (Windows Subsystem for Linux, version 2). On macOS, containers must run a Linux host VM.
 
- **Scalability** 
  - Virtual machines can be scaled as necessary by adding more computing power, or by adding extra VMs that help carry the workload. Since they require a separate OS for each instance, they consume much more resources, such as memory and storage, when compared to containers. 
  - Containers offer near limitless scalability thanks to being lightweight and their almost instantaneous start-up time. An orchestration system, such as Google Kubernetes is capable of determining, based upon traffic patterns, when the quantity of containers needs to be scaled out – replication of container images automatically – or removed from the system.

- **Performance**
  - Virtual machines are ideal for supporting applications that require an operating system’s full functionality. This can happen when there is a need to manage a wide variety of operating systems. However, VMs are time consuming to build and regenerate because they encompass a full stack system. Any modifications to a virtual machine snapshot can take significant time to regenerate and validate they behave as expected.
  - Containers enable greater server-efficiency, cost-effectiveness, and reduced-overhead over VMs. A container doesn’t require its own operating system which corresponds to faster boot times, smaller memory footprints, and generally better performance. Containers also help trim hardware, storage, operating system, and server costs as they reduce the need for using VMs.

- **Maintainability**
  - Each OS in every VM instance needs to be maintained and updated separately. This is a time consuming and exhausting task, especially if we have multiple VMs.
  - For all the reasons specified above, containers are easier to maintain than VMs.

- **Security**
  - Virtual machines improve security in several ways when compared to operating systems running directly on hardware. A VM is a file that can be scanned for malicious software by an external program. You can create an entire snapshot of the VM at any point in time and then restore it to that state if it becomes infected with malware, effectively taking the VM back in time.
  - Given that all containers share the same underlying hardware system below the OS layer, it is possible that an _exploit_ in one container could break out of the container and affect the shared hardware. Moreover, popular container engines have public repositories of pre-built container images. There is a security risk in using one of these public images as they may contain exploits or may be vulnerable to being hijacked by malicious attackers.
  
_In summary:_
||Storage space|Portability|Scalability|Performance|Maintainability|Security|
|---|:---:|:---:|:---:|:---:|:---:|:---:|
|_Virtual&nbsp;machines_|⭐|⭐⭐|⭐|⭐⭐|⭐|⭐⭐⭐|
|_Containers_|⭐⭐⭐|⭐⭐|⭐⭐⭐|⭐⭐⭐|⭐⭐⭐|⭐⭐|

Both containers and virtual machines will continue to have new use cases as enterprises seek to leverage the power of their infrastructure – or the cloud – in new ways to support heavy-duty application and networking workloads. Containers are an excellent choice for tasks with a short lifecycle and for deployment of microservices. Virtual machines have a longer lifecycle than containers, and are best used for longer periods of time. In short, containers are lighter weight, more rapid, and more maintainable than VMs. 

## Docker Engine
The Docker Engine is an open source containerization technology for building and containerizing applications. Before Docker, an application was entirely tied to the machine/server it was running on. With Docker, we can now take this application and _contain it_ in a **docker image**, and redeployed it later on in any other server to duplicate its functionality. Therefore, Docker's container-based platform allows for highly portable workloads.

Docker also promotes the usage of microservices. Microservices decentralize packages and divide tasks into separate, stand-alone integrations that collaborate with each other. These are much easier to scale when compared to monoliths. Organizations can deploy multiple services or applications on a machine through containers while maintaining a degree of isolation between them.

Docker can fully run in WSL 2. This means that Linux containers can run natively without emulation, resulting in better performance and interoperability between Windows and Linux tools.

**Docker Hub**: a hosted repository service provided by Docker for finding and sharing container images.

#### Dockerfile
Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile is a text document that contains instructions for packaging an application into an image that can be run anywhere using Docker.

Instruction are not case-sensitive. However, convention is for them to be UPPERCASE to distinguish them from arguments more easily. Docker runs instructions in a Dockerfile in order. A Dockerfile must begin with a `FROM` instruction. The `FROM` instruction specifies the _parent image_ from which you are building.

```sh
# syntax=docker/dockerfile:1
FROM python:3.8-slim-buster

WORKDIR /app

COPY code/requirements.txt code/requirements.txt

RUN pip3 install -r code/requirements.txt

COPY . .

ENV MY_TOKEN=random_token

CMD ["python3", "code/main.py"]
```

#### Dockerfile Cheatsheet
```sh
# FROM must be the first non-comment instruction in the Dockerfile
FROM image
FROM image[:tag]    # Optional
FROM image[@digest] # Optional

# Allows you to set the Author field of the generated images
MAINTAINER name

# Sets the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile
USER username

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it
WORKDIR /path/to/workdir

# RUN is an image build step, the state of the container after a RUN command will be committed to the container image. A Dockerfile can have many RUN steps that layer on top of one another to build the image
RUN command
RUN ["executable", "param1", "param2"]

# CMD is the command the container executes by default when you launch the built image. A Dockerfile will only use the final CMD defined
CMD ["executable", "param1", "param2"]

# Used to configure the executables that will always run after the container is initiated, for instance, a script
ENTRYPOINT ["executable", "param1", "param2"]

# Copies new files or directories from source directory and adds them to the filesystem of the image at the path destination
COPY src dest
COPY ["src", ... "dest"]  # This form is required for paths containing whitespace

# Sets an environment key to a value
ENV key=value

# Defines a variable that users can pass at build-time. These are visible to any user of the image with the docker history command
ARG name[=default value]

# Adds to the image a trigger instruction to be executed at a later time, when the image is used as the base for another build
ONBUILD dockerfile_instruction

# ADD does the same as COPY, but in addition, it also supports 2 other sources: (i) a URL instead of a local file/directory, and (ii) extract tar from the source directory into the destination
ADD src dest
ADD ["src", ... "dest"]

# Adds metadata to the image
LABEL key=value

# Informs Docker that the container listens on the specified network port(s) at runtime
EXPOSE port

# Creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers
VOLUME path

# Tells Docker how to test a container to check that it is still working
HEALTHCHECK [options] CMD command

# Allows the default shell used for the shell form of commands to be overridden
SHELL ["executable", "param1", "param2"]

# Sets the system call signal that will be sent to the container to exit
STOPSIGNAL signal

```

#### Docker CLI Cheatsheet
_Manage images_
```sh
# Download an image with an optional tag
docker pull IMAGE[:TAG]

# Upload an image to a repository on DockerHub
docker push IMAGE[:TAG]

# List all images
docker images

# Build and tag an image from a Dockerfile
docker build -t IMAGE[:TAG] DIRECTORY

# Delete an image
docker rmi IMAGE

# Delete dangling images. These are untagged and unnamed (<none>)
docker image prune

# Delete all unused images. These have not been assigned or used in a container
docker image prune -a

# Save an image to a .tar file
docker save IMAGE > TAR_FILE

# Load an image from a .tar file
docker load -i TAR_FILE
```
_Run containers_
```shell
# Start a new container
docker run IMAGE

# Start a new container in the background with no input or output (detached mode)
docker run -d IMAGE

# Run and map a port on the Docker host
docker run -p [host_port]:[container_port] [image]

# Run and add a DNS entry. Useful when a service within the container needs to connect to an external host
docker run --add-host HOSTNAME:IP IMAGE
```
_Manage containers_
```sh
# List running containers or all containers (-a)
docker ps [-a]

# Start a shell inside a running container. For instance EXECUTABLE=bash
docker exec -it CONTAINER EXECUTABLE

# Copy a file from a container to the host
docker cp CONTAINER:SOURCE TARGET

# Copy a file from the host to a container
docker cp TARGET CONTAINER:SOURCE

# Show logs of a container
docker logs CONTAINER

# Delete a container
docker rm CONTAINER

# Force delete a running container
docker rm -f CONTAINER

# Delete stopped containers
docker container prune

# Stop/Start a container
docker stop/start CONTAINER

# Rename a container
docker rename OLD_NAME NEW_NAME

# Create an image out of a container
docker commit CONTAINER

# Show mapped ports of a container
docker port CONTAINER
```

## Kubernetes
Often misunderstood as a choice between one or the other, Kubernetes and Docker are different yet complementary technologies for running containerized applications. Docker is not an alternative to Kubernetes, the difference relates to the role each play in containerizing and running applications. Kubernetes is not a container engine software, per se, but rather a **container orchestrator**.


Originally designed by Google, Kubernetes provides automated container orchestration, improves reliability and reduces the time and resources attributed to daily operations. 
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/213886253-a9ce21d2-ab9c-464d-a255-48f1aa38c9ec.png" width="700">
</p>

- **Pod**: a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers (pod as in a pod of whales or pea pod).
- **Control Plane Components**:  makes global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events. Control plane components can be run on any machine in the cluster. However, for simplicity, set up scripts typically start all control plane components on the same machine, and do not run user containers on this machine.
  - _kube-apiserver_: exposes the Kubernetes API designed to scale horizontally, that is, it scales by deploying more instances.
  - _etcd_: consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.
  - _kube-scheduler_: watches for newly created pods with no assigned node, and selects a node for them to run on.
  - _kube-controller-manager_: runs controller processes.
  - _cloud-controller-manager_: lets customers link the cluster into cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with the cluster.
- **Node Components**: run on every node, maintaining running pods and providing the Kubernetes runtime environment.
  - _kubelet_: takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy.
  - _kube-proxy_: maintains network rules on nodes. These network rules allow network communication to pods from network sessions inside or outside of the cluster.
  - _container runtime_: the software that is responsible for running containers. Kubernetes supports container runtimes such as _containerd_, CRI-O, and any other implementation of the Kubernetes CRI (Container Runtime Interface).

In Google Kubernetes Engine (GKE) we can create clusters using one of the following modes of operation:
- **Autopilot**: provides a fully-provisioned and managed cluster configuration. Autopilot clusters are pre-configured with an optimized cluster configuration that is ready for production workloads. The number of nodes in this mode is not accessible.
- **Standard**: provides advanced configuration flexibility over the cluster's underlying infrastructure. For clusters created using the Standard mode, the customer determines the configurations needed for production workloads.
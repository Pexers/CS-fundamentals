<h1 align='center'>Virtualization</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Virtualization is the creation of a virtual (rather than actual) version of something, such as a server, a desktop, a storage device, an operating system or network resources.

There are many different types of virtualization:
- Hardware Virtualization;
- Operating System (OS) Virtualization;
- Network Virtualization;
- Storage Virtualization;
- (...)

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
  - Virtual machines can be relocated as needed among the physical computers in a network. This makes it possible to allocate workloads to servers that have spare computing power. However, it's an entire operating system along with all additional user and system data being replicated, which means we're looking at one or more files that total a few GB in size. As such, VMs are portable but will take significantly longer than containers to move from one location to another.
  - With containers, applications can be built once, placed inside a container image – or series of images, if the app is composed of multiple services – and executed on the host's OS kernel that supports a container engine (e.g. Docker). We can't run Windows containers on Linux, but the other way around is possible thanks to **WSL 2** (Windows Subsystem for Linux, version 2). On macOS, containers must run a Linux host VM.
 
- **Scalability** 
  - Virtual machines can be scaled as necessary by adding more computing power, or by adding extra VMs that help carry the workload. Since they require a separate OS for each instance, they consume much more resources, such as memory and storage, when compared to containers. 
  - Containers offer near limitless scalability thanks to being lightweight and their almost instantaneous start-up time. An orchestration system, such as Google Kubernetes is capable of determining, based upon traffic patterns, when the quantity of containers needs to be scaled out – replication of container images automatically – or removed from the system.

- **Performance**
  - Virtual machines are ideal for supporting applications that require an operating system's full functionality. This can happen when there is a need to manage a wide variety of operating systems. However, VMs are time consuming to build and regenerate because they encompass a full stack system. Any modifications to a virtual machine snapshot can take significant time to regenerate and validate they behave as expected.
  - Containers enable greater server-efficiency, cost-effectiveness, and reduced-overhead over VMs. A container doesn't require its own operating system which corresponds to faster boot times, smaller memory footprints, and generally better performance. Containers also help trim hardware, storage, operating system, and server costs as they reduce the need for using VMs.

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

### Dockerfile
Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile is a text document that contains instructions for packaging an application into an image that can be run anywhere using Docker.

Instruction are not case-sensitive. However, convention is for them to be UPPERCASE to distinguish them from arguments more easily. Docker runs instructions in a Dockerfile in order. A Dockerfile must begin with a `FROM` instruction. The `FROM` instruction specifies the _parent image_ from which you are building. Commands that are less likely to change should be placed higher on the Dockerfile.

_Dockerfile example_
```dockerfile
FROM node:alpine
EXPOSE 8080  # Target port (optional)

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ /usr/src/app

ENTRYPOINT ["node", "server.js"]
```

#### Multi-stage builds
One of the most challenging things about building images is keeping the image size down. Each `RUN`, `COPY`, and `ADD` instruction in the Dockerfile adds a layer to the image, and you need to remember to clean up any artifacts you don't need before moving on to the next layer.

With multi-stage builds, we can use multiple `FROM` statements in a Dockerfile. Each `FROM` instruction can use a different base, and each of them begins a new stage of the build. We can selectively copy artifacts from one stage to another, leaving behind everything we don't want in the final image. 

_Dockerfile with multi-stage building_
```dockerfile
# Use 'AS' to tag multi-stage builds
FROM golang:alpine AS builder

WORKDIR /go/src/app
COPY main.go .
RUN go build -o webserver .

# Starts a new container
FROM alpine  
WORKDIR /app
# Copy binaries form previous container stage
COPY --from=builder /go/src/app /app
CMD ["./webserver"]
```

#### Dockerfile cheat sheet
```dockerfile
# FROM must be the first non-comment instruction in the Dockerfile
FROM image
FROM image[:tag]
FROM image[@digest]

# Allows you to set the Author field of the generated images
MAINTAINER name

# Sets the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile
USER username

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it
WORKDIR /path/to/workdir

# Executes commands always on a new image layer. Often used to install software packages and applications
RUN command
RUN ["executable", "param1", "param2"]

# Used to configure the executables that will always run after the container is initiated, for instance, a script
# Unlike CMD, the ENTRYPOINT is not overridden by default, extra arguments are used as parameters 
ENTRYPOINT ["executable"]

# CMD parameters can be overridden when running the Docker image, unlike ENTRYPOINT. When something can be parameterized we should use CMD
CMD ["executable", "param1", "param2"]

# Copies new files or directories from source directory and adds them to the filesystem of the image at the path destination
COPY src dest
COPY ["src", ... "dest"] # Copy multiple sources into dest

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

# Informs Docker that the container listens on the specified network port(s) at runtime (optional)
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
#### Docker Compose file cheat sheet
```yaml
version: "3.9"
services:
  calculator:
    container_name: calculator
    labels:
      app: cloud-challenge
    build:
      context: services/calculator  # To locate the Dockerfile
      dockerfile: Dockerfile
    # Each microservice has its own image with its own sources on Docker Hub
    image: pexers/calculator
    ports:
      - 80:8080  # EXPOSED_PORT:CONTAINER_PORT
    links:  # Docker creates env. variables and adds containers to the "known hosts" so that they can discover each other
      - addition
      - division
      - multiplication
      - subtraction

  addition:
    container_name: addition
    labels:
      app: cloud-challenge
    build:
      context: services/addition
      dockerfile: Dockerfile
    image: pexers/addition
    ports:
      - 80:8080
      
  division: ...
```
- _links_: instructs Docker to link containers over a network. Docker creates environment variables and adds containers to the known hosts list so that they can discover each other.
- _depends_on_: sets the order in which services must start and stop.

### Docker CLI cheat sheet
_Manage images_
```sh
# Build and tag an image from a Dockerfile
$ docker build -t IMAGE[:TAG] DIRECTORY

# Associate image with Docker Hub repository
$ docker image tag IMAGE[:TAG] USERNAME/REPOSITORY

# Push an image to a repository on DockerHub
$ docker push USERNAME/REPOSITORY

# Download an image with an optional tag
$ docker pull IMAGE[:TAG]

# List all images
$ docker images

# Delete an image
$ docker rmi IMAGE

# Delete dangling images. These are untagged and unnamed (<none>)
$ docker image prune

# Delete all unused images. These have not been assigned or used in a container
$ docker image prune -a

# Save an image to a .tar file
$ docker save IMAGE > TAR_FILE

# Load an image from a .tar file
$ docker load -i TAR_FILE
```
_Manage containers_
```sh
# Start a new container in the background (-d) with no input or output (detached mode)
$ docker run -d IMAGE

# Run and map a port on the Docker host
$ docker run -d -p [exposed_port]:[container_port] [image]

# Run and add a DNS entry. Useful when a service within the container needs to connect to an external host
$ docker run --add-host HOSTNAME:IP IMAGE

# List running containers or all containers (-a)
$ docker ps [-a]

# Start a shell inside a running container. For instance EXECUTABLE=/bin/sh
$ docker exec -it CONTAINER EXECUTABLE

# Copy a file from a container to the host
$ docker cp CONTAINER:SOURCE TARGET

# Copy a file from the host to a container
$ docker cp TARGET CONTAINER:SOURCE

# Show logs of a container
$ docker logs CONTAINER

# Stop/Start a container
$ docker stop/start CONTAINER

# Delete a container
$ docker rm CONTAINER

# Force delete a running container
$ docker rm -f CONTAINER

# Delete stopped containers
$ docker container prune

# Rename a container
$ docker rename OLD_NAME NEW_NAME

# Create an image out of a container
$ docker commit CONTAINER

# Show mapped ports of a container
$ docker port CONTAINER
```
_Manage Docker Compose containers_
```sh
# Build docker images defined in docker-compose.yaml
$ docker compose build

# Start application stack in background defined in docker-compose.yaml
$ docker compose up -d

# Remove application stack defined in docker-compose.yaml
$ docker compose down

# Force recreation of containers images
$ docker compose up --force-recreate --build

# Push images defined in docker-compose.yaml quietly
$ docker compose push --quiet
```


<h1 align='center'>Containerization</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Containerization is the packaging of software code with just the operating system libraries and dependencies required to run the code to create a single lightweight executable called a _container_, that runs consistently on any infrastructure. A _container_ is defined as a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

## Virtual Machines Vs Containers
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/213234299-3f515b43-eca0-4a40-8531-4ac9b27f3515.png" width="700">
</p>

- **Hosting mechanisms**
  - _Virtualization_: emulates physical computer hardware (such as CPU cores, memory, disk) and divides it into multiple separate computers, called virtual machines (VMs). Subsequently, a VM is a computer file, typically called an image, that behaves like another computer within a computer. It has its own Guest OS, Kernel, CPU, drivers, etc. Therefore, it is **hardware-level** virtualization.
  - _Containerization_: is defined as a form of **OS-level** virtualization through which applications are packaged in isolated environments, known as containers. However, each container does not contain a full operating system image, but instead a very small subset of it. Because of this, containers share the **host's OS kernel**, usually a Linux kernel, but at the same time isolate the application processes from the rest of the system. Keep in mind that we can't run Windows containers on Linux, but the other way around is possible thanks to **WSL 2** (Windows Subsystem for Linux, version 2). Since they share the host's OS kernel, they do not need to boot an entire OS every time they start, like VMs do. This enables multiple workloads to run on a single OS kernel instance.

- **Virtualization software**
  - _Hypervisor_: also known as a _virtual machine monitor_ (VMM), is a piece of software that creates and runs virtual machines. It allows one host computer to support multiple guest VMs by virtually sharing its resources, such as processing (CPU), memory (RAM) and disk space. Two of the most popular hypervisors are the Oracle Virtual Box and VMware.
  - _Container engine_: a piece of software that accepts user requests, including command line options, pulls images, and from the end user's perspective runs containers. Moreover, a _container runtime_ is a low-level component of the _container engine_ that mounts the container and works with the host's OS kernel to start and support the containerization process. Popular container engines include Docker, RKT ("Rocket") from RedHat, and LXD (Linux Containers).

- **Storage space**
  - Virtual machines can take up a lot of storage space since they virtualize an entire machine down to the hardware layers. They can quickly grow to several gigabytes in size. This can lead to disk space shortage issues on the virtual machines' host machine.
  - Containers take up much less space than VMs, given that container images are typically only a few megabytes in size. Containers can handle more applications, and reduce the need for multiple virtual machines and operating systems. This allows far more containers to run on the same compute capacity as a single VM.
  
  TODO:
- **Performance**
  - Virtual machines are ideal for supporting applications that require an operating system’s full functionality. This can be when multiple applications are deployed on a server, or when there is a need to manage a wide variety of operating systems.
  - Containers enable greater server-efficiency, cost-effectiveness, and reduced-overhead over virtual machines. A container doesn’t require its own operating system which corresponds with faster boot times, smaller memory footprints, and generally better performance. Containers also help trim hardware, storage, operating system, and server costs as they reduce the need for using virtual machines.

- **Security**
  - Given that all containers share the same underlying hardware system below the operating system layer, it is possible that an **exploit** in one container could break out of the container and affect the shared hardware. Most popular container engines have public repositories of pre-built container images. There is a security risk in using one of these public images as they may contain exploits or may be vulnerable to being hijacked by malicious attackers.

To conclude, containers are a better choice than virtual machines when the priority is to minimize the number of servers being used for multiple applications. Additionally, containers are an excellent choice for tasks with a short lifecycle and for deployment of microservices. With their fast set up time, they are suitable for tasks that may only take a few hours. Virtual machines have a longer lifecycle than containers, and are best used for longer periods of time. In short, containers are lighter weight, smaller, more rapid, and more portable than virtual machines. 

## Docker Engine
The Docker Engine is an open source containerization technology for building and containerizing applications. Before Docker, an application was entirely tied to the machine/server it was running on. With Docker, we can now take this application and _contain it_ in a **docker image**, and redeployed it later on in any other server to duplicate its functionality. Therefore, Docker's container-based platform allows for **highly portable** workloads.

Docker also promotes the usage of microservices. Microservices decentralize packages and divide tasks into separate, stand-alone integrations that collaborate with each other. These are much **easier to scale** when compared to monoliths. Organizations can deploy multiple services or applications on a machine through containers while maintaining a degree of isolation between them.

Docker can fully run in WSL 2. This means that Linux containers can run natively without emulation, resulting in better performance and interoperability between Windows and Linux tools.

TODO: Docker Hub

#### Dockerfile
TODO:
docker file, contains instructions for packaging an application into an image that can be run anywhere using docker.
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
TODO:
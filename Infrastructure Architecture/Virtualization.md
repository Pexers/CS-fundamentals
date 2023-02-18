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

Instruction are not case-sensitive. However, convention is for them to be UPPERCASE to distinguish them from arguments more easily. Docker runs instructions in a Dockerfile in order. A Dockerfile must begin with a `FROM` instruction. The `FROM` instruction specifies the _parent image_ from which you are building.
_Dockerfile example_
```dockerfile
FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ /usr/src/app

EXPOSE 8080  # Target port (optional)

CMD ["node", "server.js"]
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

# RUN is an image build step, the state of the container after a RUN command will be committed to the container image. A Dockerfile can have many RUN steps that layer on top of one another to build the image
RUN command
RUN ["executable", "param1", "param2"]

# CMD is the command the container executes by default when you launch the built image. A Dockerfile will only use the final CMD defined
CMD ["executable", "param1", "param2"]

# Used to configure the executables that will always run after the container is initiated, for instance, a script
ENTRYPOINT ["executable", "param1", "param2"]

# Copies new files or directories from source directory and adds them to the filesystem of the image at the path destination
COPY src dest
COPY ["src", ... "dest"]  # Copy multiple sources into 'dest'

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
      - remainder
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

## Kubernetes
Often misunderstood as a choice between one or the other, Kubernetes and Docker are different yet complementary technologies for running containerized applications. Docker is not an alternative to Kubernetes, the difference relates to the role each play in containerizing and running applications. Kubernetes, also known as _kube_ or _K8s_, is not a container engine software, per se, but rather a **container orchestrator**.

Originally designed by Google, Kubernetes provides automated container orchestration, improves reliability and reduces the time and resources attributed to daily operations. 

### Kubernetes components
_In summary_:
> A Kubernetes **Cluster** consists of a set of worker machines, called **Nodes**, that run containerized applications. Every Cluster has at least one worker Node.
>
> The worker Node(s) host the **Pods** that are the components of the application workload. The **Control Plane** manages the worker Nodes and the Pods in the Cluster. In production environments, the Control Plane usually runs across multiple computers and a Cluster usually runs multiple Nodes, providing fault-tolerance and high availability.
<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/213886253-a9ce21d2-ab9c-464d-a255-48f1aa38c9ec.png" width="600">
</p>

- **Pod**: the smallest unit of execution in Kubernetes, consisting of one or more containers, with shared storage, network resources, and a specification for how to run the containers (Pod as in a pod of whales or pea pod). Complex systems with multiple microservices should be deployed using **a single Pod per microservice**, containing one or more containers. Is not a good practice to configure a Pod with more than one microservice, otherwise they won't be able to scale independently.
- **Node**: are the physical servers or VMs that make up the Kubernetes Cluster. Nodes are interchangeable and typically not addressed individually by developers, other than when maintenance is required. Each Node can have multiple Pods.
- **Namespaces**: provides a mechanism for isolating groups of resources within a single cluster. Organizations that use a single cluster for development, testing, and production can also use namespaces to isolate environments. Additionally, namespaces enable the use of RBAC, so teams can define roles that group lists of permissions.
- **Cluster**: a set of Nodes that run containerized applications. They are more lightweight and flexible than virtual machines. In this way, Kubernetes Clusters allow for applications to be more easily developed, moved and managed. While it seems quite logical to have each environment and/or application in its own Cluster, it is not required, and it's not the only way. Kubernetes makes this easy enough by making it possible to quickly roll out multiple Nodes with the same configuration.
- **Control Plane**: makes global decisions about the Cluster (for instance, scheduling), as well as detecting and responding to Cluster events (for instance, starting up a new Pod when a deployment's replicas field is unsatisfied). The Control Plane not only exposes the layer that deploys the containers, but also manages their lifecycle.
- **Node Components**: components that run on every Node, maintaining running Pods and providing the Kubernetes runtime environment.
  - _kubelet_: takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy.
  - _kube-proxy_: maintains network rules on Nodes. These network rules allow network communication to Pods from network sessions inside or outside of the Cluster.
  - _container runtime_: the software that is responsible for running containers. Kubernetes supports container runtimes such as _containerd_, CRI-O, and any other implementation of the Kubernetes CRI (Container Runtime Interface).
- **Control Plane Components**: components that can be run on any machine in the Cluster. However, for simplicity, set up scripts typically start all Control Plane components on the same machine, and do not run user containers on this machine.
  - _kube-apiserver_: exposes the Kubernetes API designed to scale horizontally, that is, it scales by deploying more instances.
  - _etcd_: consistent and highly-available key value store used as Kubernetes' backing store for all Cluster data.
  - _kube-scheduler_: watches for newly created Pods with no assigned Node, and selects a Node for them to run on.
  - _kube-controller-manager_: runs controller processes.
  - _cloud-controller-manager_: lets customers link the Cluster into cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with the Cluster.

In Google Kubernetes Engine (GKE), we can create Clusters using one of the following modes of operation:
- _Autopilot_: provides a fully-provisioned and managed Cluster configuration. Autopilot Clusters are pre-configured with an optimized Cluster configuration that is ready for production workloads. The number of Nodes in this mode is not accessible.
- _Standard_: provides advanced configuration flexibility over the Cluster's underlying infrastructure. For Clusters created using the Standard mode, the customer determines the configurations needed for production workloads.

### Kubernetes objects
Persistent entities in the Kubernetes system. Kubernetes uses these entities to represent the state of the Cluster, and are expressed using the **YAML format**.
  - **Deployment**: is a specialized term in the context of Kubernetes. It doesn't necessarily refer to the deployment of applications or services. Rather, a deployment is a file that defines a Pod's desired behavior or characteristics. It provides a way to communicate the desired state to Kubernetes deployments, and the controller works on changing the present state into the desired state. Deployment is a higher-level concept that manages ReplicaSets and provides declarative updates to Pods along with a lot of other useful features. Therefore, it is recommend using Deployments instead of directly using ReplicaSets, unless a custom update orchestration is required.
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: calculator-deployment
      labels:
        app: calculator-app
    spec:           # 'spec' properties are specific to the resource 'kind'
      replicas: 1   # Ensures there is always a stable set of running Pods
      selector:
        matchLabels:
          app: calculator-app
      template:
        metadata:
          labels:
            app: calculator-app
        spec:
          containers:
          - name: calculator-app
            image: pexers/calculator:latest
            imagePullPolicy: Always   # Always pull the latest image from Docker Hub on start
            ports:
            - containerPort: 80       # The actual port where the container is running (=targetPort)
    ```
  - **Service**: Pods are created and destroyed to match the desired state of the Cluster. Each Pod gets its own IP address, however, in a _deployment_, the set of Pods running in one moment in time could be different from the set of Pods running that application a moment later (IPs can change). A Service in Kubernetes allows to have a permanent IP address, that we don't have to change the endpoint every time the Pod is recreated. In case we have the same Pod replicated in different Nodes that use the same Service, it can also act like a load balancer. The Service will redirect the workload to the less occupied Pod. A _headless_ Service is a regular Kubernetes Service where the `spec.clusterIP` is explicitly set to _None_ and the `spec.type` is set to _ClusterIP_.
    There are four kinds of Services:
      - _ClusterIP_ (default): internal clients send requests to a stable internal IP address.
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: addition
          labels:
            app: addition-app
        spec:
          type: ClusterIP     # No external IP exposed, only internal
          selector: 
            app: addition-app
          ports:
          - protocol: TCP
            port: 80          # The exposed port within the Cluster
            targetPort: 8080  # The actual port where the container is running (=containerPort)
        ```
      - _LoadBalancer_: is the standard way to expose a Service to the internet. Clients send requests to the exposed IP address of a network load balancer.
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: calculator-service
          labels:
            app: calculator-app
        spec:
          type: LoadBalancer  # Exposes an external IP
          selector: 
            app: calculator-app
          ports:
          - protocol: TCP
            port: 80          # The exposed port outside/within the Cluster
            targetPort: 8080  # The actual port where the container is running (=containerPort)
        ```
      - _NodePort_: as the name implies, it opens a specific port on all the Nodes (the VMs) of the Cluster, and any traffic that is sent to this port is forwarded to the Service. There are a few downsides with this approach: (i) we can only have one Service per port and (ii) we can only use a **port range** of 30000–32767.
      - _ExternalName_: acts as a proxy, allowing to redirect requests to a service sitting outside (or inside) the Cluster. It works as other regular services, but instead of returning the Cluster IP of the service, it returns the CNAME record with the value mentioned in the `externalName` attribute.
  - **Ingress**: an API object that manages external access to the internal Services in a Cluster, typically HTTP. Ingress will use a NodePort or LoadBalancer service to expose itself to the world so it can act as a proxy. For instance, we can use an NGINX Ingress Controller for routing incoming HTTP requests to different Services based on their host HTTP header and URL.
    ```yaml
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: calculator-ingress
    spec:
      rules:
      - http:
          paths:  # Proxy incoming requests to internal services
          - path: /addition
            pathType: Prefix
            backend:
              service: 
                name: addition-service
                port:
                  number: 80    # The exposed port within the Cluster
          - path: /division
            pathType: Prefix
            backend:
              service: 
                name: division-service
                port:
                  number: 80    # The exposed port within the Cluster
    ```
  - **StatefulSet**: used to host stateful applications (such as databases) on Kubernetes to guarantee state consistency. However, it's a common practice to host stateful applications **outside** the Kubernetes Cluster, in order to avoid data inconsistencies, and host only stateless applications on Kubernetes.
  - **DaemonSet**: ensures that all (or some) Nodes run a copy of a Pod. As Nodes are added to the Cluster, Pods are added to them. As Nodes are removed from the Cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.
  - **Job**: creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate. As Pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete. Deleting a Job will clean up the Pods it created. It can also be used to run multiple Pods in parallel.

TODO: ConfigMap and Secrets.

### Kubernetes patterns
TODO: Work in progress
**Note**: Read "_O'Reilly: Kubernetes patterns for designing cloud-native apps_" for a more complete list of K8s patterns.
- **Foundational patterns**: cover the core concepts of Kubernetes. These patterns are the underlying principles and practices for building container-based cloud-native applications.
  - _Health Probe_: dictates that every container should implement specific APIs to help the platform observe and manage the application in the healthiest way possible. To be fully automatable, a cloud-native application must be highly observable by allowing its state to be inferred so that Kubernetes can detect whether the application is up and ready to serve requests. 
  - _Predictable Demands_: explains why every container should declare its resource profile and stay confined to the indicated resource requirements. This pattern describes how you should declare application requirements, whether they are hard runtime dependencies or resource requirements.
  - _Automated Placements_: explains how to influence workload distribution in a multi-node Cluster. Placement is the core function of the Kubernetes scheduler for assigning new Pods to Nodes satisfying container resource requests and honoring scheduling policies. This pattern describes the principles of Kubernetes' scheduling algorithm and the way to influence the placement decisions from the outside.
- **Behavioral patterns**: describe the patterns that sit on top of foundational patterns and add granularity to concepts for managing various types of container and platform interactions.
  - _Batch Job_: describes how to run an isolated, atomic unit of work until completion. This pattern is suited for managing isolated atomic units of work in a distributed environment.
  - _Service Discovery_: explains how clients can access and discover the instances that are providing application Services. For this purpose, Kubernetes provides multiple mechanisms, depending on whether the Service consumers and producers are located on or off the Cluster.
  - _Stateful Service_: describes how to create and manage distributed stateful applications with Kubernetes. Such applications require features such as persistent identity, networking, storage, and ordinality. The _StatefulSet_ primitive provides these building blocks with strong guarantees ideal for the management of stateful applications.
- **Structural patterns**: are related to organizing containers within a Kubernetes Pod.
  - _Init Containers_: introduces a separate life cycle for initialization-related tasks and the main application containers. Init Containers enable separation of concerns by providing a separate life cycle for initialization-related tasks distinct from the main application containers. This pattern introduces a fundamental Kubernetes concept that is used in many other patterns when initialization logic is required.
  - _Sidecar_: describes how to extend and enhance the functionality of a pre-existing container without changing it. This pattern is one of the fundamental container patterns that allows single-purpose containers to cooperate closely together.

### Kubernetes autoscaling
Kubernetes lets us automate many management tasks, including provisioning and scaling. Instead of manually allocating resources, we can create automated processes that save time, lets us respond quickly to peaks in demand, and conserve costs by scaling down when resources are not needed.
- **Horizontal Pod Autoscaling (HPA)**: automatically updates a workload resource (such as a Deployment or StatefulSet), with the aim of automatically scaling the workload to match demand. Kubernetes already does this automatically, but can be configured. Each Pod is meant to run a single instance of a given application. If you want to scale your application horizontally (to provide more overall resources by running more instances), you should use multiple Pods, one for each instance. In Kubernetes, this is typically referred to as replication. Replicated Pods are usually created and managed as a group by a workload resource and its controller.
- **Vertical Pod Autoscaling (VPA)**: TODO:
- **Cluster Autoscaling**: TODO: scales the overall cluster size. Adds extra machines that pods can run on.

### Kubectl CLI cheat sheet
Kubernetes provides a command line tool for communicating with a Kubernetes Cluster's Control Plane, using the Kubernetes API, named _kubectl_ (Kubernetes Control).

_Syntax_
```sh
$ kubectl [command] [TYPE] [NAME] [flags]

# command: The operation to perform on one or more resources, for example: create, get, describe, delete
# TYPE: The resource type. Resource types are case-insensitive and can be specified in singular, plural, or abbreviated forms
# NAME: The name of the resource. Names are case-sensitive. If the name is omitted, details for all resources are displayed, for example 'kubectl get pods'
# flags: Optional flags. For example, you can use the -s or --server flags to specify the address and port of the Kubernetes API server
```
_Manage Pods and Services_
```sh
# Get the documentation for pod manifests
$ kubectl explain TYPE NAME

# List all pods in the namespace
$ kubectl get pods

# List all services in the namespace
$ kubectl get services

# List all pods with extra information, such as IP addresses
$ kubectl get pods -o wide

# List all pods in all namespaces
$ kubectl get pods --all-namespaces

# Get a pod's YAML
$ kubectl get pod POD -o yaml

# Creates and updates resources in a cluster defined in the pods directory
$ kubectl apply -f ./pods

# Allow restart to take place with zero downtime by incrementally updating Pods instances with new ones
$ kubectl rollout restart deploy

# Dump pod logs (stdout)
$ kubectl logs POD

# Delete pod
$ kubectl delete pod POD

# Start interactive shell
$ kubectl exec -it POD -- sh
```
_Manage configurations_
```sh
# Set a cluster entry in the kubeconfig
$ kubectl config set-cluster my-cluster-name 

# Add a new user to your kubeconf that supports basic auth
$ kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword

# Delete user foo
$ kubectl config unset users.foo
```
_Manage Nodes and Cluster_
```sh
# List all nodes
$ kubectl get nodes

# Show metrics for a given node
$ kubectl top node my-node

# Display addresses of the master and services
$ kubectl cluster-info

# Dump current cluster state to stdout
$ kubectl cluster-info dump

# Dump current cluster state to /path/to/cluster-state
$ kubectl cluster-info dump --output-directory=/path/to/cluster-state
```
_Other_
```sh
# Display the Kubernetes version running on the client and server
$ kubectl version
```
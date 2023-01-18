<h1 align='center'>Containerization</h1>

Copyright &copy; 2023, Pexers (https://github.com/Pexers)

Containerization is the packaging of software code with just the operating system (OS) libraries and dependencies required to run the code to create a single lightweight executable called a _container_, that runs consistently on any infrastructure.

## Virtual Machines Vs Containers
|Virtual Machines|Containers|
|---|---|
|<li>**Virtualization** emulates computer hardware to enable the hardware elements of a single computer including processors, memory, and storage to be divided into multiple computers, called virtual machines. Subsequently, a VM is a computer file, typically called an image, that behaves like another computer within a computer.</li>|<li>**Containerization** is defined as a form of operating system virtualization through which applications are packaged in isolated environment, known as containers, using a common operating system. By providing a way to virtualize at OS level, multiple workloads can run on a single operating system instance. A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. Essentially, a container is a fully packaged and portable computing environment.</li>|
|<li>A _hypervisor_, also known as a _virtual machine monitor_ (VMM), is a piece of software that creates and runs virtual machines. It allows one host computer to support multiple guest VMs by virtually sharing its resources, such as processing (CPU), memory (RAM) and disk space. Two of the most popular hypervisors are the Oracle Virtual Box and VMware.</li>|<li>A _container engine/runtime_ is a piece of software that accepts user requests, including command line options, pulls images, and from the end user's perspective runs containers.</li>|
|<li>Virtual machines can take up a lot of storage space since they virtualize an entire machine down to the hardware layers. They can quickly grow to several gigabytes in size. This can lead to disk space shortage issues on the virtual machines host machine.</li>|<li>Containers take up less space than virtual machines (container images are typically only a few megabytes in size), can handle more applications, and reduce the need for multiple virtual machines and operating systems. This allows far more containers to run on the same compute capacity as a single VM. Popular container engines include Docker, RKT ("Rocket") from RedHat, and </li>|
|<li>Virtual machines are ideal for supporting applications that require an operating system’s full functionality. This can be when multiple applications are deployed on a server, or when there is a need to manage a wide variety of operating systems.</li>|<li>Containers enable greater server-efficiency, cost-effectiveness, and reduced-overhead over virtual machines. A container doesn’t require its own operating system which corresponds with faster boot times, smaller memory footprints, and generally better performance. Containers also help trim hardware, storage, operating system, and server costs as they reduce the need for using virtual machines.</li>|

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/213234299-3f515b43-eca0-4a40-8531-4ac9b27f3515.png" width="700">
</p>

Given that all containers share the same underlying hardware system below the operating system layer, it is possible that an **exploit** in one container could break out of the container and affect the shared hardware. Most popular container engines have public repositories of pre-built container images. There is a security risk in using one of these public images as they may contain exploits or may be vulnerable to being hijacked by malicious attackers.

To conclude, containers are a better choice than virtual machines when the priority is to minimize the number of servers being used for multiple applications. Additionally, containers are an excellent choice for tasks with a short lifecycle and for deployment of microservices. With their fast set up time, they are suitable for tasks that may only take a few hours. Virtual machines have a longer lifecycle than containers, and are best used for longer periods of time. In short, containers are lighter weight, smaller, more rapid, and more portable than virtual machines. 




## Docker Engine

## Kubernetes
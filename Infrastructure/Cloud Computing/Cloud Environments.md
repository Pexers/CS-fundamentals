<h1 align='center'>Cloud Environments</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

> [!NOTE]
> Work in progress.

### IaaS Vs PaaS Vs FaaS Vs SaaS
- **IaaS**: Infrastructure as a service, or IaaS, delivers on-demand infrastructure resources to organizations via the cloud, such as compute, storage, networking, and virtualization. Customers don’t have to manage, maintain, or update their own data center infrastructure, but are responsible for the operating system, middleware, virtual machines, and any apps or data.
    - Some examples of IaaS are: AWS, Microsoft Azure, GCE (Google Compute Engine).
- **PaaS**: Platform as a service, or PaaS, delivers and manages all the hardware and software resources to develop applications through the cloud. Developers and IT operations teams can use PaaS to develop, run, and manage applications without having to build and maintain the infrastructure or platform on their own. Customers still have to write the code and manage their data and applications, but the environment to build and deploy apps is managed and maintained by the cloud service provider.
    - Some examples of PaaS are: Heroku, Red Hat OpenShift, Google App Engine.
- **FaaS**: Function as a Service, or FaaS, allows you to build and deploy a small piece of code, or a function, that performs a specific task. The cloud provider adds scale if needed when a function executes.
    - Some examples of FaaS are: Cloud Functions, AWS Lambda, Azure Functions.
- **SaaS**: Software as a Service, or SaaS, provides the entire application stack, delivering an entire cloud-based application that customers can access and use. SaaS products are completely managed by the service provider and come ready to use, including all updates, bug fixes, and overall maintenance. Most SaaS applications are accessed directly through a web browser, which means customers don’t have to download or install anything on their devices. 
    - Some examples of SaaS are: Google Workspace apps (Gmail, GDrive, etc.), Netflix, Slack, and many others.

<p align="center">
  <img src="https://github.com/Pexers/CS-fundamentals/assets/47757441/8e56eb85-cd50-4b60-80bb-972616b48869" width="500">
</p>

### Cloud computing types
- Public cloud: delivered via the internet and shared across organizations.
- Private cloud: dedicated solely to your organization.
- Hybrid cloud: any environment that uses both public and private clouds.

### Virtual Private Cloud (VPC)
A **Virtual Private Cloud (VPC)** is a secure, isolated environment within a public cloud, allowing organizations to run code, store data, and host applications with the privacy and control of a private cloud, but with the scalability and flexibility of public cloud infrastructure. VPCs are widely used to balance security requirements with the benefits of cloud computing.

#### Key Features of a VPC
- **Isolation:** VPC resources are logically separated from other tenants in the public cloud.
- **Customizable Networking:** Users can define their own IP address ranges, subnets, route tables, and network gateways.
- **Security Controls:** Integration with firewalls, security groups, and access control lists to restrict inbound and outbound traffic.
- **Hybrid Connectivity:** Ability to connect on-premises infrastructure securely to the VPC via VPN or dedicated connections.

#### How Is a VPC Isolated Within a Public Cloud?
A VPC uses several networking technologies to ensure isolation and security:

- **Subnets:** Subnets divide the VPC’s IP address range into smaller segments. Private subnets are not accessible from the public internet, while public subnets can be reached externally.
- **VLAN (Virtual LAN):** VLANs segment the network at Layer 2 of the OSI model, providing further isolation between resources.
- **VPN (Virtual Private Network):** VPNs encrypt traffic between the VPC and external networks, ensuring secure communication over public infrastructure.

A typical VPC setup includes dedicated subnets and VLANs accessible only by the VPC owner. The customer connects to their VPC via VPN, so data in transit remains private and protected from other public cloud users.

#### Subnet Types
- **Public Subnet:** Accessible from the internet, typically used for web servers or resources that need external access.
- **Private Subnet:** Only accessible from within the VPC, used for databases or internal services.

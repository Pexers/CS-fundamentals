> **Note**  
> Work in progress.

### Cloud environments (IaaS Vs PaaS Vs FaaS Vs SaaS)
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

---

VPC - Virtual Private Cloud
A virtual private cloud (VPC) is a secure, isolated private cloud hosted within a public cloud.
VPC customers can run code, store data, host websites, and do anything else they could do in an ordinary private cloud, but the private cloud is hosted remotely by a public cloud provider. VPCs combine the scalability and convenience of public cloud computing with the data isolation of private cloud computing.

How is a VPC isolated within a public cloud?
A VPC isolates computing resources from the other computing resources available in the public cloud. The key technologies for isolating a VPC from the rest of the public cloud are:

Subnets: A subnet is a range of IP addresses within a network that are reserved so that they're not available to everyone within the network, essentially dividing part of the network for private use. In a VPC these are private IP addresses that are not accessible via the public Internet, unlike typical IP addresses, which are publicly visible.

VLAN: A LAN is a local area network, or a group of computing devices that are all connected to each other without the use of the Internet. A VLAN is a virtual LAN. Like a subnet, a VLAN is a way of partitioning a network, but the partitioning takes place at a different layer within the OSI model (layer 2 instead of layer 3).

VPN: A virtual private network (VPN) uses encryption to create a private network over the top of a public network. VPN traffic passes through publicly shared Internet infrastructure – routers, switches, etc. – but the traffic is scrambled and not visible to anyone.

A VPC will have a dedicated subnet and VLAN that are only accessible by the VPC customer. This prevents anyone else within the public cloud from accessing computing resources within the VPC – effectively placing the "Reserved" sign on the table. The VPC customer connects via VPN to their VPC, so that data passing into and out of the VPC is not visible to other public cloud users.

Public subnet: a subnet accessible from the internet
Private subnet: a subnet only accessible from within the VPC
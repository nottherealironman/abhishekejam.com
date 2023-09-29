---
layout: default
title: How to setup load balancer with Elastic file system (EFS) in AWS? Part 1 
date: 2022-02-27
tags: ["Cloud computing", ", Cloud services", ", AWS"]
---
<section class="article-detail-block dark-bg mtb-150">
    <div class="container grid grid-1">
        <div class="mi-content">
            <h1>{{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
            <!-- start_excerpt -->
            <p>A couple of&nbsp; weeks back, I had an opportunity to setup application load balancer in AWS and use&nbsp;elastic file system as network attached storage between the servers behind the load balancer. I had to juggle through&nbsp;multiple resources such as AWS documentation, medium articles, stackoverflow threads and YouTube videos as&nbsp;I could not find a single resource that guide me through the process. So, this is my attempt to connect the dots and sum up all the steps that I followed to configure load balancer with EFS in a single resource. As a&nbsp;single&nbsp;article would be too long to include all steps, therefore I'll be writing four part series article to describe the steps.&nbsp;<br>
            <!--end_excerpt-->
<br>
In this first part, we're going to review the basic terminologies that are important to understand in order&nbsp;to configure the load balancer with elastic file system. Apart from that, we'll also review the architecture of our cloud infrastructure.<br>
Every definitions on this article are taken from AWS documentation and other reliable resources.<br>
All right, let's get started.</p>

<h3>Basic terminologies</h3>

<h4>1. Load balancer</h4>

<p>According to<cite> <a href="http://www.nginx.com/resources/glossary/load-balancing/">Nginx</a>, "Load balancing&nbsp;refers to efficiently distributing incoming network traffic across a group of backend servers, also known as a&nbsp;server farm&nbsp;or&nbsp;server pool".&nbsp; </cite>A load balancer can be&nbsp;essential when the traffic&nbsp;on the web application grows in order to avoid application downtime.&nbsp;</p>

<h4>2. Virtual private cloud</h4>

<p><cite>"A virtual private cloud (VPC) is a secure, isolated&nbsp;<a href="https://www.cloudflare.com/learning/cloud/what-is-a-private-cloud/">private cloud</a>&nbsp;hosted within a&nbsp;<a href="https://www.cloudflare.com/learning/cloud/what-is-a-public-cloud/">public cloud</a>"</cite>&nbsp;as stated by <a href="http://www.cloudflare.com/en-au/learning/cloud/what-is-a-virtual-private-cloud/">Cloudfare</a>. A virtual private cloud allows to enforce multiple layers of security for the resources within it. In relation to elastic load balancer, all requests and responses&nbsp;to/from the web application passes through the load balancer therefore, only the load balancer can be hosted on internet facing public&nbsp;subnetwork while the web servers&nbsp;can be hosted in a private subnetwork with no internet access.&nbsp;</p>

<h4>3. Subnet/Subnetwork</h4>

<p>According to <a href="https://www.cloudflare.com/en-au/learning/network-layer/what-is-a-subnet/">Cloudfare</a>, "subnet or subnetwork&nbsp;is a&nbsp;<a href="https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/">network</a>&nbsp;inside a network". A subnet consists of a range of IP addresses&nbsp;which are subset of it's parent network. While configuring&nbsp;elastic load balancer, we can create multiple subnets inside the VPC and host&nbsp;an isolated server in each of them.</p>

<h4>4. Availibility zones</h4>

<p>In cloud computing, an availability zone is one or more isolated data center(s)&nbsp;which are backed by redundant power supply&nbsp;to avoid downtime in case of failures. The leading cloud service provider, AWS, has multiple availability zones in each AWS region.&nbsp;Similarly, Microsoft Azure follows the same.</p>

<h4>5. Network attached storage</h4>

<p>As stated in <a href="http://www.redhat.com/en/topics/data-storage/network-attached-storage">Red hat</a> documentation, "<cite>Network-attached storage (NAS) is a&nbsp;<a href="https://www.redhat.com/en/topics/data-storage/file-block-object-storage">file-level storage architecture</a>&nbsp;that makes stored data more accessible to networked devices"</cite>. An example of network attached storage is an Elastic file system (EFS) in AWS. Data stored in elastic file system can be accessed from multiple servers (EC2 instances).</p>

<p>&nbsp;</p>

<h3>Architecture of cloud infrastructure</h3>

<p><img alt="" src="/media/uploads/2022/02/27/load-balancer-with-efs-architecture-2.png"></p>

<p><small>Image: Architecture of elastic load balancer with EFS (Image inspired from: <a href="https://aws.amazon.com/blogs/aws/new-aws-elastic-load-balancing-inside-of-a-virtual-private-cloud/">AWS blog</a> )</small></p>

<p>Before configuring&nbsp;load balancer, it is really important to understand the architecture of the cloud infrastructure. As you can see in the above diagram, the load balancer act as a single point contact for the end users as opposed to the traditional web architecture where users directly interact with the web server. The loadbalancer is launched in the public-facing subnet so that end-users can access through internet. Similarly, the web servers (EC2 instances) are lunched in the subnet of&nbsp;different availability zones in order to increase the availibility of the web application.</p>

<p>Apart from that, the elastic file system is mounted on each of the EC2 instances so&nbsp;they both can read and write to/from the storage. The benifit of this approach is that we can deploy our code on the mount point of just one of the server and the application will be available on both of them.&nbsp;</p>

<p>Lastly, we have all of our resources<img alt="" src="/media/uploads/2022/02/27/load-balancer-with-efs-architecture.svg">&nbsp;(load balancer, EC2 instances and EFS)&nbsp;within the virtual private network which adds additional layer of security to the infrastrucutre.</p>

<p>&nbsp;</p>

<h3>Wrapping up</h3>

<p>Configuring application load balancer in AWS can be&nbsp;quite a challenging task if you don't have much experience in cloud services.&nbsp;The basic terminalogies in the above article may help to understand a bit about the moving wheels on configuring load balancer. In addition, the architecture diagram of the load balancer with EFS configuration can help to grasp a clear picture of the whole process. I hope this article was helpful.<br>
See you in the next series of configuring load balancer.</p>
        </div>
    </div>
</section>
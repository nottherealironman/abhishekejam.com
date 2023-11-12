---
layout: default
title: How to setup load balancer with Elastic file system (EFS) in AWS? Part 2
date: 2022-04-18
tags: ["Cloud computing", ", Cloud services", ", AWS", ", VPC", ", Subnets"]
---
<section class="article-detail-block dark-bg mtb-150">
    <div class="container content-wrapper">
        
            <h1>{{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
            <!-- start_excerpt -->
            <p>Hello folks, in this second part of the article of configuring load balancer with EFS, we’re going to configure a virtual private cloud and create subnetworks for the load balancer and servers behind it. A virtual private cloud helps to provide multiple layers of security by allowing us to enforce the access control list (ACL) on the subnetwork and security groups on the elastic load balancer and EC2 instances as <!--end_excerpt--> I mentioned in the&nbsp;<a class="anchor" href="https://abhishekejam.com/articles/how-setup-load-balancer-elastic-file-system-efs-aws-part-1/">last article</a>.&nbsp;</p>
            

<p>The minimal configuration of the load balancer requires at least two EC2 instances in different availability zones for availability and scalability of the application. Similarly, <a class="anchor" href="http://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancer-getting-started.html" target="_blank">AWS docs</a>&nbsp;suggest creating at least one public subnet on each of the availability zones for the load balancer. Apart from that, we also need to create two private subnets for the two servers (EC2 instances) which serve the request for incoming traffic on the load balancer.</p>

<p>To sum up, we need to create a VPC with two public and private subnets.&nbsp;</p>

<h3>Setup VPC and subnet</h3>

<p>In order to get to the VPC configuration wizard, you can either type “VPC” on the search bar or select VPC from the <em>Services &gt; All Services</em> on the AWS dashboard. Then, click on <em>Create VPC</em> on the navigation pane.&nbsp;</p>

<p>The following provides a summary of the steps from the <a class="anchor" href="http://docs.aws.amazon.com/vpc/latest/userguide/working-with-vpcs.html#create-vpc-and-other-resources" target="_blank">AWS docs</a>&nbsp;to configure VPC and subnets:</p>

<ol>
	<li>Select VPC, subnets, etc. from the resource creation radio-options.</li>
	<li>Give a meaningful name to the VPC.</li>
	<li>Enter 10.0.0.0/20 in the IPV4 CIDR block for the VPC. This gives us 4096 IP addresses and it should be more than enough to be divided between 4 subnets as <a class="anchor" href="http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-backend-instances.html#set-up-ec2" target="_blank">AWS</a>&nbsp;recommends only a minimum of 8 free IP addresses on the public subnets where the load balancer resides.</li>
	<li>Default options should be fine for the rest of the fields.&nbsp;</li>
</ol>

<div class="code"><code>IPV6 CIDR block:&nbsp;No IPv6 CIDR block&nbsp;</code><br>
<code>Tenancy: Default</code><br>
<code>Availability Zones (AZs): 2</code><br>
<code>Number of public subnets: 2</code><br>
<code>Number of private subnets: 2</code><br>
<code>Number of public subnets: None</code><br>
<code>VPC endpoints<strong>:</strong>&nbsp;S3 gateway</code><br>
<code>DNS options: Enable DNS resolution</code></div>

<p>Lastly, click on the <em>Create VPC</em> button to create VPC and subnets.</p>

<p><img alt="AWS VPC and subnets configuration" src="/assets/images/aws-vpc-efs-configuration_QvCy6WG.png" style="width:80%"></p>

<p><img alt="AWS VPC and subnets configuration" src="/assets/images/aws-vpc-settings-2.png" style="width:80%"></p>

<p><small>Image: Screenshot of VPC and subnets configuration wizard</small></p>

<p>As you can see in the below screenshot, AWS evenly divides the IP addresses to each of&nbsp; the subnets within the VPC. Similarly, the two public subnets, which are connected to the internet gateway share&nbsp;the same route table, however, each of the private subnets has a separate record on the route table.</p>

<p><img alt="" src="/assets/images/aws-vpc-subnets-preview.png"></p>

<p><small>Image: Preview of subnets, route tables and connections in VPC</small></p>

<h3>Wrapping up</h3>

<p>The steps to create VPC and subnets are quite straightforward&nbsp;on the AWS management console. In addition, AWS provides a fancy real-time visualization of subnets with associated route tables and network connections while creating VPC.&nbsp;</p>
    </div>
</section>
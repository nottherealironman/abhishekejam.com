---
layout: default
title: How to setup load balancer with Elastic file system (EFS) in AWS? Part 4
date: 2022-06-19
tags: ["Cloud computing", ", Cloud services", ", AWS", ", Load balancing", ", EFS"]
---
<section class="article-detail-block dark-bg mtb-150">
    <div class="container grid grid-1">
        <div class="mi-content">
            <h1> {{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
			
            <p>Hello everyone, we’re going to solve the last piece of the puzzle in this article. But before that let’s ponder why you should use EFS over other AWS storage services.</p>

<h3>Why EFS?</h3>
<!-- start_excerpt -->
<p>One of the main reasons to use EFS is that it is elastic, meaning that you don’t have to provision the infrastructure for storage everytime you want to add more data. The file system grows and shrinks based on the amount of information stored in it. Apart from that EFS is based on a network file system (NFS) and it can be accessed from multiple EC2 instances concurrently.</p>
<!--end_excerpt-->
<p>Now, we’ve found the reason why we should use EFS, let’s get started.</p>

<p>The following steps can be followed to configure the EFS with EC2 instances behind the load balancer.</p>

<ol>
	<li style="list-style-type:decimal">Create EFS service</li>
	<li style="list-style-type:decimal">Install NFS client on EC2 instances</li>
	<li style="list-style-type:decimal">Mount EFS on the EC2 instances</li>
	<li style="list-style-type:decimal">Configure security groups</li>
	<li style="list-style-type:decimal">Persistent mount for reboots</li>
</ol>

<h3>Create EFS service</h3>

<p>In the AWS management console, search EFS on the search bar and click on the link to Elastic File System dashboard. Then click on the <strong><em>Create file system</em></strong> button on the top right. Give a meaningful name to the file system and select the VPC that we’ve created in the <a class="anchor" href="https://abhishekejam.com/articles/how-setup-load-balancer-elastic-file-system-efs-aws-part-2/" style="text-decoration:none" target="_blank">second article</a>. Leave the default option as <strong><em>Regional</em></strong> for the Availability and durability section as it’ll store the EFS in multiple availability zones. We’re good to go now so click on the Create button.</p>

<p><img src="/assets/images/create-efs.png" style="height:562px; width:602px"></p>

<p>&nbsp;</p>

<h3>Install NFS client</h3>

<p>The next step is to install an NFS client on the EC2 instances. As EFS is based on a network file system, we need to install an NFS client on each of the EC2 instances where we want to mount the EFS volume.</p>

<p>Command to install NFS on Debian based Linux:</p>

<div class="code"><code>$ sudo apt-get update</code><br>
<code>$ sudo apt-get -y install nfs-common</code></div>

<p>Command to install NFS on Amazon Linux AMI, Red Hat Linux AMI or CentOS:</p>

<div class="code"><code>$ sudo yum update -y</code><br>
<code>$ sudo yum -y install nfs-utils</code></div>

<p>&nbsp;</p>

<h3>Mount EFS on the EC2 instances</h3>

<p>Unlike EBS which comes attached with the EC2 instances during the creation of the instance, we need to mount or attach the elastic file system to each of the EC2 instances from where we want to access the file system.</p>

<p>Alright enough talking, let’s mount this bad boy to our EC2 instance in the private subnet.&nbsp;</p>

<p>Click on the file system recently created from the EFS dashboard and click on the <strong><em>Attach</em></strong> button on the top-right section. A pop-up box will appear with commands to mount the EFS on a Linux instance.</p>

<p><img src="/assets/images/attach-efs-to-ec2.png"></p>

<p>There are multiple ways to mount the file system however I feel the options to mount via IP is the simplest of all.</p>

<p>Now SSH into your EC2 instance in the private subnet through bastion host or jump box. Then create a directory where you want to mount the EFS file system.&nbsp;</p>

<p>For example, if you want to mount the EFS in the <strong><em>deployments</em></strong> directory of your ssh user’s home directory (ubuntu in case of Ununtu OS), then run the following commands.&nbsp;</p>

<div class="code"><code>$ mkdir deployments</code></div>

<p>I would recommend copying the mount command based on where your EC2 instance is launched. For example, if your EC2 instance is hosted on <strong><em>2a</em></strong> availability zone of the VPC then select <strong><em>2a</em></strong> from the availability zone drop-down and copy the mount command.&nbsp;</p>

<div class="code"><code>$ sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport &lt;replace with your IP&gt;:/ deployments</code></div>

<p>&nbsp;</p>

<h3>Configure security groups</h3>

<p>In order to allow the communication between EC2 instances and the EFS volume, we need to&nbsp; configure the security group rules on both EC2 instances and the EFS.</p>

<p>On the selected EFS, click on the <strong><em>Network</em></strong> tab at the bottom and click on the Manage button. Now, copy the security group ID and open the EC2 management console and click on the <strong><em>Security Group</em></strong> link under <strong><em>Network and Security</em></strong> section. Search for the security group associated with EFS and edit its inbound rule.</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:800px">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Source</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>NFS</td>
			<td>TCP</td>
			<td>2049</td>
			<td>Custom</td>
			<td>&lt;Either select the security group associated with EC2 instance or add private IP address of EC2 instance&gt;</td>
		</tr>
	</tbody>
</table>

<p>If you prefer to add the IP address of EC2 instance on the source field then you need to add the IP address of each EC2 instance on the inbound rule of EFS security group.</p>

<p>Similarly on the security groups associated with EC2 instances, add the following outbound rule.</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:800px">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Destination</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>NFS</td>
			<td>TCP</td>
			<td>2049</td>
			<td>Custom</td>
			<td>&lt;select the security group associated with EFS&gt;</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<h3>Persistent mounting on reboots</h3>

<p>The mount command that you issued earlier is not persistent on EC2 instance reboot. Therefore, you need to add the mount command on /etc/fstab file in order to make it persistent. One important thing to note here is that since we’ve used NFS client for mounting in CLI therefore we need to use the same NFS client in /etc/fstab as well.</p>

<p>Open the /etc/fstab file on each of the EC2 instance where you’ve mounted the EFS and add the following command at the end of file:</p>

<div class="code"><code>&lt;ip_address used during mounting&gt;:/ &lt;/path/to/mount/dir&gt; nfs4 defaults,_netdev 0 0</code></div>

<p>&nbsp;</p>

<h3>Wrapping up</h3>

<p>In this last part of the four part series, we’ve configured the elastic file system on the EC2 instances behind the load balancer. At first, we created the elastic file system on the VPC that was created in the <a class="anchor" href="https://abhishekejam.com/articles/how-setup-load-balancer-elastic-file-system-efs-aws-part-2/" style="text-decoration:none" target="_blank">second article</a>. Similarly, we installed the NFS client on the EC2 instances and mounted the EFS on them. Moreover, we also configured the security groups to facilitate the communication between EFS and EC2 instances and lastly added the mount command on /etc/fstab file for persistent reboots.<br>
I hope these articles were helpful and added some value to your devops skills stack.<br>
If you’ve any questions, get in touch with me.<br>
Thanks and Happy coding!</p>

<p>&nbsp;</p>

<h4>References</h4>

<p><a class="anchor" href="https://docs.aws.amazon.com/efs/latest/ug/mounting-fs-old.html#mounting-fs-install-nfsclient" target="_blank">https://docs.aws.amazon.com/efs/latest/ug/mounting-fs-old.html#mounting-fs-install-nfsclient</a><br>
<a class="anchor" href="https://stackoverflow.com/questions/52558062/auto-mounting-efs-on-ec2-instance" target="_blank">https://stackoverflow.com/questions/52558062/auto-mounting-efs-on-ec2-instance</a><br>
<a class="anchor" href="https://levelup.gitconnected.com/mount-nfs-on-aws-ec2-using-elastic-file-system-efs-57282d3c27eb" target="_blank">https://docs.aws.amazon.com/efs/latest/ug/troubleshooting-efs-mounting.html</a><br>
<a class="anchor" href="https://docs.aws.amazon.com/efs/latest/ug/troubleshooting-efs-mounting.html" target="_blank">https://docs.aws.amazon.com/efs/latest/ug/troubleshooting-efs-mounting.html</a></p>
        </div>
    </div>
</section>
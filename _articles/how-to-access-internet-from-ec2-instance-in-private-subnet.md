---
layout: default
title: How to access internet from EC2 instance in private subnet?
date: 2022-09-23
tags: ["AWS", ", Natgateway", ", Private subnet"]
---
<section class="article-detail-block dark-bg mtb-150">
    <div class="container content-wrapper">
        
            <h1>{{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
			<!-- start_excerpt -->
            <p>So you've launched EC2 instance in private subnet to disable public access for security reasons. However, you realized later that you actually need internet access on your EC2 instance to install packages and run software updates. If you have encountered this issue then go nowhere, you're in the right place.</p>
			<!--end_excerpt-->

<p>Allowing internet access to&nbsp;instances in private subnet is done via Network Address Translation (NAT) which is a techinque that allows the instances without public IP to send outbound traffic to the internet. Therefore, it is required to create a NAT gateway on the public subnet as only resouces on public subnet can access the internet directly.</p>

<p>The following steps can be followed to allow internet access to the EC2 instances in private subnet:</p>

<ol>
	<li>Create NAT gateway in public subnet and associate an elastic IP</li>
	<li>Add routing via NAT gateway on private subnet routing table</li>
	<li>Configure security group for instance on private subnet (optional)</li>
</ol>

<p>This article assumes that you've created a VPC with a public and private subnet. In addition, it is also assumed that one EC2 instance&nbsp;in each private&nbsp;and&nbsp;public subnet has also been launched.</p>

<p>&nbsp;</p>

<h3>Create NAT gateway in public subnet and associate an elastic IP</h3>

<p>The first step is to create NAT gateway on the public subnet.</p>

<p><code>1. Search for "VPC" on the search bar of AWS console, and click on the VPC link.</code><br>
<code>2. On the left sidebar, click on <em><strong>NAT gateway</strong></em> within <em><strong>Virtual private cloud&nbsp;</strong></em>section.</code><br>
<code>3. Click on <strong><em>Create NAT Gateway </em></strong>link on the top right corner.&nbsp;</code><br>
<code>4. Assign an appropriate name,&nbsp;select your public subnet, select public availability type&nbsp;and click on <strong><em>Allocate Elastic IP</em></strong> link.</code><br>
<code>5. Finally, click on create NAT gateway link</code></p>

<p>If you encounter an issue with error&nbsp;<strong><em>The maximum number of addresses has been reached&nbsp;</em></strong>then you need to release the IP address</p>

<h3>&nbsp;</h3>

<h3>Add routing via NAT gateway on private subnet routing table</h3>

<p>The next step is to add an entry of NAT gateway on the private subnet's routing table.</p>

<p><code>1. Go to VPC dashboard on AWS console and click on subnets</code><br>
<code>2. Find your private subnet and click on it's routing table (Entry under Route table column)</code><br>
<code>3. Under Routes section tab, click on&nbsp;<em><strong>Edit routes </strong></em>button</code><br>
<code>4. Click on <em><strong>Add route</strong></em> button and enter&nbsp;<strong><em>0.0.0.0/0&nbsp;</em></strong>as destination and recently created <strong><em>NAT gateway</em></strong> as Target</code><br>
<code>5. Save the changes</code></p>

<h3>&nbsp;</h3>

<h3>Configure security groups and network ACLs (optional)</h3>

<p>Most of the time, the security groups on EC2 instances and the&nbsp;access control lists on subnets shouldn't be an issue unless&nbsp;they're strictly configured. Hence, this&nbsp;is an optional step.</p>

<p>If you have configured strict security groups and network ACLs policy then you need to allow the following inbound and outbound rules.</p>

<h4>Security groups on EC2 instance on private subnet</h4>

<h5>Inbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Source</td>
		</tr>
		<tr>
			<td>SSH</td>
			<td>TCP</td>
			<td>22</td>
			<td>0.0.0.0/0</td>
		</tr>
	</tbody>
</table>

<h5>&nbsp;</h5>

<h5>Outbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Destination</td>
		</tr>
		<tr>
			<td>HTTP</td>
			<td>TCP</td>
			<td>80</td>
			<td>0.0.0.0/0</td>
		</tr>
		<tr>
			<td>HTTPS</td>
			<td>TCP</td>
			<td>443</td>
			<td>0.0.0.0/0</td>
		</tr>
	</tbody>
</table>

<h4>&nbsp;</h4>

<h4>Security groups on EC2 instance on public&nbsp;subnet</h4>

<h5>Inbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Source</td>
		</tr>
		<tr>
			<td>SSH</td>
			<td>TCP</td>
			<td>22</td>
			<td>0.0.0.0/0</td>
		</tr>
	</tbody>
</table>

<h5>&nbsp;</h5>

<h5>Outbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port</td>
			<td>Destination</td>
		</tr>
		<tr>
			<td>SSH</td>
			<td>TCP</td>
			<td>22</td>
			<td>0.0.0.0/0</td>
		</tr>
	</tbody>
</table>

<h4>&nbsp;</h4>

<h4>Network ACLs on private subnet and&nbsp;public subnet</h4>

<h5>Inbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>#Rule</td>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port range</td>
			<td>Source</td>
			<td>Allow/Deny</td>
		</tr>
		<tr>
			<td>*</td>
			<td>All traffic</td>
			<td>All</td>
			<td>All</td>
			<td>0.0.0.0/0</td>
			<td>Allow</td>
		</tr>
		<tr>
			<td>*</td>
			<td>All traffic</td>
			<td>All</td>
			<td>All</td>
			<td>0.0.0.0/0</td>
			<td>Deny</td>
		</tr>
	</tbody>
</table>

<h5>&nbsp;</h5>

<h5>Outbound rules</h5>

<table border="1" cellpadding="1" cellspacing="1">
	<tbody>
		<tr>
			<td>#Rule</td>
			<td>Type</td>
			<td>Protocol</td>
			<td>Port range</td>
			<td>Dest</td>
			<td>Allow/Deny</td>
		</tr>
		<tr>
			<td>*</td>
			<td>All traffic</td>
			<td>All</td>
			<td>All</td>
			<td>0.0.0.0/0</td>
			<td>Allow</td>
		</tr>
		<tr>
			<td>*</td>
			<td>All traffic</td>
			<td>All</td>
			<td>All</td>
			<td>0.0.0.0/0</td>
			<td>Deny</td>
		</tr>
	</tbody>
</table>

<h3>&nbsp;</h3>

<p><em>Disclaimer: The above network ACLs is less restrictive. If you want to create more&nbsp;restrictive ACLs depending on your needs then please refer&nbsp;to <a class="anchor" href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html#nacl-rules-scenario-2" target="_blank">this AWS link</a>.</em></p>

<h3>&nbsp;</h3>

<h3>Testing internet access</h3>

<p><code>1. SSH into your private instance via bastion host (instance on public subnet)</code><br>
<code>2. Type curl google.com</code></p>

<p>You should see following output on the console:</p>

<p><img alt="" src="/media/uploads/2022/09/18/testing-connectivity.png"></p>

<p>&nbsp;</p>

<h3>Wrapping up</h3>

<p>Allowing outbound internet access to&nbsp;the EC2 instances on private subnets can be easily done via NAT gateway which must be created on the public subnet. In addition, you need to create an entry on the routing table of the private subnet via NAT gateway. Lastly, you may need to update&nbsp;security groups and network ACLs depending on your network configuration.&nbsp;</p>

<h3>&nbsp;</h3>

<h3>Rererences</h3>

<p><a class="anchor" href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html" target="_blank">https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html</a></p>

<p>&nbsp;</p>

<h3>&nbsp;</h3>
    </div>
</section>
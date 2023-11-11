---
layout: default
title: How to setup load balancer with Elastic file system (EFS) in AWS? Part 3
date: 2022-05-14
tags: ["Cloud computing", ", Cloud services", ", AWS", ", Load balancing"]
---
<section class="article-detail-block dark-bg mtb-150">
    <div class="container content-wrapper">
            <h1>{{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
			
            <p>Hello everyone, If you’re here then I hope that you’ve been following the last two articles on configuring an elastic load balancer with EFS. As a prerequisite, we've configured the VPC and subnets in the <a class="anchor" href="https://abhishekejam.com/articles/how-setup-load-balancer-elastic-file-system-efs-aws-part-2/">last article</a>. I will describe how to configure an application load balancer in this article.</p>
			

<p>Before jumping in, let's briefly overview the components of the load balancer. According to <a class="anchor" href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html#application-load-balancer-components">AWS docs</a>, a load balancer has two main components, viz. a <strong>listener and target groups</strong>.&nbsp;</p>
<!-- start_excerpt -->
<p>A listener watches for incoming requests from the clients and forwards it to the target groups. For example, you can configure a listener to check for incoming requests from HTTPS protocol on port 443 and forward it to the multiple target groups.</p>
<!--end_excerpt-->
<p>Target groups consist of a set of resources (EC2 instances, lambda function or an application load balancer itself) which serves the forwarded requests from the load balancer based on the protocol and port configured. In our configuration, the target group consists of EC2 instances.</p>

<p>The following steps can be followed to configure an application load balancer:&nbsp;</p>

<ol>
	<li style="list-style-type:decimal">
	<p>Launch EC2 instances (web servers)</p>
	</li>
	<li style="list-style-type:decimal">
	<p>Create target group and register targets</p>
	</li>
	<li style="list-style-type:decimal">
	<p>Create an application load balancer and configure listeners</p>
	</li>
</ol>

<h3>Launch EC2 instances</h3>

<p>The first step is to launch two EC2 instances in the private subnets of the VPC that we’ve created in the last article. As these EC2 instances don’t need to be accessed from the internet, you can launch them on the private subnet.&nbsp;The steps to launch an instance is simple and is clearly documented on the <a class="anchor" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-instance-wizard.html" style="text-decoration:none" target="_blank">aws documentation</a>. It would be redundant to list down all of the steps hence I’ll only point out the step that is specific to our configuration.&nbsp;</p>

<p>In the <strong>Network settings</strong> section of the EC2 launching wizard, select the VPC and private subnets (one for each EC2 instance) configured in the last article. The rest of the configuration can be adjusted based on your requirements.&nbsp;</p>

<p>The EC2 instances in the private subnets cannot be connected from the internet gateway therefore, you need to set up another EC2 instance in the public subnet as a <a class="anchor" href="https://en.wikipedia.org/wiki/Bastion_host" target="_blank">Bastion host</a>. You can then SSH into the Bastion host using the private key file (generated while launching the instance) and connect to the EC2 instances in the private subnets to configure the web server and deploy your code. The process is clearly demonstrated on <a class="anchor" href="https://www.youtube.com/watch?v=rn9kAXz6qxA" target="_blank">this</a> Youtube video.</p>

<h3>Create target groups and register targets</h3>

<p>The steps to configure the target groups can be reached by clicking on the <em>Target groups</em> link under the <em>Load balancing</em> section of the EC2 dashboard. Then, click on the <em>Create target</em> group button.&nbsp;</p>

<p>The steps below can be followed to configure target groups for the load balancer.</p>

<p>Specify group details on the first step:&nbsp;</p>

<div class="code"><code>1. Choose Instances as target type</code><br>
<code>2. Assign a meaningful name to the target group</code><br>
<code>3. Select HTTP and 80 as protocol and port number</code><br>
<code>4. Select the VPC created on the part 2</code></div>

<p>Register targets on the second step:</p>

<div class="code"><code>1. Select the first EC2 instances from the list of available instance</code><br>
<code>2. Click on <em>Include a pending below</em> button</code><br>
<code>3. Click create target group button</code></div>

<p>The same step as above can be followed to configure the second target group. Make sure to select the second EC2 instances on the second step.</p>

<p>You might have noticed that we’ve selected the HTTP protocol between the load balancer and the target groups as such configuration provides best performance since they are in the same local network.</p>

<h3>Create an application load balancer and configure listeners</h3>

<p>In the EC2 dashboard, click on the <em>Load balancers</em> link under the Load balancing section. It’ll take you to the load balancer dashboard. Click on the <em>Create Load Balancer</em> button and select application load balancer for the load balancer types.</p>

<p>The steps below can be followed to configure an application load balancer.</p>

<p>In the <em>Basic configuration</em> section:</p>

<div class="code"><code>1. Input load balancer name</code><br>
<code>2. The default options: internet-facing and IPV4 should work for the Scheme and IP address types.</code></div>

<p><img alt="" src="/media/uploads/2022/05/14/load-balancer-basic-configuration.png"></p>

<p>In the<em> Network mapping</em> section:</p>

<div class="code"><code>1. For VPC, select the one created in the last article.</code><br>
<code>2. For Mappings, tick the check mark on the two availability zones and select the public subnet on each of them.</code></div>

<p><img alt="" src="/media/uploads/2022/05/14/network-mapping-elb.png"></p>

<p>In the <em>Security group</em> section, create a security group with an inbound rule having port 80, 443 and 22 open. Or it can be adjusted based on your requirements.</p>

<p>For <em>Listeners and routing</em> section:</p>

<div class="code"><code>1. Select protocol as Https and forward the request to one of the target groups created in the previous section.</code></div>

<p>When HTTPS protocol is selected, you need to configure the<em> Secure listener settings</em> to deploy the SSL certificate on the load balancer. Also, AWS doesn’t let you configure multiple target groups for the same protocol (HTTPS or HTTP) while creating a load balancer. However, you can add them after the load balancer is created (described below).&nbsp;</p>

<p>Finally, you can click on the <em>Create load balancer</em> button at the bottom right corner of the dashboard.</p>

<h3>Additional configuration</h3>

<h4>Add target groups&nbsp;on the Load balancer</h4>

<p>In order to add additional target groups on the load balancer, you can revisit the Load balancing dashboard and click on the recently created load balancer. A configuration section as screenshot below&nbsp;will appear at the bottom of the page.</p>

<p><img alt="" src="/media/uploads/2022/05/14/add-additioinal-target-group-elb.png"></p>

<p>You can then click on the <em>Listeners</em> tab and click on the <em>HTTPS : 433</em> checkbox. Finally, click on the <em>Edit</em> button.</p>

<p>You can add the second target group&nbsp;and save the changes.<br>
<img alt="" src="/media/uploads/2022/05/14/add-target-group-elb.png"></p>

<h4>Redirect all Http traffic to Https</h4>

<p>Load balancer makes it easy to redirect all traffic on Http to Https meaning that when users type <a class="anchor" href="javascript:void(0)">http://yourcoolwebsite.com</a> then it will be redirected to <a class="anchor" href="javascript:void(0)">https://yourcoolwebsite.com</a>. Cool, right? It simply requires adding another listener by clicking on the <em>Add listener</em> button from the <em>Load balancing</em> dashboard (similar to adding target group as above). You can select the configuration as below and make sure to save changes.</p>

<p><img alt="" src="/media/uploads/2022/05/14/redirect-http-to-https-load-balancer.png"></p>

<p>&nbsp;</p>

<p>Wrapping up</p>

<p>To summarize, an application load balancer can be configured by launching at least two EC2 instances in the private subnets and one bastian host in the public subnet. Subsequently, the target group needs to be created by configuring protocols and registering the EC2 instances as targets. Lastly, the application load balancer can be created by launching it in the public subnets and configuring listeners.</p>

<p>Feel free to <a class="anchor" href="mailto:ejam.abhishek@gmail.com">get in touch</a> with me if you've any questions.</p>

<h4>References</h4>

<p><a class="anchor" href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html" target="_blank">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html</a></p>

<p><a class="anchor" href="https://serverfault.com/questions/68753/does-each-server-behind-a-load-balancer-need-their-own-ssl-certificate" target="_blank">https://serverfault.com/questions/68753/does-each-server-behind-a-load-balancer-need-their-own-ssl-certificate</a></p>
    </div>
</section>
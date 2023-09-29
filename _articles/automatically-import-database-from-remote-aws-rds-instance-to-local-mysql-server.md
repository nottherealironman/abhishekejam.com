---
layout: default
title: Automatically import database from remote AWS RDS instance to local MySQL server
date: 2021-06-04
tags: ["Shell programming", ", Bash", ", Linux"]
---

<section class="article-detail-block dark-bg mtb-150">
    <div class="container grid grid-1">
        <div class="mi-content">
            <h1>{{page.title}}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
            <p class="desc mt-20">
            </p>
            <h4>
                Background
            </h4>
            <!-- start_excerpt -->
            <p>
                If you're a developer, then you might have come across times when you need to import the database from a remote
                server to your local machine or vice versa. Well, it is quite time consuming, isn't it? You need to SSH into the remote server, 
                dump the database, download it into your machine and finally import it. Personally, I try to automate
                the boring and repetitive tasks as much as possible. For the last few months, the monotonous job was bothering me so
            I decided to come up with a solution to do the job in a single command. </p>
            <!--end_excerpt-->
            <p>
                In the following article, I will walk you through the bash script that will automatically
                import the database from remote the server to your local machine (or you could do the other way around as well).
            </p>
            <h4 class="mt-40">
                Problem-solving approach
            </h4>
            <p>
                Usually, I prefer to break down the problem into multiple steps and solve it. So, here's the breakdown of the solution:
            </p>
            <ol>
                <li>SSH into remote server</li>
                <li>Dump MySQL database</li>
                <li>Download it into local machine</li>
                <li>Import into local MySQL server</li>
            </ol>
            <p>
                To get started, let's first create a bash script named <span class="itcs">dbimport</span> (feel free to use any name) and paste the following at the top.
            </p>
            <p class="code">
                <code>#!/bin/bash</code>
            </p>
            <p>
                For those who are not familiar with bash script, this statement is used to specify the path to the bash interpreter.
            </p>
            <h4 class="mt-40">
                Step 1: Write a command to SSH into remote server
            </h4>
            <p>
                Most of the AWS RDS instances are configured to be accessible only from a particular server for security reasons.
                Therefore, we need to SSH into the remote server (having access to RDS) at first.
            </p>
            <p>The following command will let us do so:</p>
            <div class="code">
                <code>#!/bin/bash</code> <br></br>
                <div class="active-code">
                    <code>ssh -i <span class="itcs">your_private_key</span> <span class="itcs">username</span>@<span class="itcs">hostname</span></code>
                </div>
            </div>
            <h4 class="mt-40">
                Step 2: Dump MySQL database on remote server
            </h4>
            <p>The next step is to connect to the AWS RDS instance (MySQL server) from the remote server and run a command to dump MySQL database.
            Since we are going to wrap everything in a bash script, we need to find a way to run commands on an interactive program (our remote server).
                In bash programming, <a class="anchor" href="https://tldp.org/LDP/abs/html/here-docs.html" target="_blank">Here document</a> exactly let us do so.
            </p>
            <p>
            The basic syntax of Here document is:
            </p>
            <p class="code">
                <code>
                    command {`<<`} delimiter <br></br> command1 <br></br>command2 <br></br>.. <br></br>delimiter
                </code>
            </p>
            <p>
                Now, the combined script to SSH into server and run command to connect to MySQL server and dump database can be written as below:
            </p>
            <div class="code">
                <code>#!/bin/bash</code><br></br>
                <code>ssh -i <span class="itcs">your_private_key</span> <span class="itcs">username</span>@<span class="itcs">hostname</span> /bin/bash {`<<`} EOF</code><br></br>
                <div class="active-code">
                    <code>mysqldump --user=<span class="itcs">your_remote_mysql_username</span> --password=<span class="itcs">your_remote_mysql_password</span> --host=<span class="itcs">your_remote_rds_hostname</span> <span class="itcs">database_name_on_server</span> {`>`} 
                    <span class="itcs"> databse_name.sql</span> --single-transaction --no-tablespaces</code><br></br>
                </div>
                <code>EOF</code>
            </div>
            <p>
            As you can see, I've used <code>--single-transaction</code> and <code>--no-tablespaces</code> options in the mysqldump command. 
            According to <a class="anchor" href="https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html" target="_blank">MySQL documentation</a>,  <code>--single-transaction</code> 
            option allows a consistent dump without locking the entire database in transactional tables such as InnoDB. Also, starting MySQL version 5.7, <code>--single-transaction</code> and <code>--no-tablespaces</code> options are required 
            if the database user doesn't have <code>LOCK TABLES</code> and <code>PROCESS</code> privileges respectively. 
            </p>
            <h4 class="mt-40">
                Step 3: Download the dumped database from remote server into local machine
            </h4>
            <p>
            The next step is to download the database from the remote server into local machine. <a class="anchor" href="https://www.ssh.com/academy/ssh/scp" target="_blank">SCP</a> is a handy program 
            which is based on the SSH protocol that allows to transfer file between two machines. 
            </p>
            <p>
                Now, the script after adding command to download the dumped MySQL database from the remote server looks as below:
            </p>
            <div class="code">
                <code>#!/bin/bash</code><br></br>
                <code>ssh -i <span class="itcs">your_private_key username@hostname</span> /bin/bash {`<<`} EOF</code><br></br>
                <code>mysqldump --user=<span class="itcs">your_remote_mysql_username</span> --password=<span class="itcs">your_remote_mysql_password</span> </code>
                <code>--host=<span class="itcs">your_remote_rds_hostname</span> <span class="itcs">database_name_on_server</span> {`>`} </code>
                <code><span class="itcs"> databse_name.sql</span> --single-transaction --no-tablespaces</code><br></br>
                <code>EOF</code><br></br>
                <div class="active-code">
                <code>scp -i <span class="itcs">your_private_key</span> <span class="itcs">username</span>@<span class="itcs">hostname:databse_name.sql local_path</span></code><br></br>
                </div>
            </div>
            <p>
            Depending on the size of your database, it might take from a few seconds to minutes to download the database from remote server to local machine. 
            </p>
            <h4 class="mt-40">
                Step 4: Import the database into local MySQL server 
            </h4>
            <p>
            Finally, the last step is to import the downloaded database into the local MySQL server. 
            We can do that by adding the <code>mysql</code> command at the end of the script as below.
            </p>
            <div class="code">
                <code>#!/bin/bash</code><br></br>
                <code>ssh -i <span class="itcs">your_private_key</span> <span class="itcs">username</span>@<span class="itcs">hostname</span> /bin/bash {`<<`} EOF</code><br></br>
                <code>mysqldump --user=<span class="itcs">your_remote_mysql_username</span> --password=<span class="itcs">your_remote_mysql_password</span> --host=<span class="itcs">your_remote_rds_hostname</span> <span class="itcs">database_name_on_server</span> {`>`} 
                <span class="itcs"> databse_name.sql</span> --single-transaction --no-tablespaces</code><br></br>
                <code>EOF</code><br></br>
                <code>scp -i <span class="itcs">your_private_key</span> <span class="itcs">username</span>@<span class="itcs">hostname:databse_name.sql local_path</span></code><br></br>
                <div class="active-code">
                    <code>mysql --user=<span class="itcs">your_local_mysql_username</span> --password=<span class="itcs">your_local_mysql_password</span> --host=localhost <span class="itcs">your_local_database</span> {`<`} path/to/database.sql </code>
                </div>
            </div>

            <h4 class="mt-40">
                How to execute the script?
            </h4>
            <p>
                First of all, we need to make the bash script executable by running the command <code>chmod u+x filename</code>. 
                In our case (filename is <code>dbimport</code>), the following command will do the job:
            </p>
            <p class="code">
                <code>chmod u+x dbimport</code>
            </p>
            <p>
                <code>chmod</code> is used for setting permissions in <a href="https://en.wikipedia.org/wiki/Unix-like" target="_blank" class="anchor">Unix-like</a> operating systems and the above command will set execute permission to the owner of the file.  
                If you have created the file as <code>superuser</code>, then you have to prepend the above command with <code>sudo</code>.
            </p>
            <p>
                Finally, the file can be executed by running below command:
            </p>
            <p class="code">
                <code>./dbimport</code>
            </p>
            <h4 class="mt-40">
                Security concerns
            </h4>
            <p>
                If you have followed till now, you might have noticed the warning in your shell after running the above script:
            </p>
            <p class="code">
                <code>
                [Warning] Using a password on the command line interface can be insecure.
                </code>
            </p>
            <p>The warning is the result of passing password as command line arguments for <code>mysqldump</code> and <code>mysql</code> commands.
             In Linux, the process command line arguments are publicly available and any other users (or program) could sniff them when the program is running.
             Though, it could not be a potential vulnerability in some cases, however, it is good to follow the best practices as much as possible. 
             </p>
             <p>
             You can follow <a class="anchor" href="https://unix.stackexchange.com/questions/205180/how-to-pass-password-to-mysql-command-line" target="_blank">this StackOverflow QA </a> 
             which has a good coverage on how to securely pass password to mysql command line. 
             </p>
            <h4 class="mt-40">
            Wrapping up
            </h4>
            <p>
            The process of dumping a database from the remote server and importing in your local machine can be a tedious task.
            And, shell scripts really shine in jobs like this. If you need to import the database from a remote server to your local machine quite too often 
            then the above script will save you a lot of time. 
            </p>
            <p>
            For the sake of brevity, I have not added any error handling on the script
            however, you can feel free to do so. If you tweak a bit and change the order of the above script, then it can also be used to upload a database to a remote MySQL server.
            </p>
            <p>
                You can find the above script in my <a class="anchor" href="https://github.com/nottherealironman/dbimport" target="_blank">GitHub</a> repository as well.
            </p>
            <p>
            If you have any questions, feel free to <a class="anchor" href="mailto:ejam.abhishek@gmail.com">get in touch</a> with me. 
            </p>

            <p class="keywords">Shell programming, Bash, Linux</p>
        </div>
    </div>
</section>
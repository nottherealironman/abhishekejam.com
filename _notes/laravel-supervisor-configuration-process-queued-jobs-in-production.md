---
layout: blog
title: Laravel supervisor configuration - process queued jobs in production
date: 2023-10-14
tags: ["Server-configs", ", Supervisor", ", Laravel"]
---

# {{page.title}}
{{ page.date | date: "%b %-d, %Y" }}

<!-- start_excerpt -->
In software engineering, a queue offers an efficient solution for handling time-intensive tasks, such as processing file uploads, invoking third-party APIs, and bulk database uploads. Queuing these tasks not only enhances user experience but also promotes cleaner code. 
<!--end_excerpt-->

Laravel includes built-in support for queues and requires the use of the `php artisan queue:work` command for processing queued jobs. However, running `queue:work` command in a production environment can be unreliable, as some jobs may fail. To address this issue, <a href="http://supervisord.org/" target="_blank">Supervisor</a>, a process monitoring tool for Unix-like environments (with potential workarounds for <a href="https://stackoverflow.com/questions/7629813/is-there-windows-analog-to-supervisord" target="_blank">Windows</a>), becomes crucial. With Supervisor, you can reliably run the `queue:work` process in production, even between program exits or system restarts.

This article provides a brief explanation of how to process queues in Laravel using Supervisor.

<br>

#### Prerequisite
- Linux environment
- Laravel project with queue already configured

<br>

#### Install Supervisor
`sudo apt install supervisor`
   
After the installation is completed, supervisor runs automatically. 
You can verify it by running `sudo systemctl status supervisor` command which returns output like below:

![Markdown status](/assets/images/supervisor-status.png)

#### Configure queue worker in supervisor
Supervisor configuration files are located at `/etc/supervisor/conf.d` directory. You can `cd` into the directory and create `queue-worker.conf` file. A typical supervisor program that monitors laravel queue looks like below:

<div class="code">
 <code>[program:queue-worker]</code><br>
 <code>process_name=%(program_name)s_%(process_num)02d</code><br>
 <code>command=php /absolute-path/to/project/artisan queue:work --sleep=3 --tries=3 --max-time=3600</code><br>
 <code>autostart=true</code><br>
 <code>autorestart=true</code><br>
 <code>stopasgroup=true</code><br>
 <code>killasgroup=true</code><br>
 <code>user=ubuntu</code><br>
 <code>numprocs=2</code><br>
 <code>redirect_stderr=true</code><br>
 <code>stdout_logfile=/path/to/project/storage/logs/supervisord.log</code><br>
 <code>stopwaitsecs=600</code>
</div>

In the above configuration, supervisor will run 2 `queue:work` processes, watches and auto-restart them when they fail. According to [Laravel docs](https://laravel.com/docs/10.x/queues#configuring-supervisor), the value of `stopwaitsecs` should be greater than the time 
taken by the longest running job. Lastly, `command` and `user` variables depend on your server configuration.
#### Run supervisor
After a new program is added, we need to inform supervisor to look for any new or updated program by running the following commands:

`sudo supervisorctl reread`<br>
`sudo supervisorctl updated`

Finally start the queue worker by running below command:

`sudo supervisorctl start queue-worker.conf`

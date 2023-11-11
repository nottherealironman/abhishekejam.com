---
layout: default
title: Writing clean code in Javascript using Object Literal
date: 2021-07-03
tags: ["Javascript", ", Clean code", ", Design pattern"]
---

<section class="article-detail-block dark-bg mtb-150">
    <div class="container content-wrapper">
        
            <h1>{{ page.title }}</h1>
            <p class="time-n-date">5 min read. {{ page.date | date: "%b %-d, %Y" }}</p>
            <h4>Background</h4>
<!-- start_excerpt -->
<p>Code in Javascript (or any languages) can get really messy when you do not have standard conventions for namespace, naming variables and so on. If you structure your JavaScript code the old school way, i.e, splitting the script into multiple files and defining the methods and variables in global scope then you probably have ran into issues as below:</p>
<!--end_excerpt-->
<ul>
	<li><a href="https://en.wikipedia.org/wiki/Name_collision" target="_blank">Name collisions</a>&nbsp;due to the lack of namespace</li>
	<li>Difficult to organize code as project grows</li>
	<li>Poorer code readability and tough time to encounter bugs</li>
</ul>

<p>To be honest, I have struggled&nbsp;in the past when I did not have proper namespace in the code. There are various design patterns such as module pattern, revealing module pattern, object literals and so on that solves the issue.</p>

<p>In this first part of writing clean code in JavaScript, I will walk you through the basic concept and usage of object literals on organizing code and creating namespace in JavaScript.</p>

<p>&nbsp;</p>

<h4>Object Literal Notation</h4>

<p>In JavaScript, the simplest way to create an object is by using a set of curly braces&nbsp;<code>{}</code>, which is known as object literal notation. The notation uses comma-separated key-value pairs.</p>

<div class="code"><code>var app = {</code><br>
<code>&nbsp;&nbsp;name: "Batman",</code><br>
<code>&nbsp;&nbsp;alter_ego: "Bruce Wayne"</code><br>
<code>}</code></div>

<p>Apart from assigning primitive values, you can also assign function to them as below:</p>

<div class="code"><code>var app = {</code><br>
<code>&nbsp;&nbsp;name: "Batman",</code><br>
<code>&nbsp;&nbsp;alter_ego: "Bruce Wayne"</code>

<p><code>&nbsp;&nbsp;greeting: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;console.log("I'm "+ this.name)</code><br>
<code>&nbsp;&nbsp;}</code></p>

<p><code>}</code></p>
</div>

<p><code>this</code>&nbsp;operator is used to access the local variables and methods within the object literal.</p>

<p>You can call the method in object literals from outside as below:</p>

<div class="code"><code>app.greeting(); //This will print: I'm Batman</code></div>

<p>Likewise, new member can be assigned outside of an object as below:</p>

<div class="code"><code>app.comics = "DC";</code></div>

<p>The beauty of object literal is that we can go to any number of deep-nesting.</p>

<div class="code"><code>app.comics.city = "Gotham";</code></div>

<p>But do keep in mind that we need to define the higher-level parent before deeper-nested children.</p>

<p>The below assignment will throw a&nbsp;<code>TypeError</code>&nbsp;since we're trying to assign a new member to&nbsp;<code>app.vehicle</code>&nbsp;without defining it first.</p>

<p><code>app.vehicle.name = "Batmobile";</code></p>

<p>We can now extend the above concept to create namespace and encapsulate the code on our project.</p>

<p>&nbsp;</p>

<h4>Code organization using Object literals</h4>

<p>I will demonstrate the implementation of object literals in organizing code by building a simple todo app that lets users to:</p>

<ul>
	<li><code>add task to the incomplete list</code></li>
	<li><code>move them to completed list</code></li>
	<li><code>and finally delete from completed list</code></li>
</ul>

<p>It is a good practice to split the code into smaller files based on their specific purpose. As the todo app has three main features, we can thus split the script into three files and give them meaningful names.</p>

<p>The structure of the project is depicted as below:</p>

<div class="code">
<ul>
	<li>-&nbsp;todo_app/</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;src/</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;css/</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;js/</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;todo/</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;app.todo.js</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;app.todo.add.js</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;app.todo.completed.js</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;app.todo.incomplete.js</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;app.js</li>
	<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;index.html</li>
</ul>
</div>

<p><code>app.js</code> - This file is the entry point of the project. We will define our root object literal in this file which will be expanded by other files within the project. <!-- It consists of a method to invoke/initialize the code on other sub-modules. --></p>

<p><code>app.todo.js</code> - This file initializes other modules within <code>todo</code> namespace.</p>

<p><code>app.todo.add.js</code> - This file deals with code that adds tasks to the incomplete list.</p>

<p><code>app.todo.incomplete.js</code> - This file is responsible for moving tasks from incomplete to completed list.</p>

<p><code>app.todo.complete.js</code> - Lastly, we'll write the code to remove tasks from the completed list on this file.</p>
<!-- <p>As you can see, I've followed hierarchial structure for filenames. It is a good way to enforce namespace
                and organize code in a project.
                
            </p> -->

<p>Let's take a look on our <code>app.js</code></p>

<div class="code"><code>var app = {</code><br>
<code>&nbsp;&nbsp;init: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.init();</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;//Initialize sub-modules here</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<!-- <code>&nbsp;&nbsp;bind_events: function(){</code><br>
                    <code>&nbsp;&nbsp;...</code><br>
                    <code>&nbsp;&nbsp;}, </code><br> --> <code>}</code></div>

<p>The <code>init</code> function inside the app is the entry point of the application (kind of like the main function in Java). Initialization of the methods on other modules can be done here. This is a good place to bind event listeners within the project.</p>

<p>Now, let's have a look on our <code>app.todo.js</code></p>

<div class="code"><code>app.todo = {</code><br>
<code>&nbsp;&nbsp;init: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.add.init();</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<code>}</code></div>

<p>You might have noticed that I've used <code>init</code> method again in the above code. Since it is in a different namespace there is no chance of name collision. The above code simply initializes the method on <code>app.todo.add.js.</code></p>

<p>Now, let's have a look on our <code>app.todo.add.js</code></p>

<div class="code"><code>app.todo.add = {</code><br>
<code>&nbsp;&nbsp;task_name: document.getElementById('task_name'),</code><br>
<code>&nbsp;&nbsp;btn_add_task: document.getElementById('btn_add_task'),</code><br>
<br>
<code>&nbsp;&nbsp;init: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;...</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<code>}</code></div>

<p><!-- <code>app.todo.add.js</code> file consists of functionality to add task to the incomplete list. -->As you can see, we are deep nesting the object literal created in <code>app.todo.js</code> to namespace the code in this file. <!--  You will notice in a while
                that all files follow the same convention. --> <!-- To describe the code, <code>task_name</code> and <code>btn_add_task</code> are the DOM selectors of the
                <code>input box</code> and
                <code>add task button</code> respectively. --></p>

<p>Now, let's write an event handler and methods that add tasks to the incomplete list.</p>

<div class="code"><code>app.todo.add = {</code><br>
<code>&nbsp;&nbsp;task_name: document.getElementById('task_name'),</code><br>
<code>&nbsp;&nbsp;btn_add_task: document.getElementById('btn_add_task'),</code><br>
<br>
<code>&nbsp;&nbsp;init: function(){</code>

<div class="active-code"><code>&nbsp;&nbsp;&nbsp;&nbsp;this.bind_events();</code></div>
<code>&nbsp;&nbsp;}, </code><br>
&nbsp;
<div class="active-code"><code>&nbsp;&nbsp;bind_events: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;this.btn_add_task.addEventListener('click', &nbsp;&nbsp;&nbsp;&nbsp;this.add_task.bind(this));</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<br>
<code>&nbsp;&nbsp;add_task: function () {</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var task = this.create_task(this.task_name.value);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.incomplete.wrapper.appendChild(task);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.incomplete.bind_events(task);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;this.task_name.value = "";</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<br>
<code>&nbsp;&nbsp;create_task: function (task_name) {</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var task = document.createElement('div'),</code><br>
<!-- <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checkbox = document.createElement("input"),</code><br> --> <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label = document.createElement("label"),</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;button = document.createElement("button");</code><br>
<br>
<!-- <code>&nbsp;&nbsp;&nbsp;&nbsp;checkbox.type = 'checkbox';</code><br> --> <code>&nbsp;&nbsp;&nbsp;&nbsp;label.innerHTML = task_name;</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;button.innerHTML = 'Complete';</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;button.classList.add('complete');</code><br>
<br>
<!-- <code>&nbsp;&nbsp;&nbsp;&nbsp;task.classList.add('task-wrapper');</code><br> --> <!-- <code>&nbsp;&nbsp;&nbsp;&nbsp;task.appendChild(checkbox);</code><br> --> <code>&nbsp;&nbsp;&nbsp;&nbsp;task.appendChild(label);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;task.appendChild(button);</code><br>
<br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;return task;</code><br>
<code>&nbsp;&nbsp;}, </code></div>
<code>}</code><br>
<!-- <code>NOTE: app.todo.incomplete namespace refers to the code in app.todo.incomplete.js file which deals with the tasks on incomplete list.</code> --></div>

<p>As you have noticed, the event handler for the <code>add task button</code> is registered and bound to <code>add_task</code> method. It is important to pass <code>this</code> parameter while binding since it allows us to reference the member variables and methods of the current object from the bound method (i.e. <code>add_task</code>). If we did not pass <code>this</code> parameter while binding, then <code>this</code> would refer to the <code>add_task button</code> events.</p>

<p>The first statement on <code>add_task</code> method invokes <code>create_task</code> method which creates a DOM element of an individual task by taking a user entered task as an argument.</p>

<p><!-- You can see the beauty of using object literal for organizing code on second statement of <code>add_task</code> method. -->The second statement <code>app.todo.incomplete.wrapper</code> refers to the variable in the external file (<code>app.todo.incomplete.js</code>) where the reference to the DOM element of incomplete todo list is stored. When a user clicks <code>add task button</code> after entering the task name, it will be appended to the incomplete list by using the in-built method <code>appendChild</code>.</p>

<p>Similarly, the third statement is used to bind <code>complete button</code> of a recently created task<!--  which moves the task from
                incomplete list to completed list -->.</p>

<p>Finally, the last statement clears the input box so that the user can add a new task.</p>

<p>Now, let's have a look on <code>app.todo.incomplete.js</code>:</p>

<div class="code"><code>app.todo.incomplete = {</code><br>
<code>&nbsp;&nbsp;wrapper: document.querySelector('.incomplete-list'),</code><br>
<br>
<code>&nbsp;&nbsp;bind_events: function(task){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var btn_complete = task.querySelector('.complete');</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;btn_complete.onclick = this.move_completed_task;</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<br>
<code>&nbsp;&nbsp;move_completed_task: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var current_task = this.parentNode;</code><br>
<br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var btn_complete = current_task.querySelector('.complete');</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;btn_complete.remove();</code><br>
<br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var btn_delete = document.createElement('button');</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;btn_delete.innerText = 'Delete';</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;btn_delete.classList.add('delete');</code><br>
<br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;current_task.appendChild(btn_delete);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.completed.wrapper.appendChild(current_task);</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;app.todo.completed.bind_events(current_task);</code><br>
<code>&nbsp;&nbsp;}</code><br>
<code>}</code></div>
<!-- <p>You might have noticed that we've used <code>bind_events</code> method on <code>app.todo.js</code> before
                and we're using it here again.
                Well, it's perfectly fine since we've namespaced our code inside object literal.</p> -->

<p>In the code above, <code>bind_events</code> method is used to bind the click event of <code>complete button</code> which allows users to move tasks to the completed list. If you remember then it was referenced from <code>app.todo.add.js</code> a while ago.</p>

<p>Similarly, we have removed the <code>complete button</code>, hooked <code>delete button</code> on the task and bind new event listener on the code that follows it.</p>

<p>Let's peek at the last file, <code>app.todo.complete.js</code></p>

<div class="code"><code>app.todo.completed = {</code><br>
<code>&nbsp;&nbsp;wrapper: document.querySelector('.completed-list'),</code><br>
<br>
<code>&nbsp;&nbsp;bind_events: function(task){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var btn_delete = item.querySelector('.delete');</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;btn_delete.onclick = this.delete_completed_task;</code><br>
<code>&nbsp;&nbsp;}, </code><br>
<br>
<code>&nbsp;&nbsp;delete_completed_task: function(){</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;var current_item = this.parentNode;</code><br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;current_item.remove();</code><br>
<code>&nbsp;&nbsp;}</code><br>
<code>}</code></div>

<p>In the above code, the click event of <code>delete task button</code> on the completed list is bound to <code>delete_completed_task</code> method inside <code>bind_events</code> method. The button will delete the task from DOM when the user clicks on it.</p>

<p>Finally, the <code>init</code> method of todo app needs to be called from HTML source file as below:</p>

<div class="code">app.init();</div>

<p>&nbsp;</p>

<h4>Wrapping up</h4>

<p>Object literal is undoubtedly a great tool to create namespaces in JavaScript. Apart from that, it also helps to organize code and create encapsulation in the project, which I hope I've clearly demonstrated in the above todo app. <!-- Writing clean and modular code in JavaScript can really be challenging when you're a beginner programmer.  --></p>

<p>You can find the source code of the above todo app in my <a class="anchor" href="https://github.com/nottherealironman/namespace-using-object-literal" target="_blank">GitHub</a> repository.</p>

<p>If you have any questions, feel free to <a class="anchor" href="mailto:ejam.abhishek@gmail.com">get in touch</a> with me.</p>
    </div>
</section>
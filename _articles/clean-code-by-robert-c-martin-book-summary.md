---
layout: blog
title: "Book summary : Clean Code by Robert C. Martin"
date: 2024-03-17
tags: ["book-summary", ", clean code", ", coding"]
---

# {{page.title}}
{{ page.date | date: "%b %-d, %Y" }}

<!-- start_excerpt -->
I recently finished reading Clean Code by Robert C Martin (uncle Bob), a renowned author. The book has hugely changed the way that I used to write code. After reading this book, I can say that my code is more readable and less repetitive and error prone. Every software developer who aspires to be better at their craft should read this book. 
<!-- end_excerpt -->
In this blog post, I will discuss some of the key concepts outlined by him on how to write <a href="https://www.goodreads.com/book/show/3735293-clean-code" target="_blank">Clean Code</a>.

<br> 
#### Meaningful names
The first step in writing clean code is to give meaningful or domain specific names to variables, methods, classes, files and directories. Having intention revealing names helps to enhance readability of the code.

#### Smaller functions and classes
The size of functions and classes should be kept small. They should do one thing and do it very well. Moreover, they should adhere to the <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle" target="_blank">Single Responsibility Principle (SRP)</a> which states that there should be only one reason to change them. If the size of a function or a class gets larger, then there are high chances that it is trying to do a lot of things.

#### Minimal comments
A clean code should have minimal comments. The reason being comments are not maintained the same way as a code so they could mislead. Therefore, programmers should try to express themselves more in the code rather than making it up by adding comments.  

#### No duplication
It is also known as the <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" target="_blank">DRY (Don’t Repeat Yourself) </a> principle. Code repetition is undoubtedly a huge obstacle to productivity and introduces opportunities for errors in software.

#### Error Handling
Things can go wrong, and when they do, error handling is a way to ensure that code does what it needs to do. Error handling not only makes the code aesthetically clean but also promotes the <a href="https://en.wikipedia.org/wiki/Separation_of_concerns" target="_blank">separation of concerns</a>.

#### Automated tests
Automated tests are an essential part of high quality code. Apart from helping developers to be confident in what they built, they promote writing smaller functions and create separation of concerns. Based on my personal experience, I can say that the more automated tests coverage I’ve, the more I can be confident in the changes I’ve made won’t break the existing features. An important point, as quoted by the author, is that “Test is just as important as production code” and should be maintained at the same level.

#### Refactoring
Refactoring is needed to refine the overall system as the project grows in scope. In the process, code is moved from one place to another, classes and methods are made smaller and possibly renamed to eliminate duplication, and to ensure expressiveness of the code.

#### Readability
Readability is an important aspect of clean code as it affects maintainability and extensibility of the code long after it has been authored. Readability of code can be enhanced by clarity, simplicity, and density of expression.

#### First make it work, then make it right
This is one of the principles which I often follow not only at work but also in my daily life. The author says that we need to try to make something workable first and then only optimize or clean it. This is because it can be daunting to try to make it right from the beginning.

<br>

The author points out that the majority of the cost of a software project is in long-term maintenance. So the clearer the code is, the less time will be spent on understanding it and as a result, minimizes the cost of maintenance. 

<br>

#### My 2 cents on Clean Code
From my own experience, I can say that maintaining a cluttered codebase is expensive because of the high technical debt. The changes which should take a few minutes could take hours if the code isn't clean and still developers cannot be confident that the changes they made won’t break the existing features. Oftentimes, I’ve seen companies start afresh rather than trying to save the sinking ship. Therefore, writing clean code is highly important for the long term maintenance, extensibility and scalability of a software project.  

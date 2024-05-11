---
layout: blog
title: "Does GitHub Copilot helps developers to write clean code?"
date: 2024-05-11
tags: ["ai-programming-assistant", ", clean code", ", coding"]
---

# {{page.title}}
{{ page.date | date: "%b %-d, %Y" }}

There is no doubt that <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a> accelerates a developer’s productivity by helping them to write code faster. GitHub claims that it makes<a href="https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" target="_blank"> writing code faster by 55%.</a> But does this speed come at the cost of clean and maintainable code?  

<!-- start_excerpt -->
A recent report from GitClear suggests otherwise. The report highlights that code churning has significantly increased by the usage of AI tools such as GitHub Copilot. It is common for an executive of an organization or developers to be wary whether the code produced by using these AI tools could add more tech debt in the software. 
<!-- end_excerpt -->
<br>
In this article, I’m going to explore whether GitHub Copilot assists developers in writing clean code. 
<br>

### Critical Insights from GitClear's Research
A recent <a href="https://gitclear-public.s3.us-west-2.amazonaws.com/Coding-on-Copilot-2024-Developer-Research.pdf" target="_blank">report</a> from GitClear suggests that the use of Github Copilot decreases the quality of code produced. The research was based on 153 million lines of code that were analyzed in 4 years, starting in 2020 from popular open source repos and their commercial customers. 
<br>

Following its release in late 2021, Copilot was largely adopted by developers, and the research found the following trends in the years 2022 and 2023:

<ul class="bp-articles">
    <li><b>Increase in copy/pasted and churned code</b>: The research found an 11.3% increase in the amount of code that was simply copied and pasted, and a 39.2% increase in code churning. These findings imply increase in maintenance burden and the possibility of less robust code being committed in repository.</li>
    <li><b>Decrease in moved code</b>: The study also revealed a 17.3% decrease in moved code within the codebase. This might indicate a decline in code reuse and refactoring practices.</li>
</ul>
 The above findings are often considered as indicators of code quality. According to GitClear, it could be correlated with the rise of AI tools like GitHub Copilot and its impact on especially less experienced or junior developers who might rely heavily on them to contribute faster. 
<br>

GitClear also provides projection of commit line operations for the year 2024 based on OpenAI's gpt-4-1106-preview Assistant on existing data and it is likely to follow the same trend which began in 2022.

![commit line operations based on Gitclear report](/assets/images/05-2024/ai-tools-code-stats.png)


These insights are concerning. As project grows, refactoring becomes crucial for code maintainability. In my own experience of using Copilot, code suggestions and completion features can create a strong urge to write more code rather than refactor and reuse existing ones. 

<br>

### Personal experience of using GitHub Copilot
I started using Copilot earlier this year, and it's definitely become a valuable tool in my development workflow. 

##### Increase in productvity
The code completion feature has been a huge time saver, especially for common tasks like variable assignments, writing conditional statements, logging output or writing repetitive statements like below. 

![Single line code suggestion by GithHub Copilot](/assets/images/05-2024/single-line-code-suggestion.png)
*Single line code suggestion*

Just by providing a brief description, Copilot can generate most of the code structure, allowing me to focus on more important aspects of coding. 
![Multi line code suggestion by GithHub Copilot](/assets/images/05-2024/multi-line-code-suggestion.png)
*Multi line code suggestion*

The chat window has also proven helpful. For example, when I was stuck on a bug introduced by the upgrade of paperjs, I used the chat window to debug potential causes and explore the options to fix it. Overall, the AI pair programmer has definitely augmented my productivity by eliminating the need to write boilerplate code and by providing assistance with problem-solving.

##### Limitations with Complex Code
While Copilot excelled at suggesting code for simpler functions, its suggestions became less reliable as the complexity of the algorithms or code increased. For example, when I was working on an algorithm to find the gemoetrical centroid of a concave polygon, Copilot's suggestion deviated from the intended solution which suggests that it is difficult for AI tools to know the intent of a programmer when provided limited input.
<br>

##### Challenges with Code Duplication
Another concern I found while using Copilot is that it has tendency towards repeating code instead of suggesting code reuse. For example, when I try to redefine a helper function to get intersection of array (let's call it `getIntersection`), Copilot simply repeated the existing code suggestion instead of informing that the function is already defined.
![Duplicate method suggested by GithHub Copilot](/assets/images/05-2024/duplicate-method-copilot.png)
*Duplicate method suggested by Copilot*

This action raises a red flag on code reusability and overall code quality. While the `/fix agent` command helps address this issue, it requires additional steps and might not be intuitive for all users. Additionally, I sometimes found Copilot's generated code to be verbose and bloated, even though it functionally worked. Unnecessary code complexity can hinder maintainability of the project in the long run unless refactored.
<br><br>

### Evaluating the impact on code quality

The findings by GitClear on the potential negative impact of AI tools on code quality is concerning. However, the report lacks clarity on whether the analyzed code was specifically written using Copilot or other AI tools. Additionally, the high code churn statistics might not solely reflect faulty code being committed. Faster refactoring process or change requests could also contribute to churn.

However, it's undeniable that Copilot's ease of use can encourage developers to write more code rather than reuse existing functionality. While Copilot can generate clean, readable code with error handling, it doesn't prioritize suggesting code reuse — adding new code often takes fewer keystrokes. Furthermore, Copilot currently lacks built-in refactoring features within the development workspace. A `/refactor` command similar to `/fix` would be a valuable addition to promote refactoring which is essential as the project grows in scope. 
<br>

Blindly accepting code suggestions, without thorough review, can lead to a decline in code quality. As a new developer myself, I recall instances of mindlessly copying code from Stack Overflow without taking time to properly understand it. Copilot's ease of use could potentially exacerbate this issue. New developers should be particularly aware of the importance of reviewing and understanding all code, even suggestions from AI tools. However, Copilot can still be a valuable tool for beginners by offering examples of code structures and functionalities, promoting faster learning when used thoughtfully.
<br><br>

### Strategies for maintaining code quality with Copilot

Despite potential drawbacks, Copilot can still be a valuable tool for maintaining code quality in several ways:

<ul class="bp-articles">
    <li><b>Enhancing Automated Testing</b>: <br>
    Copilot can significantly improve the process of writing unit tests. For example, while I was trying to write unit tests for a JavaScript function to find the intersection of two arrays, Copilot suggested the appropriate testing framework syntax and helped me write assertions for the intersection functionality. This not only saves time but also enhances code maintainability by ensuring critical functionalities are covered by tests.
    </li>
    <li><b>Debugging</b>: <br>
    Copilot can also assist in debugging code. This can involve suggesting potential code fixes or even recommending alternative solutions. Specialized Copilot `/fix` agent can also be used to proactively inspect code for potential bugs before they are deployed in production environment.
    </li>
</ul>

In addition to writing automated tests and debugging, you can also leverage Copilot's agents and variables to write maintainable code. For example, you can select a code snippet in the editor and type `recfactor #selection` in chat to ask Copilot to refactor selected code. Also, you can ask Copilot to format code to make it more readable. 
<br>
 

### Takeaways
So, does Copilot help you write clean code? It can definitely be a valuable tool in a developer's toolbox. Copilot excels at automating repetitive tasks and suggesting code structures, but it's important to remember that code quality ultimately depends on the developer's understanding of clean and maintainable coding practices and review process. While Copilot can save time, it is crucial to avoid the temptation to blindly accept suggestions and focus on code maintainability. As AI tools like Copilot continue to evolve, their long-term impact on code quality remains to be seen. However, by using Copilot responsibly and with a careful judgement, developers can leverage its strengths to enhance their productivity and potentially improve code quality in the long run.


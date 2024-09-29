# Deliverable 2

## Group 7

# 1\. Positioning

## 1.1 Problem Statement

| The problem of  | Difficulty in connecting with peers for study collaboration |
| :---- | :---- |
| **affects** | College students across various disciplines in different universities |
| **The impact of which is** | Diminished academic performance and lost opportunities for social interaction and skill development which can lead to lower retention rates and a lack of community among students |

**Problem Statement**: The problem of difficulty in connecting with peers for study collaboration affects college students across various disciplines, particularly those in larger universities who may feel isolated or unsure about finding study groups. The impact of this problem is diminished academic performance, increased stress, and lost opportunities for social interaction and skill development, which can lead to lower retention rates and a lack of community among students.

## 1.2 Product Position Statement
| Header | Description |
| :----: | :---- |
| For | College students |
| Who | Struggle to find and connect with study groups for collaborative learning |
| The (product name) | Study Sphere is a web platform |
| That | Simplifies the process of discovering, joining and scheduling study groups to enhance academic success and build community |
| Unlike | Traditional social media platforms or general messaging apps |
| Our product | Focuses specifically on connecting students based on their courses and study needs, fostering a supportive academic environment |

## 1.3 Value Proposition and Customer Segment

**Value Proposition:** “Study Smarter Together” \- Empowers students to collaborate by simplifying the process of finding and connecting with study groups, enhancing academic success.

**Customer Segment:** 

# 2\. Stakeholders

// TODO: **Rudra Amin** 

*Make a list of all project stakeholders and a brief description of each one, emphasizing any responsibilities with the project. Stakeholders include users, clients, competitors, detractors, developers, etc.*

*Grading criteria (1 point): The stakeholders can’t be too generic or specific. The list should reflect what was described in Section 1\.*

Users: students who will be using the app to join and interact in the study groups. Their feedback will guide future updates and how the app is received for other students.

Developers: Frontend and Backend developers responsible for building the website. They ensure a user-friendly interface that performs tasks efficiently.

Competitors: Companies or similar products to ours: Discord, LinkedIn, Social media platforms. Their features will help our website’s unique value proposition.

# 3\. Functional Requirements (features)

// TODO: Jadyn 

*Make a numbered list of requirements for your software. Just self-explanatory titles are enough at this point. Remember that requirements should deliver the value proposition and be consistent with the interviews you performed for the previous deliverable. You can talk to your clients again to help define the requirements. While writing the requirements, focus on the capabilities needed and not on how they should be implemented.*

*Grading criteria (2 points): The list should be comprehensive (remember that you are not expected to implement all the requirements by the end of the course but you should list them). Follow the same pattern to describe all the requirements. The list of requirements should be coherent with the previous sections.*

1. Student accounts that can be created, updated, and deleted  
2. Study groups that students can create,delete, join, and leave  
3. Group settings that allow for changes in membership and administration  
4. Group calendar that allows students to input their availability  
5. Scheduling automation that provides groups with optimal meeting times  
6. Study group chats that are customizable (background color, chat icon/picture) and allow for efficient communication between students

# 4\. Non-functional Requirements

// TODO: Valentino Valero

1. **Performance**  
   **Importance:** Performance ensures that users have a positive experience interacting with the web application with benefits like quick loading of information, snappy feel, and increasing that real-time interaction feel that one would need for a study group.

   **Verifiability:** System should maintain a response time of less than 5 seconds for most interactions a user will encounter, the most important being group chat interactions. Under a load of X users, this will be very important to maintain.

   

2. **Security**  
   **Importance:** This application handles information that would be considered sensitive ( College, email, schedule, name, etc. ). Such information needs to be protected from nefarious or unauthorized individuals, ensuring the user's trust in the product.

   **Verifiability:** The system should undergo data penetration testing and use encryption for crucial user data. Passwords should also be hashed.

   

3. **Compatibility**  
   **Importance:** This platform must be comfortably accessible across most commonly used devices from computers with different OS’s, browsers, and mobile devices. This allows more students to use the product which is ideal due to its nature.

   **Verifiability:** The web application should be compatible with the top 3 commonly used browsers and work across mobile and tablet devices.

4. **Upscaling potential ( new features & accommodation for high traffic )**  
   **Importance:** ideally this product should grow in terms of user traffic, allowing more groups to be joined and increasing the overall efficiency of accommodating users in their academic studies. Scalability is essential for the continuation of accommodation and keeping performance up to par.

   **Verifiability:** The system should be easily scalable in the case we run out of resources, such as increasing ram or storage capacity. This also includes room for new features to be easily implemented if needed overtime.

*Make a numbered list of non-functional requirements that are important for your software. Explain their importance. Follow the terminology of ISO/IEC 25010:2011. For each non-functional requirement, give an objective goal/measurement in order to provide verifiability for the requirement. You can find more details at the following URL: [https://ieeexplore.ieee.org/document/8559686](https://ieeexplore.ieee.org/document/8559686)*

[*Links to an external site.*](https://ieeexplore.ieee.org/document/8559686)

*Grading criteria (2 points): Follow the ISO-IEC terminology, explain why they are important, and provide verifiability criteria for each requirement.*

# 5\. MVP

*What will be your MVP? Which features are you going to validate? How?*

Our MVP includes :

* Homepage: Will provide a welcoming user interface with , where users can navigate to key features like login sign up profiles, chats, groups etc  
* Login/signup page: Easy to use   
  * User settings  
* groups page (create/join groups)   
  * Group settings  
* Calendar (this feature is what we decided to add after the interviews)  
* Chat Feature




*Grading criteria (2 points): Describe what would be considered the Minimal Viable Product and how it will be tested (e.g., via implementation, prototyping, Wizard of Woz, etc.). Make clear what you are going to validate. The MVP should be coherent with the previous sections.*

# 

# 6\. Use Cases

## 6.1 Use Case Diagram
![Study Sphere Use Case Diagram](res/deliverable_2-use_case_diagram.png)

## 6.2 Use Case Descriptions and Interface Sketch

// TODO  **EVERYONE**

*Present one complete use case description for each member of the group. Therefore, if the group has 4 members, 4 use case descriptions are necessary. As the grading will not be individual, the group is responsible for maintaining the quality and consistency of the whole document. So, just avoid splitting the work since everyone can be penalized.*

*Choose the most important use cases to describe. Follow the template provided in the Lecture slides to describe the use cases.*

*Add a sketch of the corresponding user interface after each use case description. This will be a good opportunity to start thinking about usability.* 

*Grading criteria (8 points): Follow the template to describe the use cases. Present an interface sketch for each use case. Describe the use case as a dialog between the user and the system. Do not use UI language in the description of the use case.*

**Use Case Description:** Create an account  
**Actor:** Student  
**Trigger:** The student wants to sign up  
**Pre-Conditions:** The student selects “Sign Up”  
**Post-Condition:** A new student account is created  
**Success Scenario:**

1. The student enters their full name, display name, password, email, number (optional), and their school  
2. The program ensures the student answered all necessary questions  
3. A request is made to the database  
4. The students data is uploaded to the database  
5. The student can now sign in 

**Alternate scenarios:**   
     2a. The student did not provide all necessary information

1. The system informs the student and they are instructed to try again

     2b. The student provides invalid information (ex. improper password, username, or    
           email formatting)

1. The system informs the student and they are instructed to try again

**Interface Sketch:**  
 **![][image1]**

**Use Case Description:** The is logged into their account and they join a study group

**Actor:** Student

**Trigger:** The student is in need of a study group

**Pre-Conditions:** The user must sign in with their credentials

**Post-Conditions:** The user is in a study group

**Success Scenario:** 

1. The student logs into the website with their credentials  
2. The program directs them to the groups dashboard  
3. The student looks for their course study group  
4. Once the student finds a group they want to join, they select join group  
5. The student is now in a group

**Alternate Scenarios:** 

     2a. The student is entering the wrong credentials

1. The system informs the student about wrong credentials and suggests resetting them.

     2b. The student didn’t find a group to join for their course

1. The user creates a new group for the course so other students can join.

**Interface Sketch:**

**![][image2]**

# 7\. User Stories

// TODO **EVERYONE**

* As a student I want a group dashboard so I can join groups related to my classes  
* As a student I want to a create group option so I can make my own groups.

* As a student with a busy schedule, I want in-app schedule optimization so that we can easily find times to study.

* As a student who has a hard time talking to people in class, I want finding groups to be as easy as possible so I can meet people to study with without as much pressure.

*Write two user stories for each member of the group. They can be related to the same features described in the use cases or to different ones. Adopt the following format: "As a \<ROLE\>, I want \<SOMETHING\> so that \<GOAL\>."* 

*Establish a priority level for each user story and estimate the number of hours each one will require using the planning poker approach.* 

*Grading criteria (6 points): Use the provided format. The user stories should be at an adequate level of granularity (not too broad nor too specific). Provide the priority and estimation for each user story.*

As a student who has a hard time talking to people in class, I want finding groups to be as easy as possible so I can meet people to study with without as much pressure. 

As a student with a busy schedule, I want in-app schedule optimization so that we can easily find times to study. 

# 8\. Issue Tracker

// TODO  **EVERYONE**

*The user stories should be registered in your GitHub issue tracker. Include the link to your issue tracker and a screenshot of it.* 

*Grading criteria (1 point): Provide the URL and screenshot of the issue tracker. The user stories should be registered there.*

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW4AAABjCAYAAAC7S+rlAAAUNklEQVR4Xu2dW6gW1RvGpawbravywrrqMr2wpCAlyIuugswIAqnopHWRGV0EUVBSkUWBCJ2UiDQqSMpEy4rKYGdIBRV0IKQTCR2wsnN5mD/vxIyzl2t+z+x39vzd38z6weL7vvXM8z7frD3z7nH29tvTMgd//vlnONUY8n7wwQfhVAn5FOTtUybhzSRNkTK5LmmKoWQSVNerKcjr1RQx77RwogmxQk0hr/fAUJC3T5mEN5M0RcrkuqQphpJJUF2vpiCvV1PEvKlx9yiT8GaSpkiZXJc0xVAyCarr1RTk9WqKmDc17h5lEt5M0hQpk+uSphhKJkF1vZqCvF5NEfOmxt2jTMKbSZoiZXJd0hRDySSorldTkNerKWLe1Lh7lEl4M0lTpEyuS5piKJkE1fVqCvJ6NUXMmxp3jzIJbyZpipTJdUlTDCWToLpeTUFer6aIeafZ5FQZdmCEc12PlNndSJndjaFkphEf6Yq7R5mEN5M0RcrkuqQphpJJUF2vpiCvV1PEvKlx9yiT8GaSpkiZXJc0xVAyCarr1RTk9WqKmDc17h5lEt5M0hQpk+uSphhKJkF1vZqCvF5NEfOmxt2jTMKbSZoiZXJd0hRDySSorldTkNerKWLe1Lh7lEl4M0lTpEyuS5piKJkE1fVqCvJ6NUXMmxp3jzIJbyZpipTJdUlTDCWToLpeTUFer6aIedOvA6bMzkbKbD9effXVbM2aNdnSpUuzM844IzvppJOy6dOnZ9OmTcsf7bXNX3DBBdntt9+ebx/WmKzR5X6mMbGRrrh7lEl4M0lTpEyuW2hjY2PZ3Llz82ZsY86cOdnatWuzvXv3Bo5mmG/Lli3Z4sWLy5o27BsAvR9F2/2cbKiuV1OQ16spYt7UuHuUSXgzSVOkzPq6zz33XNlQ58+fn7333nvhJpPKgQMHsuuuu67MtPyJ4tlPg7Q2UF2vpiCvV1PEvKlx9yiT8GaSpkiZh+sePHgwmzFjRt40V65cGWx1dNi2bVv+fux92ftTNNnPGKS1gep6NQV5vZoi5k2Nu0eZhDeTNEXKzMor3N27d4fSlMLe37x58/L3WgftJ60faW2gul5NQV6vpoh5679KQKxQU8jrPTAU5O1TJuHNJE0x1MxNmzblDXDXrl3j5kcFe9/2/hctWjRuPtzPKrR+pLWB6no1BXm9miLmTY27R5mEN5M0xRAz7ar19NNPr6ijy8MPPzzuCvxorC1Bdb2agrxeTRHzpl8HTJmdjSFlWoN75JFHwvOrF9h+2f699NJLR+x7Gkdn9OqK2w6uBx98MPvhhx/ycf755+dz5G2bWQd5u8okvJmkKYaQuWzZsmzBggXhdC954403au+B0/qR1gaq69UU5PVqipg3/lUQxAo1hbzek+6jjz7KLr300nC6xDTbJoY3U0HerjIJbyZpij5n2tXnzJkzw+lBYPtt+1+F1o+0NlBdr6Ygr1dTxLy9aNx1VwFV6rbxZirI21Um4c0kTdHXzNmzZ2c7duwIpweF7X/1nKL1I60NVNerKcjr1RQxb7ybCWKFmkJez0m3b9++7NNPPw2nj8C2sW1DPJlNIG9XmYQ3kzRFHzNvvPHGbNWqVeH0YCmaN60faW2gul5NQV6vpoh5R75x2/86a0psW09mE8jbVSbhzSRN0bdMa1LffPNNOD141M+RSGsD1fVqCvJ6NUXMO/KN+5hjjgmnaolt68lsAnm7yiS8maQp+pRZd6st8R+0PmptvVBdr6Ygr1dTxLz1qw3ECjWFvJ6T7pprrgmnaolt68lsAnm7yiS8maQp+pJJTSlxGFunn3/+OZzGtW0D1fVqCvJ6NUXM6zoiY4WaQl7PSZfucTfDm0maog+Z9ut+P/74YzidiGDrFPsmV7e2baG6Xk1BXq+miHmPXOUGxAo1hbzeky52sITUbePNVJC3q0zCm0maYtQzZ82ald17773hdEJg61YltraTAdX1agryejVFzBvvZoJYoaaQ13vSGXWN+e23367VjDaZBHm7yiS8maQpRjlz586d2fbt28fNJZph62brVxCu7WRBdb2agrxeTRHz1nc0IFaoKeT1nnQFdg/bmnR12H+8IW/bzDrI21Um4c0kTTHKmfTNPqGprl+4tpMF1fVqCvJ6NUXM6zo6Y4WaQl7vSacgb58yCW8maYpRzTznnHMqSsJLsY607m2gul5NQV6vpoh5U+PuUSbhzSRNMaqZ6Wp7cijWkda9DVTXqynI69UUMa/rCI0Vagp5vSedgrx9yiS8maQpRjHz9ddfD5REG6x507q3gep6NQV5vZoi5h2pxh3ev56sUQe9VwV51X52gTeTNMUoZtLxkJg4l1xyCa57G6iuV1OQ16spYl7XURor1BTyek86BXn7lEl4M0lTjFrmfffdl1111VWhlGjJ3XffHU5NCurrWQdpCvJ6NUXMmxp3jzIJbyZpilHLtKvtP/74I5QSLenqXzHq61kHaQryejVFzOta0VihppDXe9IpyNunTMKbSZpi1DK7ajBDp6t1VV/POkhTkNerKWJe14rGCjWFvN6TTkHePmUS3kzSFFMx88033wync0y76KKLwumS6s9ElixZEsqN2bJlSzjVC2i/aF3bQMeJV1OQ16spYt7UuHuUSXgzSVNM1cyiAd9xxx3jtG3btpWvq4S3UOz1/v37y9f2Z/IK/v777/K5YZ/fcejQofK1uvrcs2dPOFXy66+/hlNI+F6ML774Ytzr6n4UfPfdd+FUlJ9++ql8TvtVt65toePEqynI69UUMW/9agOxQk0hb5OTzgN5+5RJeDNJU0zVTLvqrl5BWwM37Zdffgkc/1HXlAr/+vXrs7POOit77LHHss8++6zc3h7/+eef7JVXXslOPfXU7KuvvsrnbBv701/2N1GL91Js/9dff2UbN27M1q1bV43Ktd9++y0777zzsi+//LKc+/jjj/PH5cuXH7H9999/n61YsSKvV8zZp/dV81588cVs6dKl2ebNm/NvMvY5I99++22u2Tcce98FxXPTLr/88nJff//99/yx7ptO3bq2hY4Tr6Ygr1dTxLy9/SvvdiClkUbTcdttt4XnRonpMWz+mWeeKZ9X5w3747rGwYMHy7nw0bj55pvzBm9ztq0R/pC0qGUNf+vWrfnzosYNN9xwxAc7FdvbFfYtt9ySP1+4cGH+aN9gjOp7uOeee8Y1adPuuuuu2sZdENufGOH5mUa7watdgxm9kLfJ1ZIH8vYpk/BmkqaYyplFw7ZhV72m1V0Zhk3Jfr3tnXfeyeeL2wr2fMOGDeUo5h599NH8SjRscOH2djVt3Hrrrbl25pln5q8LbM5+XdGumIvGXTRi+wTDsHHb9lbLbpdY4/7666+z1atXl7q9Dver+tqe20fahs28+lg3F1K3rm2h48SrKcjr1RQxb/1qA7FCTSFv05NuopC3T5mEN5M0xVTNtCZjo/qDStPq7sUWtwSsCb777rvjmlW1cRcNKmxmxYefVeeuvPLK/Ad6Bw4cOEKrzhVUt3n++efz53WN2/al2P6EE07Ibrrppvx5mGOPdo/7sssuyz9F84UXXij/2EixjTX91157LXvyySeP8Fefh++3St26toWOE6+mIK9XU8S89asNxAo1hbxNTjoP5O1TJuHNJE0xapnqtx+eeOKJ7PPPPw+nS3bt2pU9++yz5Wv74d2HH36YPy9+KGjNvfi7lXbP2259VLF729YoQ+xWytjYWP7cmmwTitr2r4MCu6dd5f333y+v9g27zx2+p08++ST7999/x83FqNapotbVi/p61kGagrxeTRHzpsbdo0zCm0maYtQy6aox4aerdVVfzzpIU5DXqyliXteKxgo1hbzek05B3j5lEt5M0hSjltlVgxk6Xa2r+nrWQZqCvF5NEfO6VjRWqCnk9Z50CvL2KZPwZpKmGLXM9Fkl3ZA+q4Q1Rczb218HbDpSZndjFDO7ujocKsWnA6YxucN1lJrRC3m9V0tVqv+5ooC8k5EZg7xdZRLeTNIUo5iZPo97crHzkNa9DVTXqynI69UUMW/vGne1YRf/pZm8k5EZg7xdZRLeTNIUo5o5d+7cipLwYuv49NNP47q3gep6NQV5vZoi5u1V47b/DlwlNe7DeDNJU4xqZvqbk5ND+puThyFNEfP2pnHbLZLqhwYV2BX49u3bw+mSNpkEebvKJLyZpClGOTPd625H01uVbaC6Xk1BXq+miHldR2esUFPI6z3pDDrRSGuTSZC3q0zCm0maYpQzd+7cid/wE/XYutn6FYRrO1lQXa+mIK9XU8S89R0NiBVqCnm9J114iyTEvHXbeDMV5O0qk/BmkqYY9Uz6hp+oJ1y32NpOBlTXqynI69UUMa/ryIwVagp5PSdd3S2SKua1baqfTVHgyWwCebvKJLyZpCn6kBk2oQRjn40SUre2baG6Xk1BXq+miHldR2WsUFPIO9GTzppxkxOr8Ma2nWhmU8jbVSbhzSRN0ZfM2HGTOBJbJ/v0whBa2zZQXa+mIK9XU8S8riMyVqgp5J3oSVd3+yOk6g1PwolmNoW8XWUS3kzSFH3KDI+bxHhofdTaeqG6Xk1BXq+miHnrVxuIFWoKeSdy0tGBEkLeiWROBPJ2lUl4M0lT9C3Tjpvik/0Sh7F1ofUjrQ1U16spyOvVFDFv8+5XIVaoKeRtetLV3a+uI8ys3hdvmjlRyNtVJuHNJE3Rt0z7PO6JXDAMgeOOOy5fF1o/0tpAdb2agrxeTRHzuo7CWKGmkLfpSdf0FklBLLOo0TRzopC3q0zCm0maoq+Zs2fPznbs2BFODwrb/+o3MVo/0tpAdb2agrxeTRHzjlzj9lzx1GVarSaZHsjbVSbhzSRN0edM+2MDM2fODKcHge13+McWaP1IawPV9WoK8no1Rcw7Up8OWNxLm8zRRU011H52MVJmN+Pqq6/OFixYEJ5XvcT+APHROF/SOHJM/PI1i38HaAp5vVdLCvJef/314VQJ+RTk7Wo/CW8maYqhZK5YsSI7/vjjw+leYft37LHHhtMltH6ktYHqejUFeb2aIuYdfOPuUybhzSRNMbTMs88+23Urbyozb968fL+Mo7G2BNX1agryejVFzOs6ymKFmkJe74GhIG+fMglvJmmKoWZu2rQpb+D2x4NHEXvf9v4XLVo0bj7czyq0fqS1gep6NQV5vZoi5k2Nu0eZhDeTNEXK/O8H4DZ2794dSlMKe392dU3/YqD9pPUjrQ1U16spyOvVFDFv/VcJiBVqCnm9B4aCvH3KJLyZpClS5uG6Bw8ezGbMmJE3xpUrVwZbHR22bduWvx97X/b+FE32MwZpbaC6Xk1BXq+miHlT4+5RJuHNJE2RMuN177zzzrxhnnjiiflvavw/sTzLtfyFCxeGMjLR/SwgrQ1U16spyOvVFDHvSDTuc889N7v44ovDacnmzZvzR0+mQT4FebvKJLyZpClSJtcttLGxsfzPfBW3VebMmZOtXbs227t3b+Bohvm2bNmSLV68uKxpY82aNfh+FG33c7Khul5NQV6vpoh5p3TjLn5v1DBf8fzxxx+vblbLsmXL8semmeH9PfIpyBvuZxXytcGbSZoiZXJd0greeuut7KGHHsquuOKKbP78+dnJJ5+cTZ8+PT9W7dFe2/yFF16YrVq1Kt+e6pKm6HI/PVBdr6Ygr1dTxLxTunHbFUK1cRcUVxBPPfVUqW/cuDF/3LdvX6kXnw1s3mJu+fLl42oUY8+ePeXzAnqvCvKG+1mFfG3wZpKmSJlclzTFUDIJquvVFOT1aoqYd0o3bqNopnZlcejQoXyuuOKONW57vXTp0vK5ce211+aNuZjbv39/+WiZxXbVpm3Qe1WQN7afBeRrgzeTNEXK5LqkKYaSSVBdr6Ygr1dTxLxTvnEXmM8a6wMPPBBt3OvWrcsfq83X/kdbMVcd69evL7dLjZszSVOkTK5LmmIomQTV9WoK8no1Rcw7pRv3aaedls2aNSt/bj5rrPfff3/ZuKv3wIvbIvY6bOKnnHJKduDAgXKuuC1ipMbNmaQpUibXJU0xlEyC6no1BXm9miLmndKN29iwYUN5pbx169Zyvmiy9vGs9vzll18uNWv2Nrd69er8tWUWNaq3TIxq416yZMm45k3vVUHe2H4WkK8N3kzSFCmT65KmGEomQXW9moK8Xk0R8075xl1APgV5+5RJeDNJU6RMrkuaYiiZBNX1agryejVFzDtSH+vaxUiZ3Y2U2d0YSmYa8ZGuuHuUSXgzSVOkTK5LmmIomQTV9WoK8no1RcybGnePMglvJmmKlMl1SVMMJZOgul5NQV6vpoh5U+PuUSbhzSRNkTK5LmmKoWQSVNerKcjr1RQxb2rcPcokvJmkKVIm1yVNMZRMgup6NQV5vZoi5k2Nu0eZhDeTNEXK5LqkKYaSSVBdr6Ygr1dTxLypcfcok/BmkqZImVyXNMVQMgmq69UU5PVqiph3mn0x0kgjjTTSGJ2Rrrh7lEl4M0lTpEyuS5piKJkE1fVqCvJ6NUXMmxp3jzIJbyZpipTJdUlTDCWToLpeTUFer6aIeVPj7lEm4c0kTZEyuS5piqFkElTXqynI69UUMW9q3D3KJLyZpClSJtclTTGUTILqejUFeb2aIuZNjbtHmYQ3kzRFyuS6pCmGkklQXa+mIK9XU8S8qXH3KJPwZpKmSJlclzTFUDIJquvVFOT1aoqYN306YMrsbKTM7sZQMtOIj3TF3aNMwptJmiJlcl3SFEPJJKiuV1OQ16spYt7UuHuUSXgzSVOkTK5LmmIomQTV9WoK8no1RcybGnePMglvJmmKlMl1SVMMJZOgul5NQV6vpoh5U+PuUSbhzSRNkTK5LmmKoWQSVNerKcjr1RQxb2rcPcokvJmkKVIm1yVNMZRMgup6NQV5vZoi5v0fla0J6tJbL+0AAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAB7CAYAAAAc0bfWAAATJ0lEQVR4Xu2dT4hVdRvHBzFa1SLQhYWLgoQWEoUILjKDsD9SuIgkEkpqZ6sWBUV/pMCkMogUolqU5KIgghAXZYGJEoFRLiKxnUQUBoGRZPxefuflzHvmN+f5POd87683597nA4dpztfPM7fvnPt4Z5y5dy718Mcff5SnJkKZR84333xTnnKheZRZkEOZgjKPnOjPh5zoz4ec2v3NlScyJCgo88ipXQJlFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f7HEEmcW5FCmoMwjJ/rzISf68yGndn+xxBJnFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f7HEEmcW5FCmoMwjJ/rzISf68yGndn+xxBJnFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f7HEEmcW5FCmoMwjJ/rzISf68yGndn+xxBJnFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f3M5XGpHLqE8F8fwI/qb7Ij+Jjtq9xePxBJnFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f7HEEmcW5FCmoMwjJ/rzISf68yGndn+xxBJnFuRQpqDMIyf68yEn+vMhp3Z/scQSZxbkUKagzCMn+vMhJ/rzIad2f7HEEmcW5FCmoMwjJ/rzISf68yGndn+xxBJnFuRQpqDMIyf68yGnVn/nz59Pe/bsSTfccEOam5sbfdx1113pww8/LMf2fqxJUOaRU6u/llhiiTMLcihTUOaRE/35kKP0d+bMmbR+/fpm+Sxbtizt3r27/CMyp0+fTtu3b59fbjt37iz/yERQFxbkKP3RvFhiiTMLcihTUOaRE/35kDO0v0cffbRZKps3by6jf5zjx4+n5cuXNx//448/LuNRUBcW5AztrwvNiyWWOLMghzIFZR450Z8POdTfk08+2SyOvXv3ltG/yi233NLcru+++66MXKgLC3KoPwuaF0sscWZBDmUKyjxyoj8fcvr6ywti48aN5elLjr///ru5rdu2bSsjE+rCgpy+/jxoXiyxxJkFOZQpKPPIif58yOn2lxfCvn37OunSIf+Dwo033lieXgR1YUFO7esvfgF8Bo/ob7Ij95eX1/79+8v705Jk9erVzT8MlP+f/9RR+/qbqUdijz/+eHPxHTt2rHlY/corrzTv08eyIIcyBWUeOWp/FpRZkEOZgjLPcvI36zds2FCengryfeG3334rT5tdEOTUvv5mZoldddVVzeLq4/7770/ffvtteRqh20eZgjKPHKU/mkeZBTmUKSjz+px8J5923nzzzXTttdcuONfXhQc5ta+/3s8KCQrKPHLGlpAXVH70RYy9QOn2UaagzCNnbH8ZmkeZBTmUKSjzus7hw4fTmjVrOun0070/TNpfSe3rr/eeS4KCMo+csSUMXVDvvfdeecqEbh9lCso8csb2l6F5lFmQQ5mCMq91tm7dmg4ePFiks8Fll12W/vzzz4n666P29dd77yZBQZlHztgShi6x/CXnUOj2UaagzCNnbH8ZmkeZBTmUKSjzsrNq1armTjzLbNmyJR09erQ87UKd177+eu/dJCgo88gZW0IssYWM7S9D8yizIIcyBWXeihUrylMzy44dO9LJkyfL0wh1Xvv6m8sDp/0YusRefPHFRW4cs3dM678+TsKmTZsW9XSpHL33btp6Cso8cvINH0N8Y38hY/vL0DzKLMihTGHMvPx7hh999FF5Okjj7iPUee3rr/dWkaCgzCNHKSF+xOJ/KP3RPMosyKFMYcy86667rjwVdBi6yKjz2tdf7y0iQUGZR45aQvyw639R+7OgzIIcyhSGzht6B5118rddPKjz2tdf72eNBAVlHjk1Svgnfw6GMgVlHjk1+utCmQU5lCkMmffJJ5+kX375pTwd9HDllVeWpxZBnde+/mKJpcXZEMihTEGZR06N/rpQZkEOZQpD5sWjsHF4vzhOnde+/no/cyQoKPPIqVFCLLFx0DzKLMihTMGb99lnn5WnAodrrrmmPLUA6rz29Td1Sywvp5qHBd0+yhSUeeRQfxY0jzILcihT8ObR5zmwefXVV8tT81Dnta+/3s8eCQrKPHJqlNC9cMtsCORQpqDMI6dGf10osyCHMgVv3sMPP1yeCgZAy586r3399d4KEhSUeeTUKCGW2DhoHmUW5FCmQPPiZ8J0brvttvLUPNR57esvllhanA2BHMoUlHnk1OivC2UW5FCmQPMuv/zy8lQwkL7nHmuhzmtff7HE0uJsCORQpqDMI6dGf10o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>

[use_case_diagram]: <Deliverables/res/deliverable_2-use_case_diagram.png>

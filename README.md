# [Gamehub](https://gamehub-react.herokuapp.com/)

A full CRUD SPA app using MERN Stack development. Gamehub is a mock online gaming store. **It is <u>not</u> a real store**. You can browse different game titles by scrolling in the **`home page`** or searching for them in the searchbar. The games displayed in the home screen will either have a <ins>*green*</ins> or <ins>*red*</ins> border around them. Green indicates that the game is still in stock and red means the game is out of stock and needs to be replenished by the developer. Hovering over a game will also display a banner that will display that game's basic info like its name and price. 

Clicking on one of the game cards will send you to that **`game's page`**, where you can see more details about it, like its description, quantity of games available and reviews that users have left. You can add games that are still in stock to your cart as well which will change the number on the cart image in the navbar. 

Clicking on the cart image in the navbar will send you to your **`cart page`**. There all of the games you added will be displayed as individual cards and the price displayed will reflect the number of games you added. You can also <ins>***"buy"***</ins> the ones you want or <ins>***remove***</ins> them from your cart. Buying a game will reduce the number of games available for purchase for everyone else. **No money will be taken and no game will be sent to you**. You can also create an account as a `Gamer` or `Developer` to experience everything the app has to offer. 


## Account Types

### Gamer 
As a gamer you have the ability to change the browsing order of the games in the home page. You also have the ability to <ins>***write***</ins>, <ins>***edit***</ins>, and <ins>***delete***</ins> your own reviews. Users with a gamer account are the only ones that can write reviews. Be respectful in what you write though, because the `admin` has the power to remove any comments that are disrespectful or inappropriate. You can also click on your name in the nav bar, which will give a dropdown for additional pages. **"`My Account`"** is one of the options in the dropdown. There, you can see all of your user's information. You can also <ins>***edit***</ins> your information by clicking on the edit button, or <ins>***delete your account***</ins>. 

### Developer
Every game displayed on the app was added by a user with a game developer account, and as one of them you also get to do the same by creating and editing your games. Unlike gamers, developers can't buy any games and they only see the games they made, so a new developer's home page will be empty until a game is created. The searchbar for a developer is also different. *It will only show the games they have made*, regardless if it has been approved by the admin or not. The games displayed in the home page also have borders, but developers have three border colors. 

The <ins>*green*</ins> means no action needde. Everything is ok with the game and everyone can see it. The <ins>*yellow*</ins> border means action required by admin. The admin has to review the contents of the game. *Only the admin and the developer that created the game can see the yellow border games*. The <ins>*red*</ins> border requires action from the developer, but it has two different meanings. It either means that the game has reached 0 and is now out of stock or the game failed the review process by the admin. If the game is out of stock then all the developer needs to do is change the quantity in the edit button. Once a new quantity has been placed the border will change from red to green and it will be available for purchase again. If the game failed the review process then a message will be displayed in that game's page under the title. The message will give a detailed explanation from the admin explaining why the game failed the review process. Once the developer makes the changes to the game it will be sent for review again and the border will turn yellow. Unlike the out of stock options, games that have a red border because they failed the review *can't* be seen by anyone other than the <ins>admin and the developer that made the game.</ins> 

Developers can also click on their name in the navbar to display the dropdown menu. There are currently two options available, **"`My Account`"** and **"`New Game`"**. My Account works the same way as the gamer account option. You can see all of your user's information. You can also <ins>***edit***</ins> your information by clicking on the edit button, or <ins>***delete your account***</ins>. New Game will send you to a new page to <ins>***create***</ins> a new game. Once the game is created you can see all of its information in its page and <ins>***edit***</ins> any information you have alrewady placed by clicking on the edit button. Every new and edited game is automatically given a yellow border for review. 

The last image in the navbar will send you the your **`stats page`**. There you can see the all of your games stats. which games were bought and how many times they were bought, which games have reviews and how many reviews they have. You can also rearrange the table to be displayed by name(alphabetical), or by popularity (sold the most). This page is currently being built.

### Admin
There is only one admin account and the option to create an admin account isn't available in the sign up like the other two accounts. As the admin, you the ability to see every game. The home page for the admin displays all of the yellow border games at the top, since they need to be reviewed. When you click on the game you are taken to that game's page. If the game is still under review then you will see a *"approved?"* question with the buttons <ins>*yes*</ins> and <ins>*no*</ins> underneath. If you click yes, the game will be approved. The border will turn green, which means everyone will be able to see it. If you click no a box will show up asking for an explanation to be written. You must provide an explanation as to what the developer has to change. Once an explanation is provided, the game will have a red border and only you and the game developer that made the game will be able to see. Once the game is edited by the developer it will once again be up for review (yellow border). 

As an admin you can also <ins>***remove***</ins> any review from any game. Deleting a review as an admin will leave a review with a message *"Message was removed by admin"* that can't be removed or edited by anyone. Just like the developer and gamer accounts you have a **"`My Account`"** page that is accescible in the navbar under your name. The last picture in the navbar is your **`stats page`**. There you can seet he information of every user. You don't have access to their password, but you can their email, username, and when the account was created. You can also see how many games were bought and sold and which ones were bought and sold the most.


## Tech Used
 - bcrypt
 - express
 - MongoDB
 - cors 
 - jsonwebtoken
 - morgan
 - mongoose
 - react
 - NodeJS


## [Wireframe](https://miro.com/app/board/uXjVO2geB1U=/)


## [ERD](https://miro.com/app/board/uXjVO3Q1pPU=/)




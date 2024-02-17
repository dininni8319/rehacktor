# Rehacktor
React, Laravel App.

## Overview
This application allows users to search for a game, and share the streaming while they are playing with their friends.

## Useful commands run the application, install packages, and update the DB.
<strong>make dev </strong> = specifica la tipologia di comando, avvia entrambi le applicazioni, backend and frontend, con un unico commando di autonomazione.
<br>
<strong>make freshdb</strong> = command that resets the db
<br>
<strong>make install</strong> = performs installations setup

## Packages/Commands:
- npx create-react-app "name"
- npm i react-router-dom
- npm uninstall react-router-dom
- npm install react-router-dom@5.2

## API calls examples
### To test httpie
- https httpie.io/hello

### register 
http POST http://localhost:8001/api/users/register name=Salvatore email=s.dininni@yahoo.com password=12345678 password_confirmation=12345678

### login 

http POST http://localhost:8001/api/users/login email=s.dininni@yahoo.com password=12345678

### logout

http POST http://localhost:8001/api/users/logout Authorization:Bearer\ eii...tr3    -> token

### user profile 

http GET http://localhost:8001/api/users/view-profile Authorization:Bearer\ eii...tr3    -> token

### create new room 

http POST http://localhost:8001/api/users/room game_id=35 game_name=zelda max_seats_available=4 Authorization:Bearer\ 

### close room 
http POST http://localhost:8001/api/users/room/close Authorization:Bearer\

### join room 
http POST http://localhost:8001/api/users/room/join room_id=60 Authorization:Bearer\

### streamer info
http GET http://localhost:8001/api/users/room/streamer/7 Authorization:Bearer\

### roomsActive 
http GET http://localhost:8001/api/users/room/roomsActive

### roomsActive 
http GET http://localhost:8001/api/users/room/roomsByGame

### count users
http GET http://localhost:8001/api/users/count

## use it when the env variables are not giving the correct value
- php artisan config:clear
- php artisan optimize:clear

## or try these
<strong>php artisan cache:clear</strong><br>
<strong>php artisan config:clear</strong><br>
<strong>php artisan route:clear</strong><br>
<strong>And then after changes run these:</strong><br>

<strong>php artisan config:cache</strong><br>
<strong>php artisan route:cache</strong><br>
<strong>php artisan optimize</strong><br>

## Frontend / Full-Stack Developer: 
Salvatore Dininni

## Something about Me...
From the sizzling world of the kitchen to the dynamic realm of tech, my journey took an unexpected turn during the pandemic. Embracing the art of coding with TypeScript, the younger cousin of JavaScript, has become my passion. With a deep understanding of frontend technologies, I bring a unique blend of creativity and technical prowess to every project. Currently exploring new opportunities in the frontend landscape – let's create something amazing together!

<p>A Highly Motivated Individual, open to new challenges and quickly learns new technologies. Self-driven, dedicated, and hard-working. Passionate about Web Development, Web Design, and Web Technologies.</p>

<p>
Attended remote HackJS course, based in Bari, Italy. Topics learned during the part-time course: Advanced Javascript, TDD, Type Coercion, React framework, React Native, Strapi. As a final project, i implemented Rehacktor, a Game Streaming application.
</p>

<p>
Attended remote Hackademy course, based in Bari, Italy. The technology involved were HTML5, CSS3, Bootstrap5, PHP, JS, Laravel, Vue, React, and React Native. As a final project, I implemented Presto, an E-commerce announcement application.
</p>

<p>
Completed Full-Stack Bootcamp with Propulsion Academy based in Zurich, Switzerland. Learned HTML5, CSS3, SCSS, JavaScript, React, Redux, Python, Django, PostgresSQL, REST Framework, Docker, GitLab, Git, NPM, Node, and Web Deployment. As a final project, I developed a Student Tracker, where professors of the course can keep track of student progress and grades. 
</p>

## Spoken languages: 
- Italian 
- English 
- German
- French

## More details...
<b>LinkedIn Profile: <a href="https://www.linkedin.com/in/salvatoredininni/" >https://www.linkedin.com/in/salvatoredininni/ </a></b>
<br>
<b>Portfolio Website: <a href="https://www.salvatore-dininni.com" >https://salvatore-dininni.com</a></b> 

## My other projects:
<b>Game Streaming React / Laravel App: <a href="https://rehacktor.vercel.app/" >https://rehacktor.vercel.app</a></b> 
<br>
<b>Email Client Angular App: <a href="https://emailclient-henna.vercel.app" >https://emailclient-henna.vercel.app/</a></b> 
<br>
<b>Search User Github App: <a href="https://github-search-green-five.vercel.app/">https://github-search-green-five.vercel.app/</a></b>





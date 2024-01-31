Comandi di autonomazione.

<strong>make dev </strong>= specifica la tipologia di comando, avvia entrambi le applicazioni, backend and frontend, con un unico commando di autonomazione.
<strong>make freshdb</strong> = command that resets the db
<strong>make install</strong> = performs installations setup

## API calls examples

###To test httpie
https httpie.io/hello

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
s.dininni@yahoo.com


#use it when the env variables are not giving the correct value
<strong>php artisan config:clear</strong>
<strong>php artisan optimize:clear</strong>

# or try these
<strong>php artisan cache:clear</strong>
<strong>php artisan config:clear</strong>
<strong>php artisan route:clear</strong>
<strong>And then after changes run these:</strong>

<strong>php artisan config:cache</strong>
<strong>php artisan route:cache</strong>
<strong>php artisan optimize</strong>

<h1>Project Title: Rehacktor</h1>

<h2>React, Laravel App.</h2>

<h3>Packages/Commands:</h3>
#npx create-react-app "name"
#npm i react-router-dom
#npm uninstall react-router-dom
#npm install react-router-dom@5.2

Packages
boostrap-material
#https://mdbootstrap.com/docs/standard/getting-started/installation/

Ant-design
#https://ant.design/
#npm i @ant-design/icons
#npm i antd

Firebase
npm i firebase@9.6.7
https://firebase.google.com/

npm i react-toastify

#npm i redux react-redux redux-devtools-extension

https://codecontinue.com/article/deploy-react-node-mern-full-stack-app-to-digital-ocean

<h2>Full-Stack Developer ___ <span>Salvatore Dininni</span></h2>

<h4>Something about Me<h4>
<p>A Highly Motivated Individual, open to new challenges and quickly learns new technologies. Self-driven, dedicated, and hard-working. Passionate about Web Development, Web Design, and Web Technologies.</p>
<br/>
<p>
Attended remote HackJS course, based in Bari, Italy. Topics learned during the part-time course: Advanced Javascript, TDD, Type Coercion, React framework, React Native, Strapi. As a final project, i implemented Rehacktor, a Game Streaming application.
</p>
<br/>
<p>
Attended remote Hackademy course, based in Bari, Italy. The technology involved were HTML5, CSS3, Bootstrap5, PHP, JS, Laravel, Vue, React, and React Native. As a final project, I implemented Presto, an E-commerce announcement application.
</p>
<br/>
<p>
Completed Full-Stack Bootcamp with Propulsion Academy based in Zurich, Switzerland. Learned HTML5, CSS3, SCSS, JavaScript, React, Redux, Python, Django, PostgresSQL, REST Framework, Docker, GitLab, Git, NPM, Node, and Web Deployment. As a final project, I developed a Student Tracker, where professors of the course can keep track of student progress and grades. 
</p>
<br/>
<p>
Spoken languages: Italian, English, German.</p>
<br/>
<p>
I will share GitLab and Github accounts upon request.</p>
<br/>
<br/>
<strong>More details...<strong>
<b>LinkedIn Profile: <a href="https://www.linkedin.com/in/salvatoredininni/" >https://www.linkedin.com/in/salvatoredininni/ </a></b>
<b>Portfolio Website: <a href="https://salvatore-dininni.com/" >https://salvatore-dininni.com</a></b> 

<h3>My other projects:</h3>

<b>MERN Ecommerce App: <a href="http://ecommerce-mern.salvatore-dininni.com/" >http://ecommerce-mern.salvatore-dininni.com/</a></b> 

<b>Game Streaming App: <a href="https://rehacktor.salvatore-dininni.com/" >https://rehacktor.salvatore-dininni.com/</a></b> 

<b>Search Bar: <a href="http://github-search.salvatore-dininni.com">http://github-search.salvatore-dininni.com</a></b>

<b>Task App, React and Laravel Stack: <a href="https://task.salvatore-dininni.com">https://task.salvatore-dininni.com</a></b>

<b>Ricorsi App, React and Laravel Stack: <a href="https://ricorsi.salvatore-dininni.com">https://ricorsi.salvatore-dininni.com</a></b>

<b>Search Console, React and Laravel Stack: <a href="https://search-console.salvatore-dininni.com">https://search-console.salvatore-dininni.com</a></b>
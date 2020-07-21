# Address Book
```
Web applacation Address Book allows you easly use it as address book for your needs.
It uses json-server as a back-end for recieving rest api requests from client.
For managing db.json - database file, is using lowdb library.
Front-end part is based on Vue, Vuex, Router-Vue. Forms are validating with vuelidation library. Using materializecss for pop-up messages and as a UI framework.

Password are encrypted with bcrypt library and saved hashed in db.json.
JWT-token is created on server side and managed on client with help of localStorage. Jwt-token is solidly validated on server in middleware route options. Simple validation is used on front-end in Router-Vue as well. 
```

## Project setup
```
npm install
```

## Project run
```
npm run start

Open localhost:8080 and enjoy.
```
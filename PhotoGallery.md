[FireGram](https://www.youtube.com/watch?v=vUe91uOx7R0)

* npx create-react-app firegram
* cd firegram
* npm start
* index.js, index.css, App.js, comps/Title.js
* download [index.css](https://github.com/iamshaunjp/firegram/blob/starter-files/src/index.css)
* Firebase setup
  * create a project : firegram
  * uncheck to disable google analytics, press create a project, it will take a minute or so
  * register a new front end web application
    * click web app and name the app firegram
    * uncheck firebase hosting
    * Firebase give us all of this code, grab all of that inside script tag
    * paste it somewhere of a kind of a config file
      * create a folder named firebase under src folder
      * create a file src/firebase/config.js then paste the content right here
  * install firebase package
    * npm install firebase
  * import 'firebase/storage'    : storage to store our images
  * import 'firebase/firestore'  : database 
  * initialize storage service and firestore service
    * const projectStorage = firebase.storage()
    * const projectFirestore = firebase.firestore()
  * export {projectStorage, projectFirestore}
  * setup backend firebase database
    * create a cloud firestore 
      * create a database
      * start in a test mode
        * we are going to create a collection for storing documents of image url 
  * select storage service on the left menu
    * change rule
      * delete anything at the right of write except semicolon
* upload form
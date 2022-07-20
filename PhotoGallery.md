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
  * src/firebase/config.js
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
* src/App.js
  * nest Title component
* upload form
  * src/comps/UploadForm.js
    * useState() to set selected file
    * declare array variable for allowed image types
    * define onChange event handler for input tag of file type
    * useState() to set error of selecting non image file
* separate the firebase logic from the component
  * create a custom hook to handle file upload on firebase storage
    * src/hooks/useStorage.js
      * Three useState() for progress, error, and url
      * component has a file parameter to receive a user selected file 
      * import projectStorage from ./firebase/config
      * useEffect() hook which is dependent on a given file 
        * get reference to a file being uploaded to projectStorage
          * const storageRef = projectStorage.ref(file.name) 
        * upload the file to the referencing storage (the description below is deprecated, but logic is almost same)
          * [refer to firestore document](https://firebase.google.com/docs/storage/web/upload-files)
          * storageRef.put(file); // this is a asynchronous, it takes some time
          * we can attatch a listener to it which is going to fire functions when certain events happen
          * listen for 'state_changed' event, and it happens about 3~4 or 5~6 times during the upload
            * set percentage of the upload
            * set error, in case of something wrong happens
            * set download url when upload completes
              * To get download url we call storageRef.getDownloadURL() which is asynchronous 
        * return {progress, url, error}
      * export default useStorage
* upload form progress bar
* create a new component, src/comps/ProgressBar.js
  * import react, useStorage custome hook
  * create a ProgressBar function
  * export ProgressBar
* nest ProgressBar in the UploadForm component 
  * pass the file selected to ProgressBar component
  * pass the setFile function reference to ProgressBar component to set file to null when upload completes
* Back to src/comps/ProgressBar.js
  * add {file, setFile} as function's parameters  
  * const {url, progress} = useStorage(file)
* src/App.js
  * nest UploadForm component below Title component
* Back to src/comps/ProgressBar.js
  * remove ProgressBar when it reaches 100%
  * when url is present then we know it reaches 100%
  * let useEffect() hook's dependency array include url
* Back to useStorage hook
  * when upload completes, We will save the url to firestore
  * [refer to firebase document](https://firebase.google.com/docs/firestore/quickstart)
  *  
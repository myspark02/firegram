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
  * when upload completes, We will save the url to firestore : 
    * I moved this code from useStorage to ProgressBar, because 'state_changed' event's third argument which is a function that should be called when upload completes, is being called twice
  * [refer to firebase document](https://firebase.google.com/docs/firestore/quickstart)
*  Listen to firestore collection to get all of the urls  in real time as they added to our project for that we'll be creating a new custom hook called useFirestore
*  Firestore hook & showing images
*  set up a connection between our app and firestore to listen for documents being added to this collection and retrieve those documents and cycle through them in react component and output image for each one of them for that create a new file called comps/ImageGrid.js
*  src/comps/ImageGrid.js
*  Nest the ImageGrid component into App and place it right below the UploadForm component
*  Let's useFirestore hook we gonna create now do the firestore work for use 
*  create a new file called hooks/useFirestore.js
   *  We need to communicate with firestore database to get all the image urls, and those code will go inside useEffect hook
      * Each time a change occurs inside the collection we get documents from the collection
      * [refer to firestore document](https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection)
 * src/comps/ImageGrid.js
   * call useFirestore custom hook inside of ImageGrid
   * Cycle through the docs which is returned by calling useFirestore hook, and display those docs' images
* creating a modal which pops up when we click each image
* src/comps/Modal.js
* import Modal component inside App, and place it just below ImageGrid component
* We need a way to pass the clicked image info to Modal component, for that declare selectedImg state in App component, pass setSelectedImg function to ImageGrid component by props, and add setSelectedImg parameter to ImageGrid component.
* In ImageGrid jsx code, add anonymous function which call setSelectedImg with clicked image's url as onClick event handler 
* In App jsx code, pass selectedImg to Modal as props, add selectedImg parameter to Modal component, in Modal's jsx code set Img tag's src attribute value to selectedImg
* Now you can see modal's backdrop always upfront, so no image can be clicked. To resolve this problem, we conditionally render Modal only when selectedImg is not null
  * this code is go to App's jsx code
* But again now we still can't close the modal
  * to resolve this we set selectedImg to null when backdrop is clicked.
  * pass setSelectedImg function to Modal from App, add setSelectedImg parameter to Modal, add a function which call setSelectedImg with null as backdrop div's click event handler
* But again now modal is closed even though we click an image itselft.
  * to resolve this we check for the event target object
    * In click event handler we call setSelectedImg(null) only when classList of event's target contains 'backdrop'.
* Animation with Framer Motion package
  * [Framer Motion is animation package for react](https://www.framer.com/motion/)
  * install a framer motion package
    * npm install framer-motion
  * src/comps/ImageGrid.js
    * import {motion} from 'framer-motion'
    * add animation to 'img-wrap' div, to do this we just change div tag to motion.div tag, add animation attribute whileHover={{opacity:1}}, add animation attribute layout then when a new image added they animate to arrange images to the right position.
    * add animation to image so that it first appears it fades in
      * change img tag to motion.img 
      * add initial, animate, transition attribute like belows
        ```
         initial = {{opacitiy: 0}} 
         animate = {{ opacity: 1}}
         transition = {{ delay: 1}}
        ```
  * src/comps/ProgressBar.js
    * add animation to progress bar
    * import {motion} from 'framer-motion'
    * remove style attribute from 'progress-bar' div
    * change div to motion.div
    * add initial, animate like belows
      ```
      <motion.div className='progress-bar'
        initial={{ width: 0}}
        animate= {{ width: progress + '%'}}
        >
      </motion.div>
  * src/comps/Modal.js
    * add animation to Modal
    * import {motion} from 'framer-motion'
    * change div to motion.div
    * add initial, animate like belows
      ```
      initial = {{ opacity : 0 }}
      animate = {{ opacity : 1 }}
      ```
    * change img to motion.img
    * add initial, animate like belows
      ```
        initial = {{ y : "-100vh" }}
        animate = {{ y : 0}}
      ```
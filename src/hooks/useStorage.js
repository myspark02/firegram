import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore} from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    // const storageRef = projectStorage.ref(file.name);
    const storageRef = ref(projectStorage, file.name)
    

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percentage);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default :
                    }
                }, 
                (error) => {
                    setError(error);
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);                        
                        const createdAt = serverTimestamp();
                        try {
                            const docRef =  await addDoc(collection(projectFirestore, "images"), {downloadURL, createdAt});
                            setUrl(downloadURL);
                          } catch (e) {
                            console.error("Error adding document: ", e);
                          }
                    });
                }
    );
  }, [file]);

  return { progress, url, error };
}

export default useStorage;
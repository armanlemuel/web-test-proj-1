// Firebase initialization code
const firebaseConfig = {
  apiKey: "AIzaSyAzATpDuHaHbhMlwtz-OJd7FnFATvTqVk4",
  authDomain: "web-test-proj-1.firebaseapp.com",
  databaseURL: "https://web-test-proj-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-test-proj-1",
  storageBucket: "web-test-proj-1.appspot.com",
  messagingSenderId: "284556723754",
  appId: "1:284556723754:web:c463a13a6d85defd9e6553",
  measurementId: "G-0GEK8VNVNM"
};

firebase.initializeApp(firebaseConfig);

function loginUser(username, password) {
  // Reference to the "users" node in Firebase Realtime Database
  const usersRef = firebase.database().ref('users');

  // Query the database to find the user with the provided username
  usersRef.orderByChild('username').equalTo(username).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();

      // Check if a user with the provided username exists
      if (userData) {
        // Loop through each user found (should be only one)
        Object.keys(userData).forEach((userId) => {
          const user = userData[userId];
          // Check if the password matches
          if (user.password === password) {
            console.log("User logged in successfully:", user);
            // Optionally, redirect to another page or update UI
          } else {
            console.error("Incorrect password");
            // Display error message to the user
            alert("Incorrect password");
          }
        });
      } else {
        console.error("User not found");
        // Display error message to the user
        alert("User not found");
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      // Handle error
      alert("An error occurred. Please try again later.");
    });
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get user input
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Call Firebase authentication function
  loginUser(username, password);
});

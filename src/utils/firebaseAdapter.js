import firebase from 'firebase';

let Adapter = function Adapter () {

// Initialize Firebase
let config = {
    apiKey: "AIzaSyAl1J9f8chjKFPUV11WXp3ccWKDmp2vx-g",
    authDomain: "auction-demo.firebaseapp.com",
    databaseURL: "https://auction-demo.firebaseio.com",
    storageBucket: "",
};
let firebaseRef = firebase.initializeApp(config),
    db = firebaseRef.database();

let provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email'); //    View your email address

let auctionsRef = db.ref("auctions"),
    usersRef = db.ref("users"),
    configRef = db.ref("CONFIG");

    return {

        addNewUser (uid, userObj) {

            return new Promise( (resolve, reject) => {

                let firebaseCallback = (error) => {
                    if (!error) {
                        resolve(userObj);
                    } else {
                        console.log('Firebase threw error adding new user: ', error);
                    }
                };

                usersRef.child(uid)
                   .set(userObj, firebaseCallback);

            });
        },

        signInWithRedirect () {
            firebaseRef.auth().signInWithRedirect(provider);
            // console.log('signInWithRedirect')
        },

        authCheck (callback) {
            let self = this;

            firebase.auth().getRedirectResult().then(function(result) {
              if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
              } else {
                self.signInWithRedirect();
              }
              // The signed-in user info.
              var user = result.user;

              // console.log('result', result);
              // debugger;

              //
              callback( user );


            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...

              // console.log('error', error);
              // debugger;

            });
        },

        getAllUsers () {
            return new Promise(function(resolve, reject) {
                usersRef.once('value', (snapshot) => { resolve(snapshot.val()) });
            });
        },

        updateUserPaidAmt (userId, amt) {
            return usersRef.child(userId).update({paidAmt: amt}).then( () => {
                // TODO: need to use snapshot instead
                return usersRef.child(userId);
            })
        },

        updateUserNotes (userId, notes) {
            return usersRef.child(userId).update({notes: notes}).then( () => {
                // TODO: need to use snapshot instead
                return usersRef.child(userId);
            })
        },

        getConfig () {
            return new Promise(function(resolve, reject) {
                configRef.once('value', (snapshot) => { resolve(snapshot.val()) });
            });
        },

        updateConfig (callback) {
            configRef.on('child_changed', (childSnapshot, prevChildKey) => {
                let updatedConfigProp = {};
                updatedConfigProp[childsnapshot.key] = childSnapshot.val();
                callback(updatedConfigProp)
            });
        },

        addAuction (auctionObj, callback) {
            auctionsRef.push(auctionObj, callback);
        },

        loadAuctions (callback) {
            auctionsRef.on("child_added", (snapshot) => {
                let auction = snapshot.val();
                auction.id = snapshot.key;
                callback(auction);
            });
        },

        updateAuctions (callback) {
            auctionsRef.on("child_changed", (snapshot) => {
                let auction = snapshot.val();
                auction.id = snapshot.key;
                callback(auction);
            });
        },

        updateWinningBid(auction, winningBids, auctionOwner) {
            return new Promise( (resolve, reject) => {
                auctionsRef.child(auction.id).update({
                    winningBids: winningBids,
                    auctionOwner: auctionOwner
                }, error => {
                    if (error) {
                        reject("Data could not be saved." + error);
                    } else {
                        resolve("Data saved successfully.");
                    }
                });
            })
        },

        placeBid (bidObject, successCallback, failCallback) {
            // console.log('firebase adapter', bidObject);
            // add bid
            auctionsRef.child(bidObject.auctionId).child('bids').push(bidObject);
            // update highest bid for auction item
            auctionsRef.child(bidObject.auctionId).update({highestBid: bidObject.bidAmount});
        },

        loginGoogle (successCallback, failCallback) {
            this.signInWithRedirect();
            // return ref.authWithOAuthRedirect("google", function(error, authData) {
            //     if (error) {
            //         // console.log("Login Failed!", error);
            //         return failCallback(error);
            //     } else {
            //         // We'll never get here, as the page will redirect on success.
            //         // console.log("Authenticated successfully with payload:", authData);
            //         return successCallback(authData);
            //     }
            // }, {
            //     scope: "email"
            // });
        },

        logoutUser () {
            firebase.auth().signOut()
            //  .then(function() {
            // Sign-out successful.
            // }, function(error) {
            //   // An error happened.
            // });
            // document.location.reload(true);
        }

    }
};
export default new Adapter();

import * as firebase from 'firebase'
// check if the token is existing

export function checkLocalToken () {
  console.log('checking local token')
  var localToken = localStorage.getItem('admin-app-token')
  if (localToken) {
    console.log('local token is here: ' + localToken)
    return localToken
  } else {
    console.log('there is no local token')
    return false
  }
}

export function signUserIn (token) {
  console.log('sign User In > save web token to local')
  localStorage.setItem('admin-app-token', token)
  console.log('user signed in >> new token is: ' + token)
}

export function signUserOut () {
  console.log('signUserOut >> clearing the local storage')
  localStorage.clearItem('admin-app-token')
  console.log('the user signed out!')
}

export function requestSigin (email, password) {
  console.log('try to log in ' + email + ' ' + password)
  // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  //   // Handle Errors here.
  //   var errorCode = error.code
  //   var errorMessage = error.message
  //   // ...
  // })

  const auth = firebase.auth()
  const promise = auth.signInWithEmailAndPassword(email, password)
  promise.then(res => console.log(res))
}

export function validateLocalToken (token) {
  console.log('validating Local Token ...')
  // call server .. with local token

  // axios.get('').then(res => res.json).then( stat => {
  //   if ( stat.status === ok ){
  // signUserIn(token)
  //   } else {
  // signUserOut()
  //   }
  // })

  // wait for server response
  // if the response OK!
  // do this

  // else do this
}

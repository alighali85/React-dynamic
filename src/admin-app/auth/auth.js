import * as firebase from 'firebase'
// check if the token is existing

export function checkLocalToken () {
  return localStorage.getItem('user-token')
}

export function signUserIn (token) {
  localStorage.setItem('user-token', token)
}

export function signUserOut () {
  localStorage.clear('user-token')
}

export function requestSigin (email, password) {
  console.log('try to log in ' + email + ' ' + password)
  const auth = firebase.auth()
  const promise = auth.signInWithEmailAndPassword(email, password)
  promise.then(res => res)
    .then((data) => {
      signUserIn(data.user.I)
      if (data.user.I === true) {
        window.location.href = '/admin-app'
      }
    })
    .catch(err => console.log('error log is' + err))
}

export function validateLocalToken (token) {
  console.log('validating Local Token ...')
}

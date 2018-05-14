import firebase from 'firebase'

const dtabaseRefernces = {
  categories: 'Categories'
}

const adminAppdatabaseConfig = {
  apiKey: 'AIzaSyC7_ZlYpn-_T1RnCfSfTj_uoVpdm54Chtc',
  authDomain: 'albassera-44a86.firebaseapp.com',
  databaseURL: 'https://albassera-44a86.firebaseio.com',
  projectId: 'albassera-44a86',
  storageBucket: 'albassera-44a86.appspot.com',
  messagingSenderId: '729501309659'
}

firebase.initializeApp(adminAppdatabaseConfig)

export const adminAppdatabase = firebase.database()
export const categoriesData = adminAppdatabase.ref().child(dtabaseRefernces.categories)

export function getCategories () {
  categoriesData.on('value', snap => console.log(snap.val()))
  console.log('Automatic function fired')
}

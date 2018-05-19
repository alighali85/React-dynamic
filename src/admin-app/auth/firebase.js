import * as firebase from 'firebase'

const dtabaseRefernces = {
  categories: 'Categories'
}

export function getDatafromServer () {
  const adminAppdatabase = firebase.database()
  const categoriesData = adminAppdatabase.ref().child(dtabaseRefernces.categories)
  categoriesData.on('value', snap => console.log(snap.val()))
  console.log('Automatic function fired')
}

import firebase from 'firebase/app'

export const getDataFromDb = (name) => {
  const ADMIN_DB = firebase.database()
  const dataRef = ADMIN_DB.ref().child(name)
  var dataList = []
  dataRef.on('value', (snap) => {
    snap.forEach((cat) => {
      dataList.push({
        key: cat.key,
        ...cat.val()
      })
    })
  })
  return dataList
}

export function uploadFile (file, target = '') {

}

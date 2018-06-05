import firebase from 'firebase/app'

// function get ref argument and return ana rray of data from the server
export const getDataFromDb = (name) => {
  const ADMIN_DB = firebase.database()
  const dataRef = ADMIN_DB.ref().child(name)
  var dataList = []
  dataRef.on('value', (snap) => {
    snap.forEach((item) => {
      dataList.push({
        key: item.key,
        ...item.val()
      })
    })
  })
  return dataList
}

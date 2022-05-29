import admin from 'firebase-admin'

const keyString = process.env.FB_ADMIN_PRIVATE_KEY ?? '{"privateKey": ""}'

const { privateKey } = JSON.parse(keyString)

if (privateKey === '') {
  console.log('FIREBASE_PRIVATE_KEY is not set')
  if (process.env.NODE_ENV === 'development')
    throw new Error('FIREBASE_PRIVATE_KEY is not set')
  else {
    console.log('Firebase Private Key Error')
  }
}

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
      projectId: process.env.NEXT_PUBLIC_FB_CLIENT_PROJECT_ID,
    }),
    databaseURL: process.env.FB_ADMIN_RTDB_URL,
  })

const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()
const rdb = admin.database()

export const firebasePaths = {
  posts: 'posts',
}

const Server = { auth, db, storage, rdb }
export default Server
//To Add other Details:
//https://stackoverflow.com/questions/38389341/firebase-create-user-with-email-password-display-name-and-photo-url
//User specific Rules: https://stackoverflow.com/questions/57680416/firestore-rules-how-to-make-user-can-only-read-write-to-document-with-their-name
// Email Address = database-type

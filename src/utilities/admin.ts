import admin from 'firebase-admin'

if (!admin.apps.length) {

	let privateKey = process.env.FIREBASE_PRIVATE_KEY
	privateKey = privateKey.replace(/\\n/g, '\n')

  admin.initializeApp({

    credential: admin.credential.cert({

      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export const adminDb = admin.firestore()
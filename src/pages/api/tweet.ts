import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from 'firebase-admin';
import { adminDb } from '@/utilities/firebaseAdmin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	
	if (req.method === 'POST') {

		// データを追加
		const docRef = adminDb.collection("tweets").doc();

		const insertData = {
			createdAt: firestore.FieldValue.serverTimestamp(),
			displayName: req.body.displayName,
			text: req.body.text
		};

		docRef.set(insertData);
	}

	res.status(200);
}

export default handler
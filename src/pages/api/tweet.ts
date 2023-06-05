import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from 'firebase-admin';
import { adminDb } from '@/utilities/firebaseAdmin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	
	if (req.method === 'POST') {

		const displayName: string = req.body.displayName ?? ""
		const text: string = req.body.text ?? ""

		if (displayName === "" || displayName.length > 30) {
			return
		}

		if (text === "" || text.length > 100) {
			return
		}

		// データを追加
		const docRef = adminDb.collection("tweets").doc();

		const insertData = {
			createdAt: firestore.FieldValue.serverTimestamp(),
			displayName: displayName,
			text: text
		};

		docRef.set(insertData);
	}

	res.status(200);
}

export default handler
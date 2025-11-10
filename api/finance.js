const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
if (!admin.apps.length) { admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }); }
const db = admin.firestore();
export default async function handler(req,res){
  if(req.method==='GET'){ const snapshot=await db.collection('financeData').get(); res.status(200).json(snapshot.docs.map(d=>d.data())); }
  else if(req.method==='POST'){ const docRef=await db.collection('financeData').add(req.body); res.status(200).json({id:docRef.id}); }
  else res.status(405).json({error:'Method not allowed'});
}
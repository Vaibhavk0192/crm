// app/api/test/route.js
import clientPromise from '../../../../lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;  // This triggers the connection attempt
    const db = client.db();

    // Simple check to see if a test document can be fetched
    const testDoc = await db.collection('customers').findOne();

    console.log('✅ Database connected successfully');
    return new Response(JSON.stringify({ message: 'Database connected successfully' }), { status: 200 });
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
  }
}

import { verifyToken } from '@/lib/jwt';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}

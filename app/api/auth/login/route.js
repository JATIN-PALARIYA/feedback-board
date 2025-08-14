import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { signToken } from '../../../lib/auth';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const token = signToken({ id: user._id, email: user.email, username: user.username });

    return new Response(JSON.stringify({
      token,
      user: { id: user.id, email: user.email, username: user.username }
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

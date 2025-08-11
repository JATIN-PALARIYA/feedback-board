import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { signToken } from '../../../lib/auth';

export async function POST(req) {
    await dbConnect();

    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        const token = signToken({ id: user._id, name: user.name, email: user.email });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Set-Cookie': `user=${JSON.stringify({ name: user.name })}; Path=/; HttpOnly; SameSite=Strict`
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

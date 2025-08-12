import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
    await connectDB();

    try {
        const { email, password, name } = await req.json(); // Changed 'username' to 'name' to match frontend

        if (!email || !password || !name) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 });
        }

        const user = new User({
            username: name,        // Map 'name' from frontend to 'username' in database
            email: email,
            passwordHash: password // Map 'password' from frontend to 'passwordHash' in database
        });

        await user.save(); // Fixed: was 'newUser.save()' but variable was named 'user'

        return new Response(JSON.stringify({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }), { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
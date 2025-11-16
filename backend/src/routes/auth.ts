import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User';
import { hashPassword, verifyPassword } from '../lib/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt';
import { requireAuth } from '../middlewares/auth';

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6),
  dob: z.string().optional(),
});

router.post('/register', async (req, res) => {
  try {
    const body = registerSchema.parse(req.body);
    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) return res.status(409).json({ error: 'Email already in use' });
    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) return res.status(409).json({ error: 'Username already in use' });

    const passwordHash = await hashPassword(body.password);
    const user = await User.create({
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      passwordHash,
      dob: body.dob ? new Date(body.dob) : undefined,
    });

    return res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ error: 'Invalid input', details: err.issues });
    return res.status(500).json({ error: 'Server error' });
  }
});

const loginSchema = z.object({
  emailOrUsername: z.string().min(3),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await User.findOne({
      $or: [{ email: body.emailOrUsername }, { username: body.emailOrUsername }],
    });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = signAccessToken({ userId: user._id, username: user.username });
    const refreshToken = signRefreshToken({ userId: user._id });

    const cookieName = process.env.REFRESH_COOKIE_NAME || 'cm_refresh';
    const secure = (process.env.REFRESH_COOKIE_SECURE || 'false') === 'true';
    const sameSite = (process.env.REFRESH_COOKIE_SAMESITE as any) || 'lax';

    res.cookie(cookieName, refreshToken, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });

    return res.json({
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ error: 'Invalid input', details: err.issues });
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const cookieName = process.env.REFRESH_COOKIE_NAME || 'cm_refresh';
    const token = req.cookies?.[cookieName];
    if (!token) return res.status(401).json({ error: 'No refresh token' });
    
    // Verify the refresh token and get the payload
    const payload = verifyRefreshToken(token);
    
    // Sign a new access token with the user ID from the refresh token
    const accessToken = signAccessToken({ 
      userId: payload.userId,
      email: payload.email 
    });
    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  const cookieName = process.env.REFRESH_COOKIE_NAME || 'cm_refresh';
  res.clearCookie(cookieName, { path: '/auth' });
  return res.json({ ok: true });
});

router.get('/me', requireAuth, async (req: any, res) => {
  const userId = req.user?.userId;
  const user = await User.findById(userId).select('_id fullName username email');
  if (!user) return res.status(404).json({ error: 'Not found' });
  return res.json({
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  });
});

export default router;

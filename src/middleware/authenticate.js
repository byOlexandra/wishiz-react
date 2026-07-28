import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  try {
    const { sessionId, accessToken } = req.cookies;

    if (!sessionId || !accessToken) {
      throw createHttpError(401, 'Session ID or access token missing');
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw createHttpError(401, 'Invalid session ID format');
    }

    const session = await Session.findOne({
      _id: sessionId,
      accessToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(401, 'User associated with session not found');
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};
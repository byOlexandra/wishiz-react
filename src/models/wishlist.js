import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const wishlistSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventDate: {
      type: Date,
    },
    shareCode: {
      type: String,
      unique: true,
      default: () => nanoid(8),
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Wishlist = model('Wishlist', wishlistSchema);

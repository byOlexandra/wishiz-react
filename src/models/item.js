import { Schema, model } from 'mongoose';

const itemSchema = new Schema(
  {
    wishlistId: {
      type: Schema.Types.ObjectId,
      ref: 'Wishlist',
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    imageUrl: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    guestIdentifier: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Item = model('Item', itemSchema);

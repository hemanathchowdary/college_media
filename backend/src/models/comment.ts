// models/Post.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  image?: string;
  visibility: 'public' | 'friends' | 'private';
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 2000 
    },
    image: { 
      type: String 
    },
    visibility: { 
      type: String, 
      enum: ['public', 'friends', 'private'],
      default: 'friends'
    },
    likes: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      default: [] 
    }],
    comments: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Comment',
      default: [] 
    }],
    shares: { 
      type: Number, 
      default: 0 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Virtual for like count
PostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
PostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Index for better query performance
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ visibility: 1, createdAt: -1 });

export default mongoose.model<IPost>('Post', PostSchema);
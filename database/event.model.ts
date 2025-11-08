import { Schema, model, models, Document } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
      trim: true,
      lowercase: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'At least one tag is required',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add unique index on slug for fast lookups and uniqueness enforcement
EventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook to auto-generate slug from title and normalize date/time
 * Only regenerates slug when title is modified
 */
EventSchema.pre('save', function (next) {
  const event = this as IEvent;

  // Generate slug from title if title is new or modified
  if (event.isModified('title')) {
    event.slug = event.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }



  // Normalize date to ISO format if modified (YYYY-MM-DD)
  if (event.isModified('date')) {
    const parsedDate = new Date(event.date);
    if (isNaN(parsedDate.getTime())) {
      return next(new Error('Invalid date format. Please provide a valid date.'));
    }
    event.date = parsedDate.toISOString().split('T')[0];
  }

  // Normalize time format if modified (HH:MM 24-hour format)
  if (event.isModified('time')) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const trimmedTime = event.time.trim();
    
    if (!timeRegex.test(trimmedTime)) {
      return next(new Error('Invalid time format. Please use HH:MM format (24-hour).'));
    }
    
    event.time = trimmedTime;
  }

  next();
});

// Use existing model if available (prevents OverwriteModelError in development)
const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;

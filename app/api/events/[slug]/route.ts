import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';


interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches event details by slug
 */
export async function GET(
  request: NextRequest,
  context: RouteParams
): Promise<NextResponse> {
  try {
    // Extract and validate slug parameter
    const { slug } = await context.params;

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid slug parameter',
          message: 'Slug cannot be empty'
        },
        { status: 400 }
      );
    }

    // Sanitize slug to prevent injection attacks
    const sanitizedSlug = slug.trim().toLowerCase();
    
    // Validate slug format (alphanumeric, hyphens only)
    if (!/^[a-z0-9-]+$/.test(sanitizedSlug)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid slug format',
          message: 'Slug can only contain lowercase letters, numbers, and hyphens'
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug with lean() for better performance
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Event not found',
          message: `No event found with slug '${sanitizedSlug}'`
        },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        }
      }
    );
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching event by slug:', error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

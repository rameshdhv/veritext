import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { text, title } = await request.json();
    
    if (!text || text.trim().length < 50) {
      return NextResponse.json({ error: 'Text must be at least 50 characters long' }, { status: 400 });
    }

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/plagia_detection",
      headers: {
        authorization: `Bearer ${process.env.EDEN_AI_API_KEY || ''}`,
      },
      data: {
        providers: "winstonai",
        text: text,
        title: title || "Untitled Document",
        fallback_providers: "",
      },
    };

    const response = await axios.request(options);
    
    // Return the raw API response for client-side processing
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error in plagiarism detection:', error);
    
    if (error.response?.status === 402) {
      return NextResponse.json(
        { 
          error: 'API credits exhausted',
          status: 402 
        },
        { status: 402 }
      );
    } else if (error.response) {
      // Include detailed error info from the provider API
      return NextResponse.json(
        { 
          error: 'Eden AI API error', 
          details: error.response.data,
          status: error.response.status 
        },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to detect plagiarism', message: error.message },
      { status: 500 }
    );
  }
} 
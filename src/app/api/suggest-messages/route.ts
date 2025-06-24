import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    // Check if request has body
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    // Safely parse request body
    let body;
    try {
      const text = await request.text();
      if (!text) {
        // If no body, use defaults
        body = { tone: 'friendly', context: '', messageType: 'general' };
      } else {
        body = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { context = '', tone = 'friendly', messageType = 'general conversation' } = body;
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Use correct model name for free tier
    // Try gemini-1.5-flash first, fallback to gemini-1.5-pro if needed
    let model;
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } catch (modelError) {
      console.log('Flash model not available, trying Pro...');
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }
    
    // Simple and clear prompt for better results
    const prompt = `Generate 3 short message suggestions for ${messageType}.
Tone: ${tone}
${context ? `Context: ${context}` : ''}

Requirements:
- Each message should be under 100 characters
- Make them natural and conversational
- Return only the messages, one per line
- No numbering or formatting

Example output:
Hey! How's your day going?
Hope you're doing well today
What's new with you?`;

    console.log('Using prompt:', prompt); // Debug log

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Gemini response:', text); // Debug log
    
    // Parse response - clean and extract messages
    let suggestions: string[] = [];
    
    // Split by lines and clean up
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => {
        // Remove empty lines, numbers, bullets, and very short lines
        return line && 
               line.length > 10 && 
               !line.match(/^\d+\.?\s*$/) && 
               !line.match(/^[-*•]\s*$/) &&
               !line.toLowerCase().includes('example') &&
               !line.toLowerCase().includes('output') &&
               !line.toLowerCase().includes('message');
      })
      .map(line => {
        // Clean up common prefixes
        return line
          .replace(/^\d+\.\s*/, '') // Remove "1. "
          .replace(/^[-*•]\s*/, '') // Remove bullet points
          .replace(/^["'`]/, '') // Remove starting quotes
          .replace(/["'`]$/, '') // Remove ending quotes
          .trim();
      })
      .slice(0, 3); // Take only first 3

    suggestions = lines;

    // Fallback with tone-based default messages if parsing fails
    if (suggestions.length === 0) {
      const fallbackMessages = {
        friendly: [
          "Hey! How's your day going?",
          "Hope you're doing well!",
          "What's new with you?"
        ],
        professional: [
          "I hope this message finds you well.",
          "I wanted to reach out regarding our discussion.",
          "Thank you for your time and consideration."
        ],
        casual: [
          "What's up?",
          "How are things?",
          "Hope all is good!"
        ],
        formal: [
          "I trust you are well.",
          "I hope this message reaches you in good health.",
          "Please allow me to extend my greetings."
        ],
        humorous: [
          "Knock knock! Just checking in 😄",
          "Hope your day is better than my jokes!",
          "Sending good vibes your way! ✨"
        ]
      };
      
      suggestions = fallbackMessages[tone as keyof typeof fallbackMessages] || fallbackMessages.friendly;
    }

    // Ensure we have exactly 3 suggestions
    while (suggestions.length < 3) {
      suggestions.push(`Hope you're having a great ${tone} day!`);
    }

    return NextResponse.json({ 
      suggestions: suggestions.slice(0, 3),
      success: true
    });
    
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Handle specific API errors
    let errorMessage = 'Failed to generate message suggestions';
    let statusCode = 500;
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = 'Invalid API key';
      statusCode = 401;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'API quota exceeded';
      statusCode = 429;
    } else if (error.message?.includes('model')) {
      errorMessage = 'Model not available';
      statusCode = 400;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        success: false
      },
      { status: statusCode }
    );
  }
}

// Optional: GET method to test if API is working
export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Test the API connection
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello');
    
    return NextResponse.json({ 
      status: 'API is working',
      model: 'gemini-1.5-flash',
      success: true
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'API test failed',
        details: error.message,
        success: false
      },
      { status: 500 }
    );
  }
}
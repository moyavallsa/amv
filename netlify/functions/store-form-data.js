const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  // Log the received event for debugging
  console.log('Function invoked with body:', event.body);

  // Check environment variables
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server configuration error' })
    };
  }

  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    // Parse the request body
    const formData = JSON.parse(event.body);
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: 'Database error', 
          error: error.message,
          details: error
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form data stored successfully',
        data
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Server error', 
        error: error.message 
      })
    };
  }
}; 
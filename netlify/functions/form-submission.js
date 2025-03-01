const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the form data from Netlify
    const payload = JSON.parse(event.body).payload;
    const formData = payload.data;
    
    console.log('Form submission received:', formData);
    
    // Insert the form data into Supabase
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
      console.error('Error inserting into Supabase:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving to database', error: error.message })
      };
    }
    
    console.log('Successfully saved to Supabase:', data);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission saved to Supabase' })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message })
    };
  }
}; 
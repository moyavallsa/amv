const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  console.log('Debug Supabase function called');
  
  // Return environment variable status (without revealing actual values)
  const envStatus = {
    SUPABASE_URL: process.env.SUPABASE_URL ? 'Set' : 'Not set',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'Set' : 'Not set'
  };
  
  console.log('Environment status:', envStatus);
  
  // If environment variables are missing, return early
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Missing environment variables',
        envStatus
      })
    };
  }
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  try {
    // Test table existence
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);
    
    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: 'Supabase error',
          error: error.message,
          envStatus
        })
      };
    }
    
    // Try a test insertion
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from debug function'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([testData]);
    
    if (insertError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: 'Insert error',
          error: insertError.message,
          envStatus
        })
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Supabase connection and insertion successful',
        selectResult: data,
        insertResult: insertData,
        envStatus
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Function error',
        error: error.message,
        envStatus
      })
    };
  }
}; 
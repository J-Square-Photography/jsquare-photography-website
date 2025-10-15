const fetch = require('node-fetch');

const endpoint = 'https://jsquarephotography.com/cms/graphql';

// Test query to see what's available
const testQuery = `
  query TestAboutFields {
    pageBy(uri: "about-us") {
      id
      title
      aboutUs
    }
  }
`;

async function testGraphQL() {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: testQuery
      })
    });

    const data = await response.json();
    console.log('GraphQL Response:');
    console.log(JSON.stringify(data, null, 2));

    if (data.errors) {
      console.log('\nErrors found:');
      data.errors.forEach(error => {
        console.log('- ' + error.message);
      });
    }

    if (data.data?.pageBy?.aboutUs) {
      console.log('\nAbout Us field value:');
      console.log(typeof data.data.pageBy.aboutUs);
      console.log(data.data.pageBy.aboutUs);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGraphQL();
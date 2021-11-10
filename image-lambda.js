const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  // TODO implement
  if(event["Records"][0]["eventName"] !== 'ObjectCreated:Put') return;
  
  console.log("EVENT:", event);
  let images = [];
  
  const record = event.Records[0].s3;
  const bucket = record.bucket.name;
  // const key = record.object.key;

  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const params = {
    Bucket: bucket,
    Key: 'images.json'
  };
  
  try {
    images = await s3.getObject(params).promise();
    images = JSON.parse(images.Body.toString('utf-8'));
    console.log(images);
  } catch(err) {
    if(err.message !== "The specified key does not exist.") {
      console.log(err);
    } else {
      images = [];
    }
  }
  
  let object = event["Records"][0]["s3"]["object"];
  console.log(object);
  
  let data = {
    size: object.size,
    type: object.ContentType,
    name: object.key
  };
  
  images.push(data);
  
  const params2 = {
    Body: JSON.stringify(images),
    Bucket: bucket,
    Key: object.key,
    ContentType: "application/json"
  };
  
  s3.putObject(params2, function(err, data) {
    if(err) {
      console.log(err, err.stack);
    } else {
      console.log(data); 
    }
  });
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

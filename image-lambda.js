const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    // TODO implement

    console.log("EVENT:", event);
    
    const object = event.Records[0].s3.object;
    console.log(object);
    const bucket = "evanslab17bucket";
    const fileName = object.key;
    const fileSize = object.size;

    const params = {
        Bucket: bucket,
        Key: 'images.json'
    };
    
    const uploadedImage = {
      name: fileName,
      size: fileSize,
      type: 'image'
    }

    try {
        const images = await s3.getObject(params).promise();
        const imagesData = JSON.parse(images.Body.toString());
        console.log("current image file: ",images);
        
        imagesData.push(uploadedImage)
        let newImages = JSON.stringify(imagesData);

        const putImages = await s3.putObject({
          ...params,
          Body: newImages,
          ContentType: 'application/json'
        }).promise();
        console.log('JSON file updated for bucket:',putImages);
    } catch(err) {
        console.log(err);

        let newImages = JSON.stringify([uploadedImage])

        const putImages = await s3.putObject({
          ...params,
          Body: newImages,
          ContentType: 'application/json'
        }).promise();
        console.log('JSON file created for bucket:',putImages);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
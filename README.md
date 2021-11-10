# image-lambda

## Feature Tasks

* Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
* A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far
* When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  * Download a file called “images.json” from the S3 Bucket if it exists
  * The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present
  * Create a metadata object describing the image
    * Name, Size, Type, etc.
  * Append the data for this image to the array
    * Note: If the image is a duplicate name, update the object in the array, don’t just add it
  * Upload the images.json file back to the S3 bucket

## Issues

I have encountered a permissions error that is not letting me proceed. I'm certain that my code is adequate, I'm just unable to ascertain the correct setup for my permissions.

Update: I corrected the issue, and now it works as intended. I changed my code a bit, but the real issue was a permissions setting. Once I changed that setting, everything worked.

images.json url: https://evanslab17bucket.s3.us-west-2.amazonaws.com/images.json
note: you won't be able to acces it, but here's what the file holds:

```
[
  {
    "name": "test%2Fkey",
    "size": 1024,
    "type": "image"
  },
  {
    "name": "images/sampleimage.png",
    "size": 4106,
    "type": "image"
  }
]
```
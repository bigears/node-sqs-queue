var AWS = require('aws-sdk')
  , Promise = require('bluebird')
  ;

module.exports = function(region, name)
{
  var sqs = Promise.promisifyAll(
    new AWS.SQS({
      region: region
    })
  );

  var create = sqs.createQueueAsync({
    QueueName: name
  });

  return create
  .then(function (response)
  {
    return Promise.promisifyAll(
      new AWS.SQS({
        region: region,
        params: {QueueUrl: response.QueueUrl}
      })
    );
  });
};

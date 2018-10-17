## Google Cloud Function

This example shows how you can get data into an extension without configuring a server. It leverages Google Cloud's
Cloud Functions to run some nodejs code on a web request. While a bit contrived it shows a way to have very little
 infrastructure for your extension. We chose IFTTT as it's a quick way to get a service that can make a webhook
with little setup. You would probably want to use another service.

We're also leveraging the json store in this example. This allows you so store blobs of data under unique slugs.
When the data in json store is updated a pubsub with the data is also sent out.

Servers can also write to the various other state store, but those don't have automatic pubsub.

*note*
Google cloud functions have other triggers that might be useful too. Eg. use cron to check a service for data and push
it to the Muxy API.

### Setup

Update the config strings in cloud/index.js

Update the config strings in extension/panel.html

### Google Cloud

Setup your google cloud account and auth locally
https://cloud.google.com/functions/docs/quickstart

Deploy the google cloud function
```
cd ./cloud
gcloud functions deploy helloPOST --runtime nodejs6 --trigger-http
```

Get the url for your new endpoint
```
gcloud functions describe helloPOST
```

### IFTTT

https://ifttt.com/create

* Choose +this

* Select the soundcloud service

* Select the public like trigger

* Choose +that

* Select the webhooks servicee

* Select the Make a web request action

* Put the url for you endpoint in the url field

* Set the method to POST

* Set the content type to application/json

* Set the body to this:
```
{ "title": "{{Title}}", "image": "{{ImageUrl}}", "link": "{{TrackUrl}}", "embed": "<<<{{EmbedCode}}>>>" }
```

* Save.

### Finally!

* Open up the panel extension in your browser.

* Now go like a track on soundcloud

* Go back to your IFTTT applet and click check now to force an update to save some time

* Your google cloud function should run and the soundcloud track should show up in the panel.

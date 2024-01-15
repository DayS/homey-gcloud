# GCloud

Connect to Google Cloud Platform and use services to extends Homey's capabilities.


**Logs:**
- Push Homey's activity to Google Logs with a given severity and keep an eye on your home

**Storage:**
- Upload camera snapshot into a Google Storage's bucket to act as backup


You can use as many Google project as you like, by adding new devices.
Each device must be configured with a dedicated Google Cloud project id and a Google Cloud Service Account JSON content to grant access.


Preparing a Google Cloud project :
- Create a [new GCP project](https://console.cloud.google.com/projectcreate)
- In "Api and services", activate "Cloud Logging API" and "Cloud Storage API"
- Create a [bucket in Google Storage](https://console.cloud.google.com/storage/create-bucket)
- Create a [service account](https://console.cloud.google.com/iam-admin/serviceaccounts) to allow Homey to call GCP API
    - Give the name of your choice and add the following roles : `roles/logging.logWriter`, `roles/storage.objectUser`
    - In the detail of the created service account, go in "keys" tab and create a new JSON key. This is your Google Service Account JSON content to use in Homey's device settings.


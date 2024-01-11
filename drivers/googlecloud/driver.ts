import Homey from 'homey';
import { v4 as uuidv4 } from 'uuid';
import { GCloudApp } from '../../app';
import { Image } from 'homey/lib/FlowToken';

class GoogleCloudDriver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('GoogleCloudDriver has been initialized');

    this.homey.flow.getActionCard('gcloud_logs_pushLog').registerRunListener(async (args: any, state: any) => {
      const settings = args.device.getSettings();

      this.myApp().gcloud?.logs.pushLog(
        args.logger || settings.defaultLogger,
        args.severity,
        args.text
      ).catch(this.error)
    });

    this.homey.flow.getActionCard('gcloud_storage_uploadImage').registerRunListener(async (args: any, state: any) => {
      const settings = args.device.getSettings();
      const imageToken = args.droptoken as Image;

      this.myApp().gcloud?.storage.uploadFile(
        args.bucketName || settings.defaultBucketName,
        await imageToken.getStream(),
        args.destinationPath
      ).catch(this.error)
    });
  }

  /**
   * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
   */
  async onPairListDevices() {
    return [
      {
        name: 'GCloud project',
        data: {
          id: uuidv4(),
        },
      },
    ];
  }

  myApp(): GCloudApp {
    return this.homey.app as GCloudApp
  }

}

module.exports = GoogleCloudDriver;

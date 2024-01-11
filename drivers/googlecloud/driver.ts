import Homey from 'homey';
import { v4 as uuidv4 } from 'uuid';
import { GCloudApp } from '../../app';

class GoogleCloudDriver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('GoogleCloudDriver has been initialized');

    this.homey.flow.getActionCard('gcloud_logs_pushLog').registerRunListener(async (args: any, state: any) => {
      const settings = args.device.getSettings();

      this.myApp().logs.pushLog(
        args.logger || settings.defaultLogger,
        args.severity,
        args.text
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

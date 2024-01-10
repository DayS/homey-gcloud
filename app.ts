import Homey from 'homey';
import { GCloudLogs } from './lib/gcloud/logs';

export class GCloudApp extends Homey.App {

  logs = new GCloudLogs();

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('GCloudApp has been initialized');
  }

}

module.exports = GCloudApp;

import Homey from 'homey';
import { GCloudLogs } from './lib/gcloud/logs';
import { GCloudStorage } from './lib/gcloud/storage';

export class GCloudApp extends Homey.App {

  logs = new GCloudLogs();
  storage = new GCloudStorage();

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('GCloudApp has been initialized');
  }

}

module.exports = GCloudApp;

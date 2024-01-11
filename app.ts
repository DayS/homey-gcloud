import Homey from 'homey';
import { GCloudLogs } from './lib/gcloud/logs';
import { GCloudStorage } from './lib/gcloud/storage';
import { GCloud } from './lib/gcloud/gcloud';

export class GCloudApp extends Homey.App {

  gcloud?: GCloud;

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('GCloudApp has been initialized');
  }

  initGCloud(projectId: string, serviceAccount: object) {
    this.gcloud = new GCloud(projectId, serviceAccount);
  }

}

module.exports = GCloudApp;

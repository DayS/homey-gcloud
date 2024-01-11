import Homey from 'homey';
import { GCloudApp } from '../../app';

class GoogleCloudDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('GoogleCloudDevice has been initialized');

    this.setUnavailable('GCloud connection not configured yet').catch(this.error);

    this.initGCloud();
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({
    oldSettings,
    newSettings,
    changedKeys,
  }: {
    oldSettings: { [key: string]: boolean | string | number | undefined | null };
    newSettings: { [key: string]: boolean | string | number | undefined | null };
    changedKeys: string[];
  }): Promise<string | void> {
    this.log("GoogleCloudDevice settings where changed");

    this.initGCloud();
  }

  initGCloud() {
    this.log('Setting up GCloud');

    try {
      const settings = this.getSettings();
      this.myApp().logs.init(settings.projectId, settings.serviceAccount);
      
      this.setAvailable().catch(this.error);
    } catch (e) {
      this.setUnavailable('Invalid connection information').catch(this.error);
    }
  }

  myApp(): GCloudApp {
    return this.homey.app as GCloudApp
  }

}

module.exports = GoogleCloudDevice;

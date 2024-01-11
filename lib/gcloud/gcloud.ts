import { Logging, Severity, SeverityNames } from '@google-cloud/logging';
import { GCloudLogs } from './logs';
import { GCloudStorage } from './storage';

export class GCloud {

    logs: GCloudLogs
    storage: GCloudStorage

    constructor(projectId: string, serviceAccount: object) {
        this.logs = new GCloudLogs(projectId, serviceAccount)
        this.storage = new GCloudStorage(projectId, serviceAccount)
    }

}
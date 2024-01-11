import { Logging, Severity, SeverityNames } from '@google-cloud/logging';

export class GCloudLogs {

    logging!: Logging;

    init(projectId: string, serviceAccount: object) {
        this.logging = new Logging({
            projectId: projectId,
            credentials: serviceAccount
        });
    }

    async pushLog(logger: string, severity: string, text: string) {
        const log = this.logging.log(logger);

        await log.write(log.entry({
            severity: severity,
        }, text));
    }

}
import { Storage, File } from '@google-cloud/storage';
import { PassThrough } from 'stream';

export class GCloudStorage {

    storage: Storage;

    constructor(projectId: string, serviceAccount: object) {
        this.storage = new Storage({
            projectId: projectId,
            credentials: serviceAccount
        });
    }

    async uploadFile(bucketName: string, source: string | NodeJS.ReadableStream, destination: string): Promise<File> {
        const bucket = this.storage.bucket(bucketName);

        console.log(`Uploading file to ${bucketName}/${destination}`);

        if (source instanceof PassThrough) {
            return new Promise((resolve: any, reject: any) => {
                const file = bucket.file(destination);
                (source as PassThrough).pipe(file.createWriteStream())
                    .on('finish', () => {
                        console.log("Finished uploading");
                        resolve(file);
                    })
                    .on('error', (err) => {
                        reject(err);
                    });
            })
        } else {
            const [file, _] = await bucket.upload(source as string, {
                destination: destination
            });
            return file;
        }
    }

}
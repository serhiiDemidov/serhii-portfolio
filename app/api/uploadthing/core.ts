import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/lib/auth';

const f = createUploadthing();

async function requireAuthedMiddleware() {
    const session = await auth();
    if (!session) throw new UploadThingError('Unauthorized');
    return {};
}

export const ourFileRouter = {
    // Cover image uploader for projects
    projectImage: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1,
        },
    })
        .middleware(requireAuthedMiddleware)
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl };
        }),

    // Gallery uploader for projects — multiple images at once
    projectGallery: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 10,
        },
    })
        .middleware(requireAuthedMiddleware)
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

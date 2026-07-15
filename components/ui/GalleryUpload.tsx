'use client';

import { useState } from 'react';
import { generateUploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';

const UploadButton = generateUploadButton<OurFileRouter>();

interface GalleryUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
}

export default function GalleryUpload({ value, onChange }: GalleryUploadProps) {
    const [uploading, setUploading] = useState(false);

    function removeAt(index: number) {
        onChange(value.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-3">
            {value.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {value.map((url, index) => (
                        <div
                            key={url}
                            className="relative aspect-video rounded-lg overflow-hidden border border-white/10"
                        >
                            <Image src={url} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => removeAt(index)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-colors">
                {uploading ? (
                    <div className="text-gray-500 text-sm">Uploading...</div>
                ) : (
                    <>
                        <div className="text-gray-600 text-sm">
                            {value.length > 0 ? 'Add more images' : 'Drop images here or click to upload'}
                        </div>
                        <UploadButton
                            endpoint="projectGallery"
                            onUploadBegin={() => setUploading(true)}
                            onClientUploadComplete={(res) => {
                                setUploading(false);
                                if (res?.length) {
                                    onChange([...value, ...res.map((f) => f.url)]);
                                }
                            }}
                            onUploadError={(error) => {
                                setUploading(false);
                                console.error('Upload error:', error);
                                alert('Failed to upload images');
                            }}
                            appearance={{
                                button: 'bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition-colors ut-uploading:opacity-50',
                                allowedContent: 'hidden',
                            }}
                            content={{
                                button: 'Choose images',
                            }}
                        />
                        <div className="text-xs text-gray-600">PNG, JPG up to 4MB each, up to 10 images</div>
                    </>
                )}
            </div>
        </div>
    );
}

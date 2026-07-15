'use client';

import { useState } from 'react';
import { generateUploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';

const UploadButton = generateUploadButton<OurFileRouter>();

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    return (
        <div className="space-y-3">
            {/* Preview */}
            {value && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                    <Image src={value} alt="Project image" fill className="object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Upload button */}
            {!value && (
                <div className="border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-colors">
                    {uploading ? (
                        <div className="text-gray-500 text-sm">Uploading...</div>
                    ) : (
                        <>
                            <div className="text-gray-600 text-sm">
                                Drop image here or click to upload
                            </div>
                            <UploadButton
                                endpoint="projectImage"
                                onUploadBegin={() => setUploading(true)}
                                onClientUploadComplete={(res) => {
                                    setUploading(false);
                                    if (res?.[0]?.url) {
                                        onChange(res[0].url);
                                    }
                                }}
                                onUploadError={(error) => {
                                    setUploading(false);
                                    console.error('Upload error:', error);
                                    alert('Failed to upload image');
                                }}
                                appearance={{
                                    button: 'bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition-colors ut-uploading:opacity-50',
                                    allowedContent: 'hidden',
                                }}
                                content={{
                                    button: 'Choose image',
                                }}
                            />
                            <div className="text-xs text-gray-600">PNG, JPG up to 4MB</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

"use client"

import {useState, useEffect, useRef } from "react";
import { ImagePlus, Trash, Upload, X } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!previewUrl) return;
        
        setIsUploading(true);
        
        try {
            // Create FormData for direct upload to Cloudinary
            const response = await fetch(previewUrl);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'hitnfosd');
            
            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                console.log('Upload success:', result);
                onChange(result.secure_url);
                setPreviewUrl(null);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancelPreview = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

   if (!isMounted) {
        return null;
    }


    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
                
                {/* Preview area for new image */}
                {previewUrl && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border-2 border-dashed border-gray-300">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={handleCancelPreview} variant="destructive" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Preview"
                            src={previewUrl}
                        />
                        <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                            <Button
                                type="button"
                                onClick={handleUpload}
                                disabled={isUploading}
                                size="sm"
                                className="flex-1"
                            >
                                {isUploading ? (
                                    <>Uploading...</>
                                ) : (
                                    <>
                                        <Upload className="h-3 w-3 mr-1" />
                                        Upload
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            
            {!previewUrl && (
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={disabled}
                    />
                    <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Choose an Image
                    </Button>
                </div>
            )}
        </div>
    )
};

export default ImageUpload;
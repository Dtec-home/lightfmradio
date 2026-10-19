'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helpText?: string;
}

export function ImageUploadInput({
  value,
  onChange,
  label = 'Image (URL or Upload)',
  helpText = 'Paste an image URL or upload a file directly to the server.',
}: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">{label}</label>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="h-7 text-xs text-destructive hover:text-destructive"
          >
            <X className="mr-1 size-3.5" /> Remove image
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <LinkIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="https://example.com/image.jpg or /uploads/..."
            value={value}
            onChange={(e) => {
              setError(null);
              onChange(e.target.value);
            }}
            className="pl-9"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml"
          onChange={handleFileUpload}
          className="hidden"
          id="image-file-upload-input"
        />

        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="gap-2 shrink-0"
        >
          {uploading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="size-4" /> Upload File
            </>
          )}
        </Button>
      </div>

      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}

      {/* Live Preview */}
      {value && (
        <div className="relative mt-2 aspect-video max-w-sm overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setError('Unable to load preview for this image URL. Please verify the URL.')}
          />
        </div>
      )}
    </div>
  );
}

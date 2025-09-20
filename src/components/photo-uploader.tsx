"use client";

import React, { useState, useRef } from 'react';
import { useResume } from '@/contexts/resume-context';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { Upload } from 'lucide-react';

export function PhotoUploader() {
  const { resumeData, setResumeData, t } = useResume();
  const [photoUrl, setPhotoUrl] = useState(resumeData.profile.photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotoUrl = reader.result as string;
        setPhotoUrl(newPhotoUrl);
        setResumeData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            photoUrl: newPhotoUrl,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={photoUrl} alt={resumeData.profile.name} />
        <AvatarFallback>{resumeData.profile.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <Label htmlFor="photo-upload">{t('photo')}</Label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button type="button" variant="outline" size="sm" onClick={handleButtonClick}>
          <Upload className="mr-2 h-4 w-4" />
          {t('uploadPhoto')}
        </Button>
      </div>
    </div>
  );
}

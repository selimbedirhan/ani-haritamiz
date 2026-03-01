import { useState, useCallback, useEffect } from 'react';
import type { DrivePhoto } from '../types';

interface UseDrivePhotosResult {
    photos: DrivePhoto[];
    loading: boolean;
    error: string | null;
}

export function useDrivePhotos(folderId: string | null): UseDrivePhotosResult {
    const [photos, setPhotos] = useState<DrivePhoto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!folderId) {
            setPhotos([]);
            return;
        }

        const fetchPhotos = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

                if (!apiKey || apiKey === 'your_google_api_key') {
                    setError('Google API key not configured');
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&key=${apiKey}&fields=files(id,name,thumbnailLink,webContentLink)`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch photos from Google Drive');
                }

                const data = await response.json();

                const drivePhotos: DrivePhoto[] = data.files?.map((file: {
                    id: string;
                    name: string;
                    thumbnailLink?: string;
                    webContentLink?: string;
                }) => ({
                    id: file.id,
                    name: file.name,
                    thumbnailUrl: file.thumbnailLink || '',
                    fullUrl: file.webContentLink || `https://drive.google.com/uc?id=${file.id}`,
                })) || [];

                setPhotos(drivePhotos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [folderId]);

    return { photos, loading, error };
}

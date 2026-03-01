import { useState, useCallback, useEffect } from 'react';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import citiesData from '../data/cities.json';

const LOCAL_STORAGE_KEY = 'memory_map_cities';
const FIRESTORE_COLLECTION = 'cities';

export interface CityData {
    id: string;
    name: string;
    driveFolderId: string | null;
    hexColor: string;
    journalText: string;
    date: string;
    visited: boolean;
}

type CityUpdates = Partial<Pick<CityData, 'journalText' | 'date' | 'driveFolderId' | 'visited' | 'hexColor'>>;

// Load localStorage as fallback
function loadLocalOverrides(): Record<string, CityUpdates> {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
}

function mergeCities(base: CityData[], overrides: Record<string, CityUpdates>): CityData[] {
    return base.map(city => ({
        ...city,
        ...overrides[city.id],
    }));
}

export function useCities() {
    const [overrides, setOverrides] = useState<Record<string, CityUpdates>>(() => loadLocalOverrides());
    const [firestoreConnected, setFirestoreConnected] = useState(false);

    const cities = mergeCities(citiesData as CityData[], overrides);

    // Listen to Firestore changes in realtime
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, FIRESTORE_COLLECTION),
            (snapshot) => {
                const firestoreOverrides: Record<string, CityUpdates> = {};
                snapshot.forEach((doc) => {
                    const data = doc.data() as CityUpdates;
                    firestoreOverrides[doc.id] = data;
                });
                setOverrides(firestoreOverrides);
                setFirestoreConnected(true);
                // Sync to localStorage as cache
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreOverrides));
            },
            (error) => {
                console.warn('Firestore bağlantısı başarısız, localStorage kullanılıyor:', error.message);
                setFirestoreConnected(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const updateCity = useCallback(async (cityId: string, updates: CityUpdates) => {
        // Optimistic update
        setOverrides(prev => {
            const newOverrides = {
                ...prev,
                [cityId]: { ...prev[cityId], ...updates },
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newOverrides));
            return newOverrides;
        });

        // Write to Firestore
        try {
            await setDoc(doc(db, FIRESTORE_COLLECTION, cityId), updates, { merge: true });
        } catch (error) {
            console.warn('Firestore yazma başarısız, sadece localStorage\'a kaydedildi:', error);
        }
    }, []);

    return { cities, updateCity, firestoreConnected };
}

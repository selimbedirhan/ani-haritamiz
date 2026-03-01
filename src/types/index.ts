export interface City {
    id: string;
    name: string;
    driveFolderId: string | null;
    hexColor: string;
    journalText: string;
    date: string;
    visited: boolean;
    svgPath: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

export interface DrivePhoto {
    id: string;
    name: string;
    thumbnailUrl: string;
    fullUrl: string;
}

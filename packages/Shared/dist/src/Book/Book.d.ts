export declare const MAX_BOOK_TITLE_LENGTH = 256;
export declare const MAX_DESCRIPTION_LENGTH = 4096;
export interface IBook {
    id?: number;
    title: string;
    imageUrl: string;
    description?: string;
}

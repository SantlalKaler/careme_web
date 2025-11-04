export interface Email {
 id: string;
 type: 'Personal' | 'Work';
 address: string;
 isPrimary: boolean;
}

export interface Phone {
 id: string;
 type: 'Mobile' | 'Home' | 'Work';
 number: string;
 isPrimary: boolean;
}

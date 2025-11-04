export interface Address {
 id: string;
 type: 'Home' | 'Business' | 'Mailing';
 street: string;
 city: string;
 state: string;
 zipCode: string;
}


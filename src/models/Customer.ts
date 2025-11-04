import type { Address } from "./Address";
import type { Email } from "./Email";
import type { Phone } from "./Phone";

export interface Customer {
 id: string;
 firstName: string;
 lastName: string;
 dateOfBirth: string;
 maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
 secureId: string;
 addresses: Address[];
 phones: Phone[];
 emails: Email[];
}

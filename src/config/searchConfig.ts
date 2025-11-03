export type UIType = 'input' | 'date' | 'select';

export const searchConfig = {
  fields: {
    firstName: { uiType: 'input' as UIType, label: 'First Name', renderOrder: 1, name: 'firstName' },
    lastName:  { uiType: 'input' as UIType, label: 'Last Name',  renderOrder: 2, name: 'lastName' },
    dateOfBirth: { uiType: 'date' as UIType, label: 'Date of Birth', renderOrder: 3, name: 'dateOfBirth' },
    maritalStatus: { uiType: 'input' as UIType, label: 'Marital Status', renderOrder: 4, name: 'maritalStatus' },
  }
};

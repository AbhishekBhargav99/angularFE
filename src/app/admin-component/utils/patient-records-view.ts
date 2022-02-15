export interface PatientRecord{
    patientId: string;
    firstName: string;
    lastName: string;
    emergPhoneNumber: string;
    phoneNumber: string;
}

export class DisplayVal {
    keyName: string | number | boolean;
    displayName: string;
  
    constructor(key: string | number | boolean, value: string) {
      this.keyName = key;
      this.displayName = value;
    }
}

export class PatientRecordsView {
    patientId = '';
    firstName = '';
    lastName = '';
    // docType = '';
    emergPhoneNumber = '';
    phoneNumber = '';
  
    constructor(readonly patientRecord: PatientRecord) {
      this.patientId = patientRecord.patientId;
      this.firstName = patientRecord.firstName;
      this.lastName = patientRecord.lastName;
    //   this.docType = patientRecord.docType;
      this.emergPhoneNumber = patientRecord.emergPhoneNumber;
      this.phoneNumber = patientRecord.phoneNumber;
    }
}

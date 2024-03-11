export interface BusinessLeadDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
}

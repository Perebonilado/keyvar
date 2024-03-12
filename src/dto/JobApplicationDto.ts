export interface JobApplicationDto {
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience: string;
  resume: Blob;
  isWorkAuthorization: boolean;
}

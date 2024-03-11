import { ServicesEnum } from "src/infra/web/models/Services";

export interface BusinessEnquiryDto {
  service: ServicesEnum;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  enquiry: string;
}

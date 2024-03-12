import { JobApplicant } from "src/business/models/JobApplicant";
import CommandResponse from "./CommandResponse";

export default class CreateJobApplicantResponse extends CommandResponse {
    readonly jobApplicant: JobApplicant;
  
    constructor(jobApplicant: JobApplicant) {
      super(jobApplicant.events);
      this.jobApplicant = jobApplicant;
    }
  }
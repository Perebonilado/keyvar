import { Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { JobApplicantModel } from 'src/infra/db/models/JobApplicantModel';
import { JobApplicationModel } from 'src/infra/db/models/JobApplicationModel';
import { JobRoleModel } from 'src/infra/db/models/JobRoleModel';

@Injectable()
export class JobQueryService {
  public async findJobApplicantByEmail(email: string) {
    try {
      return await JobApplicantModel.findOne({ where: { email } });
    } catch (error) {
      throw new QueryError('Failed to find job applicant by email').InnerError(
        error,
      );
    }
  }

  public async findAllJobApplicationsByJobIdAndApplicantId(
    applicantId: string,
    jobId: string,
  ): Promise<JobApplicationModel[]> {
    try {
      return await JobApplicationModel.findAll({
        where: {
          jobApplicantId: applicantId,
          jobRoleId: jobId,
        },
      });
    } catch (error) {
      throw new QueryError(
        'Failed to find duplicate job application',
      ).InnerError(error);
    }
  }

  public async findAllActiveJobRoles() {
    try {
      return await JobRoleModel.findAll({ where: { isActive: true } });
    } catch (error) {
      throw new QueryError('Failed to job roles').InnerError(error);
    }
  }

  public async findJobRoleByTitle(title: string) {
    try {
      return await JobRoleModel.findOne({ where: { title } });
    } catch (error) {
      throw new QueryError('Failed to job role by title').InnerError(error);
    }
  }

  public async findJobRoleById(id: string) {
    try {
      return await JobRoleModel.findOne({ where: { id } });
    } catch (error) {
      throw new QueryError('Failed to job role by id').InnerError(error);
    }
  }
}

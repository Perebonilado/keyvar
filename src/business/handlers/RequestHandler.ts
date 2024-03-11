import CommandRequest from './request/CommandRequest';
import CommandResponse from './response/CommandResponse';

export interface RequestHandler<
  T extends CommandRequest,
  U extends CommandResponse,
> {
  handle(request: T): Promise<U>;
}

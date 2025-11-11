import { AuthToken, PostStatusRequest, Status } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class PostStatusService implements Service{
  private serverFacade = new ServerFacade()
    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
      ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        const req: PostStatusRequest = {token: authToken.token, status: newStatus.dto}
        await this.serverFacade.postStatus(req)
    
        // TODO: Call the server to post the status
      };
}
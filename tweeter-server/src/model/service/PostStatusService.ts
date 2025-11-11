import { StatusDto } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";

export class PostStatusService implements Service{
    public async postStatus (
        token: string,
        newStatus: StatusDto
      ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };
}
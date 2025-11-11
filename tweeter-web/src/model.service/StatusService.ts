import { Status, PagedStatusItemRequest, AuthToken } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";
import { Service } from "./Service";

export class StatusService implements Service {
    private serverFacade: ServerFacade = new ServerFacade();
    public async loadMoreFeedItems (
          authToken: AuthToken,
          userAlias: string,
          pageSize: number,
          lastStatus: Status | null
        ): Promise<[Status[], boolean]> {
          // TODO: Replace with the result of calling server
          const lastItem = lastStatus?.dto ?? null
          const req: PagedStatusItemRequest = {token: authToken.token, userAlias: userAlias, pageSize: pageSize, lastItem: lastItem}
          return await this.serverFacade.getMoreFeedItems(req)
        };
    
      public async loadMoreStoryItems (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastStatus: Status | null
      ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        const lastItem = lastStatus?.dto ?? null
        const req: PagedStatusItemRequest = {token: authToken.token, userAlias: userAlias, pageSize: pageSize, lastItem: lastItem}
        return await this.serverFacade.getMoreStoryItems(req)
      };
}
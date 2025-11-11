import { AuthToken, User, FakeData, PagedUserItemRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class FollowService implements Service {
    private serverFacade: ServerFacade = new ServerFacade();
    public async loadMoreFollowees (
          authToken: AuthToken,
          userAlias: string,
          pageSize: number,
          lastFollowee: User | null
        ): Promise<[User[], boolean]> {
          // TODO: Replace with the result of calling server
          const lastItem = lastFollowee?.dto ?? null
          const req: PagedUserItemRequest = {token: authToken.token, userAlias: userAlias, pageSize: pageSize, lastItem: lastItem}
          return await this.serverFacade.getMoreFollowees(req)
        };
    
      public async loadMoreFollowers (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastFollower: User | null
      ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        const lastItem = lastFollower?.dto ?? null
        const req: PagedUserItemRequest = {token: authToken.token, userAlias: userAlias, pageSize: pageSize, lastItem: lastItem}
        return await this.serverFacade.getMoreFollowers(req)
      };
}
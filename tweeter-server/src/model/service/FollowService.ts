import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";

export class FollowService implements Service {
    public async loadMoreFollowees (
          token: string,
          userAlias: string,
          pageSize: number,
          lastFollowee: UserDto | null
        ): Promise<[UserDto[], boolean]> {
          // TODO: Replace with the result of calling server
          //return FakeData.instance.getPageOfUsers(this.getDomainObject(lastFollowee), pageSize, userAlias);
          return this.getFakeData(lastFollowee, pageSize, userAlias)
        };
    
      public async loadMoreFollowers (
        token: string,
        userAlias: string,
        pageSize: number,
        lastFollower: UserDto | null
      ): Promise<[UserDto[], boolean]> {
        // TODO: Replace with the result of calling server
        return this.getFakeData(lastFollower, pageSize, userAlias);
      };

  private async getFakeData(lastFollower: UserDto | null, pageSize: number, userAlias: string): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastFollower), pageSize, userAlias);
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }


}
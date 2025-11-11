import { AuthToken, User, FakeData, GetIsFollowerStatusRequest, UserInfoRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class UserInfoService implements Service{
  private serverFacade = new ServerFacade()
    public async getIsFollowerStatus (
            authToken: AuthToken,
            user: User,
            selectedUser: User
          ): Promise<boolean> {
            const req: GetIsFollowerStatusRequest = {token: authToken.token, user: user.dto, selectedUser: selectedUser.dto}
            // TODO: Replace with the result of calling server
            return await this.serverFacade.getIsFollowerStatus(req)
          };

    public async getFolloweeCount (
        authToken: AuthToken,
        user: User
      ): Promise<number> {
          const req: UserInfoRequest = {token: authToken.token, user: user.dto}
          // TODO: Replace with the result of calling server
          return await this.serverFacade.getFolloweeCount(req)
      };

    public async getFollowerCount (
        authToken: AuthToken,
        user: User
      ): Promise<number> {
          const req: UserInfoRequest = {token: authToken.token, user: user.dto}
          // TODO: Replace with the result of calling server
          return await this.serverFacade.getFollowerCount(req)
      };

    public async follow (
        authToken: AuthToken,
        userToFollow: User
      ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        //await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        // const followerCount = await this.getFollowerCount(authToken, userToFollow);
        // const followeeCount = await this.getFolloweeCount(authToken, userToFollow);
    
        const req: UserInfoRequest = {token: authToken.token, user: userToFollow.dto}
        return await this.serverFacade.follow(req)
        // return [followerCount, followeeCount];
      };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User
      ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        // await new Promise((f) => setTimeout(f, 2000));
    
        // // TODO: Call the server
    
        // const followerCount = await this.getFollowerCount(authToken, userToUnfollow);
        // const followeeCount = await this.getFolloweeCount(authToken, userToUnfollow);
    
        // return [followerCount, followeeCount];
        const req: UserInfoRequest = {token: authToken.token, user: userToUnfollow.dto}
        return await this.serverFacade.unfollow(req)
    };
}
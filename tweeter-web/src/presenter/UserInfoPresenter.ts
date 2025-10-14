import { User, AuthToken } from "tweeter-shared";
import { UserInfoService } from "../model.service/UserInfoService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView{
    setIsLoading(isLoading: boolean): void;
    navigate:(path: string) => void;
    setIsFollower: (value: React.SetStateAction<boolean>) => void
    setFolloweeCount: (value: React.SetStateAction<number>) => void
    setFollowerCount: (value: React.SetStateAction<number>) => void
    setDisplayedUser: (user: User) => void

}

export class UserInfoPresenter extends Presenter<UserInfoView>{
    private userInfoService: UserInfoService;

    public constructor(view: UserInfoView) {
        super(view)
        this.userInfoService = new UserInfoService()
    }

    public switchToLoggedInUser (currentUser:User): void {
      this.view.setDisplayedUser(currentUser!);
      this.view.navigate(`${this.getBaseUrl()}/${currentUser!.alias}`);
    };

    protected getBaseUrl (): string {
      const segments = location.pathname.split("/@");
      return segments.length > 1 ? segments[0] : "/";
    };

    public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ) {
        await this.doFailureReportingOperation(async () => {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(
              await this.userInfoService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        }, "determine follower status")
      };
    
      
      public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        await this.doFailureReportingOperation(async () => {
          this.view.setFolloweeCount(await this.userInfoService.getFolloweeCount(authToken, displayedUser));
        }, "get followees count")
        
      };
    
    
      public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User
      ) {
        await this.doFailureReportingOperation(async () => {
          this.view.setFollowerCount(await this.userInfoService.getFollowerCount(authToken, displayedUser));
        }, "get followers count")
      };
    
      public async followDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
    
        var followingUserToast = "";
        await this.doFailureReportingOperation(async () => {
          this.view.setIsLoading(true);
          followingUserToast = this.view.displayInfoMessage(
            `Following ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.userInfoService.follow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(true);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        }, "follow user")

        this.view.deleteMessage(followingUserToast);
        this.view.setIsLoading(false);
      };
    
    
      public async unfollowDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
    
        var unfollowingUserToast = "";
        await this.doFailureReportingOperation(async () => {
          this.view.setIsLoading(true);
          unfollowingUserToast = this.view.displayInfoMessage(
            `Unfollowing ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.userInfoService.unfollow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(false);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        }, "unfollow user")
    
        this.view.deleteMessage(unfollowingUserToast);
        this.view.setIsLoading(false);
        
      };
    
}
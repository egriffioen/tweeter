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



      private async followAction (displayedUser:User, authToken:AuthToken, actionDescription:string, itemDescription: string, serviceAction:(authToken:AuthToken, displayedUser:User)=>Promise<[number, number]>, isFollowing:boolean): Promise<void> {
        var followingUserToast = "";
        await this.doFailureReportingOperation(async () => {
          this.view.setIsLoading(true);
          followingUserToast = this.view.displayInfoMessage(
            `${actionDescription} ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await serviceAction(authToken, displayedUser)
    
          this.view.setIsFollower(isFollowing);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        }, itemDescription,
        () => {
          this.view.deleteMessage(followingUserToast);
          this.view.setIsLoading(false);
        }
      )
      }
    

      public async followDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
        await this.followAction(displayedUser, authToken, "Following", "follow user", ()=>this.userInfoService.follow( authToken!, displayedUser! ), true)
        
      };
    
      public async unfollowDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
        await this.followAction(displayedUser, authToken, "Unfollowing", "unfollow user", ()=>this.userInfoService.unfollow( authToken!, displayedUser! ), false)
        
      };
    
}
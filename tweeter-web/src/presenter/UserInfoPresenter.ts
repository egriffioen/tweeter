import { User, AuthToken } from "tweeter-shared";
import { UserInfoService } from "../model.service/UserInfoService";

export interface UserInfoView {
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => string
    deleteMessage: (messageId: string) => void
    setIsLoading(isLoading: boolean): void;
    navigate:(path: string) => void;
    setIsFollower: (value: React.SetStateAction<boolean>) => void
    setFolloweeCount: (value: React.SetStateAction<number>) => void
    setFollowerCount: (value: React.SetStateAction<number>) => void
    setDisplayedUser: (user: User) => void

}

export class UserInfoPresenter {
    private view: UserInfoView;
    private userInfoService: UserInfoService;

    public constructor(view: UserInfoView) {
        this.view = view;
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
        try {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(
              await this.userInfoService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`,
          );
        }
      };
    
      
      public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFolloweeCount(await this.userInfoService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`,
          );
        }
      };
    
    
      public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFollowerCount(await this.userInfoService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`,
          );
        }
      };
    
      public async followDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
    
        var followingUserToast = "";
    
        try {
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
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`,
          );
        } finally {
          this.view.deleteMessage(followingUserToast);
          this.view.setIsLoading(false);
        }
      };
    
    
      public async unfollowDisplayedUser (
        displayedUser: User,
        authToken: AuthToken
      ): Promise<void> {
    
        var unfollowingUserToast = "";
    
        try {
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
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`,
          );
        } finally {
          this.view.deleteMessage(unfollowingUserToast);
          this.view.setIsLoading(false);
        }
      };
    
      

}
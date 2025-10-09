import { User, AuthToken, Status } from "tweeter-shared";
import { PostStatusService } from "../model.service/PostStatusService";

export interface PostStatusView {
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => string
    deleteMessage: (messageId: string) => void
    setIsLoading(isLoading: boolean): void;
    setPost: (value: React.SetStateAction<string>) => void
}

export class PostStatusPresenter {

    private view: PostStatusView;
    private postStatusService: PostStatusService;
    
    public constructor(view: PostStatusView) {
        this.view = view;
        this.postStatusService = new PostStatusService()
    }

    public async submitPost (post:string, currentUser:User, authToken:AuthToken) {
        var postingStatusToastId = "";
    
        try {
          this.view.setIsLoading(true);
          postingStatusToastId = this.view.displayInfoMessage(
            "Posting status...",
            0
          );
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.postStatusService.postStatus(authToken!, status);
    
          this.view.setPost("");
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`,
          );
        } finally {
          this.view.deleteMessage(postingStatusToastId);
          this.view.setIsLoading(false);
        }
      };

}
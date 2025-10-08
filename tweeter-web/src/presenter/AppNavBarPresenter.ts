import { AuthToken } from "tweeter-shared";

export interface AppNavBarView {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => string
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
    deleteMessage: (messageId: string) => void
    clearUserInfo: () => void
    navigate(path: string): void;
    getAuthToken(): AuthToken;
}

export class AppNavBarPresenter{
    private view: AppNavBarView;

    public constructor(view:AppNavBarView) {
        this.view = view
    }

    public async logOut() {
        const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
        try {
          const authToken = this.view.getAuthToken();
          await this.logout(authToken!);
    
          this.view.deleteMessage(loggingOutToastId);
          this.view.clearUserInfo();
          this.view.navigate("/login");
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`,
          );
        }
      };
    
      public async logout (authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
      };

}
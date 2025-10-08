import { AuthToken } from "tweeter-shared";
import { LogoutService } from "../model.service/LogoutService";

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
    private logoutService: LogoutService;

    public constructor(view:AppNavBarView) {
        this.view = view;
        this.logoutService = new LogoutService();
    }

    public async logOut() {
        const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
        try {
          const authToken = this.view.getAuthToken();
          await this.logoutService.logout(authToken!);
    
          this.view.deleteMessage(loggingOutToastId);
          this.view.clearUserInfo();
          this.view.navigate("/login");
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`,
          );
        }
      };

}
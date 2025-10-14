import { AuthToken } from "tweeter-shared";
import { LogoutService } from "../model.service/LogoutService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavBarView extends MessageView {
    clearUserInfo: () => void
    navigate(path: string): void;
    getAuthToken(): AuthToken;
}

export class AppNavBarPresenter extends Presenter<AppNavBarView>{
    private logoutService: LogoutService;

    public constructor(view:AppNavBarView) {
      super(view)
      this.logoutService = new LogoutService();
    }

    public async logOut() {
        const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
        await this.doFailureReportingOperation(async () => {
          const authToken = this.view.getAuthToken();
          await this.logoutService.logout(authToken!);
    
          this.view.deleteMessage(loggingOutToastId);
          this.view.clearUserInfo();
          this.view.navigate("/login");
        }, "log user out")
      };
}
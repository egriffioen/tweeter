import { AuthToken } from "tweeter-shared";
import { LogoutService } from "../model.service/LogoutService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavBarView extends MessageView {
    clearUserInfo: () => void
    navigate(path: string): void;
}

export class AppNavBarPresenter extends Presenter<AppNavBarView>{
    private _service: LogoutService;

    public constructor(view:AppNavBarView) {
      super(view)
      this._service = new LogoutService();
    }

    public get service(){
      return this._service;
    }

    public async logOut(authToken:AuthToken) {
        const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
        await this.doFailureReportingOperation(async () => {
          await this.service.logout(authToken!);
    
          this.view.deleteMessage(loggingOutToastId);
          this.view.clearUserInfo();
          this.view.navigate("/login");
        }, "log user out")
      };
}
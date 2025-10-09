import { User, AuthToken } from "tweeter-shared";
import { LoginService } from "../model.service/LoginService";

export interface LoginView {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
    navigate:(path: string) => void;
    setIsLoading(isLoading: boolean): void;
}

export class LoginPresenter {
    private _view: LoginView;
    private loginService: LoginService;

    public constructor(view: LoginView) {
        this._view = view;
        this.loginService = new LoginService()
    }
    
    public async doLogin (alias:string, password:string, rememberMe:boolean, originalUrl:string) {
      try {
        this._view.setIsLoading(true);

        const [user, authToken] = await this.loginService.login(alias, password);

        this._view.updateUserInfo(user, user, authToken, rememberMe);

        if (!!originalUrl) {
          this._view.navigate(originalUrl);
        } else {
          this._view.navigate(`/feed/${user.alias}`);
        }
      } catch (error) {
        this._view.displayErrorMessage(
          `Failed to log user in because of exception: ${error}`,
        );
      } finally {
        this._view.setIsLoading(false);
      }
    };
    

}
import { User, AuthToken } from "tweeter-shared";
import { LoginService } from "../model.service/LoginService";

export interface LoginView {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
    navigate:(path: string) => void;
    getAlias(): string;
    getPassword(): string;
    getRememberMe(): boolean;
    getOriginalUrl(): string|undefined;
    setIsLoading(isLoading: boolean): void;
}

export class LoginPresenter {
    private _view: LoginView;
    private loginService: LoginService;

    public constructor(view: LoginView) {
        this._view = view;
        this.loginService = new LoginService()
    }

    public checkSubmitButtonStatus(): boolean {
        return !this._view.getAlias() || !this._view.getPassword();
    };
    
    public async doLogin () {
        try {
          this._view.setIsLoading(true);
    
          const [user, authToken] = await this.loginService.login(this._view.getAlias(), this._view.getPassword());
    
          this._view.updateUserInfo(user, user, authToken, this._view.getRememberMe());
    
          if (!!this._view.getOriginalUrl()) {
            this._view.navigate(this._view.getOriginalUrl()!);
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
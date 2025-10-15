import { LoginService } from "../model.service/LoginService";
import { AuthenticatePresenter, AuthenticateView } from "./AuthenticatePresenter";

export class LoginPresenter extends AuthenticatePresenter<AuthenticateView>{
    protected serviceFactory(): LoginService {
      return new LoginService()
    }

    private loginService: LoginService;

    public constructor(view: AuthenticateView) {
        super(view);
        this.loginService = new LoginService();
    }
    
    public async doLogin (alias:string, password:string, rememberMe:boolean, originalUrl:string) {
      await this.authenticateUser(
        () => this.loginService.login(alias, password),
        (user) => {
          if (originalUrl) {
          this.view.navigate(originalUrl);
        } else {
          this.view.navigate(`/feed/${user.alias}`);
        }
        },
        rememberMe,
        "log in user"
      );
    };
    

}
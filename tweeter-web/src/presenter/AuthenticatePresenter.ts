import { User, AuthToken } from "tweeter-shared";
import { View, Presenter } from "./Presenter";
import { RegisterView } from "./RegisterPresenter";

export interface AuthenticateView extends View {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    navigate:(path: string) => void;
    setIsLoading(isLoading: boolean): void;
}

export abstract class AuthenticatePresenter<V extends AuthenticateView|RegisterView> extends Presenter<V> {

    public constructor(view: V) {
        super(view)
    }

    protected async authenticateUser(
        authOperation: () => Promise<[User, AuthToken]>,
        navigateOperation: (user:User) => void,
        rememberMe: boolean,
        itemDescription: string
    ) {
        await this.doFailureReportingOperation(async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await authOperation();

        this.view.updateUserInfo(user, user, authToken, rememberMe);

        navigateOperation(user)
      }, itemDescription,
      () => {
        this.view.setIsLoading(false);
      }
    ) 
    }

}
import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View{
    navigate:(path: string) => void;
    setDisplayedUser: (user: User) => void
}

export class UserNavigationPresenter extends Presenter<UserNavigationView>{
    private userService: UserService;

    public constructor(view: UserNavigationView) {
        super(view)
        this.userService = new UserService()
    }

    public async navigateToUser (authToken:AuthToken, displayedUser:User, featurePath:string, alias:string): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            const toUser = await this.userService.getUser(authToken!, alias);
    
            if (toUser) {
                if (!toUser.equals(displayedUser!)) {
                this.view.setDisplayedUser(toUser);
                this.view.navigate(`${featurePath}/${toUser.alias}`);
                }
            }
        }, "get user")
    };
    
}
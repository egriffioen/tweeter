import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface UserNavigationView {
    navigate:(path: string) => void;
    setDisplayedUser: (user: User) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
}

export class UserNavigationPresenter {
    private view: UserNavigationView;
    private userService: UserService;

    public constructor(view: UserNavigationView) {
        this.view = view;
        this.userService = new UserService()
    }

    public async navigateToUser (event: React.MouseEvent, authToken:AuthToken, displayedUser:User, featurePath:string): Promise<void> {
            event.preventDefault();
    
            try {
            const alias = this.extractAlias(event.target.toString());
    
            const toUser = await this.userService.getUser(authToken!, alias);
    
            if (toUser) {
                if (!toUser.equals(displayedUser!)) {
                this.view.setDisplayedUser(toUser);
                this.view.navigate(`${featurePath}/${toUser.alias}`);
                }
            }
            } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get user because of exception: ${error}`,
            );
            }
        };
    
    protected extractAlias = (value: string): string => {
            const index = value.indexOf("@");
            return value.substring(index);
    }
}
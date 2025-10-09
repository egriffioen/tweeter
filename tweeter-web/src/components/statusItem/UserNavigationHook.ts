import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { useNavigate } from "react-router-dom";
import { UserNavigationView, UserNavigationPresenter } from "../../presenter/UserNavigationPresenter";



export const useUserNavigation = (featurePath: string) => {
    const { displayErrorMessage } = useMessageActions();
    const { displayedUser, authToken } = useUserInfo();
    const { setDisplayedUser } = useUserInfoActions();
    const navigate = useNavigate();

    const listener: UserNavigationView = {
        navigate: navigate,
        setDisplayedUser: setDisplayedUser,
        displayErrorMessage: displayErrorMessage,
    }
      const presenter = new UserNavigationPresenter(listener)

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        const alias = extractAlias(event.target.toString());
        await presenter.navigateToUser(authToken!, displayedUser!, featurePath, alias)
    };

    const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };

    return {navigateToUser}
}
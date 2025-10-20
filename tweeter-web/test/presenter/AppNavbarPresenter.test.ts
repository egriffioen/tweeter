import { AuthToken } from "tweeter-shared";
import {AppNavBarPresenter, AppNavBarView} from "../../src/presenter/AppNavBarPresenter"
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import { LogoutService } from "../../src/model.service/LogoutService";
describe("AppNavbarPresenter", ()=>{
    let mockAppNavbarPresenterView: AppNavBarView;
    let appNavbarPresenter: AppNavBarPresenter;
    let mockService: LogoutService;

    const authToken = new AuthToken("abc123", Date.now())

    beforeEach(()=> {
        mockAppNavbarPresenterView = mock<AppNavBarView>()
        const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);
        when(mockAppNavbarPresenterView.displayInfoMessage(anything(), 0)).thenReturn("messageId123")

        const appNavbarPresenterSpy = spy(new AppNavBarPresenter(mockAppNavbarPresenterViewInstance));
        appNavbarPresenter = instance(appNavbarPresenterSpy)

        mockService = mock<LogoutService>();
        when(appNavbarPresenterSpy.service).thenReturn(instance(mockService))
    })
    it("tells the view to display a logging out message.", async ()=>{
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)).once();
    })

    it("calls logout on the user service with the correct auth token.", async () => {
        await appNavbarPresenter.logOut(authToken);
        //verify(mockService.logout(authToken)).once();

        let [capturedAuthToken] = capture(mockService.logout).last();
        expect(capturedAuthToken).toEqual(authToken);

    })

    it("tells the view to clear the info message that was displayed previously, clear the user info, and navigate to the login page when successful.", async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarPresenterView.deleteMessage("messageId123")).once();
        verify(mockAppNavbarPresenterView.clearUserInfo()).once();
        verify(mockAppNavbarPresenterView.navigate("/login")).once();
        verify(mockAppNavbarPresenterView.displayErrorMessage("Failed to log user out because of exception: Error: An error occurred")).never();
    })

    it("tells the view to display an error message and does not tell it to clear the info message, clear the user info or navigate to the login page when unsuccessful.", async ()=>{
        let error = new Error("An error occurred");
        when(mockService.logout(anything())).thenThrow(error);
        
        await appNavbarPresenter.logOut(authToken);

        verify(mockAppNavbarPresenterView.displayErrorMessage("Failed to log user out because of exception: Error: An error occurred")).once();
        verify(mockAppNavbarPresenterView.deleteMessage(anything())).never();
        verify(mockAppNavbarPresenterView.clearUserInfo()).never();
        verify(mockAppNavbarPresenterView.navigate("/login")).never();
    })
})
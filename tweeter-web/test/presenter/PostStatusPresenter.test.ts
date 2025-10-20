import { AuthToken } from "tweeter-shared";
import {User, Status} from "../../../tweeter-shared"
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter"
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import { PostStatusService } from "../../src/model.service/PostStatusService";
describe("AppNavbarPresenter", ()=>{
    let mockPostStatusPresenterView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockService: PostStatusService;

    const authToken = new AuthToken("abc123", Date.now())
    const user = new User("Ella", "Griffioen", "egriff", "image")
    const status = new Status("My post", user, Date.now())

    beforeEach(()=> {
        mockPostStatusPresenterView = mock<PostStatusView>()
        const mockPostStatusPresenterViewInstance = instance(mockPostStatusPresenterView);
        when(mockPostStatusPresenterView.displayInfoMessage(anything(), 0)).thenReturn("messageId123")

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusPresenterViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy)

        mockService = mock<PostStatusService>();
        when(postStatusPresenterSpy.service).thenReturn(instance(mockService))
    })
    it("tells the view to display a posting status message.", async ()=>{
        await postStatusPresenter.submitPost(anything(), user, authToken);
        verify(mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0)).once();
    })

    it("calls postStatus on the post status service with the correct status string and auth token.", async () => {
        await postStatusPresenter.submitPost("My post", user, authToken);

        let [capturedAuthToken, capturedStatus] = capture(mockService.postStatus).last();
        expect(capturedAuthToken).toEqual(authToken);
        expect(capturedStatus.post).toEqual("My post");
    })

    it("tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message when successful.", async () => {
        await postStatusPresenter.submitPost("My post", user, authToken);

        verify(mockPostStatusPresenterView.deleteMessage("messageId123")).once();
        verify(mockPostStatusPresenterView.setPost("")).once();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).once();
        verify(mockPostStatusPresenterView.displayErrorMessage("Failed to post the status because of exception: Error: An error occurred")).never();
    })

    it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when unsuccessful.", async ()=>{
        let error = new Error("An error occurred");
        when(mockService.postStatus(anything(), anything())).thenThrow(error);
        
        await postStatusPresenter.submitPost("My post", user, authToken);

        verify(mockPostStatusPresenterView.deleteMessage(anything())).once(); //clear the info message
        verify(mockPostStatusPresenterView.displayErrorMessage("Failed to post the status because of exception: Error: An error occurred")).once(); //display error
        
        verify(mockPostStatusPresenterView.setPost("")).never(); //don't clear the post
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).never(); //don't display "Status posted!"
        
    })
})
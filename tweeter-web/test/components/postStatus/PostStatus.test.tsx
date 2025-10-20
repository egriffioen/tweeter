import PostStatus from "../../../../tweeter-web/src/components/postStatus/PostStatus"
import {render, screen} from "@testing-library/react"
import {userEvent} from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter"
import {instance, mock, verify} from "@typestrong/ts-mockito"
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";
import { AuthToken, User } from "tweeter-shared";


library.add(fab)

jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));      

describe("PostStatus Component", () => {

    let mockUser: User
    let mockAuthToken: AuthToken
    let mockUserInstance: User;
    let mockAuthTokenInstance: AuthToken;

    beforeAll(()=> {
        mockUser = mock<User>()
        mockUserInstance = instance(mockUser);

        mockAuthToken = mock<AuthToken>()
        mockAuthTokenInstance = instance(mockAuthToken);

        (useUserInfo as jest.Mock).mockReturnValue({
        currentUser: mockUserInstance,
        authToken: mockAuthTokenInstance,
        });      
    })

    it("starts with the post status and clear buttons disabled", () => {
        const {postStatusButton, clearButton} = renderPostStatusAndGetElement();
        expectButtonsDisabled(postStatusButton, clearButton)
    })

    it("enables post status and clear button when there is text", async () => {
        const {user, postStatusButton, clearButton, textField} = renderPostStatusAndGetElement();

        await typeTextAndExpectButtonsEnabled(user, textField, "a", postStatusButton, clearButton)
    })

    it("disables the post status and clear buttons when the text field is cleared", async () => {
        const {user, postStatusButton, clearButton, textField} = renderPostStatusAndGetElement();

        await typeTextAndExpectButtonsEnabled(user, textField, "a", postStatusButton, clearButton)

        await user.click(clearButton)
        expectButtonsDisabled(postStatusButton, clearButton)

        await typeTextAndExpectButtonsEnabled(user, textField, "a", postStatusButton, clearButton)

        await user.clear(textField)
        expectButtonsDisabled(postStatusButton, clearButton)

    })

    it("calls the presenter's post status method with the correct parameters when the post status button is pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const postText = "a"
        const {user, postStatusButton, clearButton, textField} = renderPostStatusAndGetElement(mockPresenterInstance);
        await user.type(textField, postText)
        await user.click(postStatusButton)
        verify(mockPresenter.submitPost(postText, mockUserInstance, mockAuthTokenInstance)).once();

    })
})

function renderPostStatus(presenter?:PostStatusPresenter) {
    return render(
        !!presenter ? (<PostStatus presenter = {presenter} />) : (<PostStatus />)
    )
}

function renderPostStatusAndGetElement(presenter?:PostStatusPresenter) {
    const user = userEvent.setup()
    renderPostStatus(presenter);
    const postStatusButton = screen.getByRole("button", { name: /Post Status/i})
    const clearButton = screen.getByRole("button", { name: /Clear/i})
    const textField = screen.getByLabelText("postStatusText")

    return {user, postStatusButton, clearButton, textField}
}

async function typeTextAndExpectButtonsEnabled(user: ReturnType<typeof userEvent.setup>, textField: HTMLElement, text: string, postStatusButton: HTMLElement, clearButton: HTMLElement) {
  await user.type(textField, text);
  expect(postStatusButton).toBeEnabled();
  expect(clearButton).toBeEnabled();
}

function expectButtonsDisabled(postStatusButton: HTMLElement, clearButton: HTMLElement) {
  expect(postStatusButton).toBeDisabled();
  expect(clearButton).toBeDisabled();
}

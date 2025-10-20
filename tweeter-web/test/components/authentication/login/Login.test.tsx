import { MemoryRouter } from "react-router-dom"
import Login from "../../../../../tweeter-web/src/components/authentication/login/Login"
import {render, screen} from "@testing-library/react"
import {userEvent} from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenter/LoginPresenter"
import {instance, mock, verify} from "@typestrong/ts-mockito"


library.add(fab)

describe("Login Component", () => {
    it("starts with the sign in button disabled", () => {
        const {signInButton} = renderLoginAndGetElement("/");
        expect(signInButton).toBeDisabled();
    })

    it("enables the sign in button if both alias and password fields have text", async () => {
        const {signInButton, user, aliasField, passwordField} = renderLoginAndGetElement("/");

        await typeFieldsAndExpectButtonsEnabled(user, aliasField, "a", passwordField, "b", signInButton)
    })

    it("disables the sign in button if either the alias or the password field is cleared", async () => {
        const {signInButton, user, aliasField, passwordField} = renderLoginAndGetElement("/");

        await typeFieldsAndExpectButtonsEnabled(user, aliasField, "a", passwordField, "b", signInButton)

        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, "a");
        expect(signInButton).toBeEnabled();

        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();
    })

    it("calls the presenter's login method with the correct parameters when the sign in button is pressed", async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const originalUrl = "http://somewhere.com"
        const alias = "@alias"
        const password = "myPassword"
        const {signInButton, user, aliasField, passwordField, rememberMe} = renderLoginAndGetElement(originalUrl, mockPresenterInstance);
        await user.type(aliasField, alias)
        await user.type(passwordField, password)
        await user.click(rememberMe);

        await user.click(signInButton);
        verify(mockPresenter.doLogin(alias, password, true, originalUrl)).once();

    })
})

function renderLogin(originalUrl:string, presenter?:LoginPresenter) {
    return render(
        <MemoryRouter>
            {!!presenter ? (<Login originalUrl={originalUrl} presenter = {presenter} />) : (<Login originalUrl={originalUrl} />)}
        </MemoryRouter>
    )
}

function renderLoginAndGetElement(originalUrl:string, presenter?:LoginPresenter) {
    const user = userEvent.setup()
    renderLogin(originalUrl, presenter);
    const signInButton = screen.getByRole("button", { name: /Sign in/i})
    const aliasField = screen.getByLabelText("alias")
    const passwordField = screen.getByLabelText("password")
    const rememberMe = screen.getByRole("checkbox", { name: /remember me/i });

    return {user, signInButton, aliasField, passwordField, rememberMe}
}

async function typeFieldsAndExpectButtonsEnabled(user: ReturnType<typeof userEvent.setup>, aliasField: HTMLElement, alias: string, passwordField: HTMLElement, password:string, signInButton: HTMLElement) {
  await user.type(aliasField, alias);
  await user.type(passwordField, password);
  expect(signInButton).toBeEnabled();
}
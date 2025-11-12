import { User, AuthToken, LoginRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class LoginService implements Service{
  private serverFacade = new ServerFacade()
    public async login (
        alias: string,
        password: string
      ): Promise<[User, AuthToken]> {
        const req: LoginRequest = {userAlias: alias, password: password}
        // TODO: Replace with the result of calling the server
        return await this.serverFacade.login(req)
    };
}
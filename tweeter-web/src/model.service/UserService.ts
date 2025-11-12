import { AuthToken, User, FakeData, GetUserRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class UserService implements Service{
    private serverFacade = new ServerFacade()
    public async getUser (
            authToken: AuthToken,
            alias: string
        ): Promise<User | null> {
            // TODO: Replace with the result of calling server
            //return FakeData.instance.findUserByAlias(alias);
            const req: GetUserRequest = {token: authToken.token, alias: alias}
            return await this.serverFacade.getUser(req)
        };
}
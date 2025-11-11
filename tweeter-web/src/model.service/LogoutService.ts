import { AuthToken, LogoutRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class LogoutService implements Service{
    private serverFacade = new ServerFacade();
    public async logout (authToken: AuthToken): Promise<void> {
        
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        const req: LogoutRequest = {token: authToken.token}
        return await this.serverFacade.logout(req)
    };
}
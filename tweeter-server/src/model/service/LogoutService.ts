import { AuthToken } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";

export class LogoutService implements Service{
    public async logout (authToken: string): Promise<void> {
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
            await new Promise((res) => setTimeout(res, 1000));
    };
}
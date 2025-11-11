import { User, AuthToken, FakeData, UserDto } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";

export class LoginService implements Service{
    public async login (
        alias: string,
        password: string
      ): Promise<[UserDto, AuthToken]> {
        // TODO: Replace with the result of calling the server
        const user = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user.dto, FakeData.instance.authToken];
    };
}
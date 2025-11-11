import { Buffer } from "buffer";
import { User, AuthToken, FakeData, UserDto } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";
import { AuthTokenDto } from "tweeter-shared/dist/model/dto/AuthTokenDto";

export class RegisterService implements Service{
    public async register (
            firstName: string,
            lastName: string,
            alias: string,
            password: string,
            userImageBytes: string,
            imageFileExtension: string
          ): Promise<[UserDto, AuthTokenDto]> {
            // Not neded now, but will be needed when you make the request to the server in milestone 3
            // TODO: Replace with the result of calling the server
            const user = FakeData.instance.firstUser;
        
            if (user === null) {
              throw new Error("Invalid registration");
            }
        
            return [user.dto, FakeData.instance.authToken.dto];
          };
}
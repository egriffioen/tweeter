import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";
import { Service } from "../../../../tweeter-web/src/model.service/Service";

export class UserService implements Service{
    public async getUser (
            token: string,
            alias: string
        ): Promise<UserDto | null> {
            const user = FakeData.instance.findUserByAlias(alias);

            if (!user) {
                console.log(`User not found for alias: ${alias}`);
                return null;
            }

            return user.dto;
        };
}
import { Buffer } from "buffer";
import { User, AuthToken, FakeData, RegisterRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../net/ServerFacade";

export class RegisterService implements Service{
  private serverFacade = new ServerFacade()
    public async register (
            firstName: string,
            lastName: string,
            alias: string,
            password: string,
            userImageBytes: Uint8Array,
            imageFileExtension: string
          ): Promise<[User, AuthToken]> {
            // Not neded now, but will be needed when you make the request to the server in milestone 3
            const imageStringBase64: string =
              Buffer.from(userImageBytes).toString("base64");
            const req: RegisterRequest = {firstName: firstName, lastName: lastName, userAlias: alias, password: password, userImageBytes: imageStringBase64, imageFileExtension: imageFileExtension}
        
            return await this.serverFacade.register(req)
          };
}
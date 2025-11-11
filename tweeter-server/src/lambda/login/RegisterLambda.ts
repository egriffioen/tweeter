import { RegisterService } from "../../model/service/RegisterService";
import { RegisterRequest, LoginResponse } from "tweeter-shared"

export const handler = async (request: RegisterRequest): Promise<LoginResponse> => {
    const registerService = new RegisterService();
    const [userDto, authToken] = await registerService.register(request.firstName, request.lastName, request.userAlias, request.password, request.userImageBytes, request.imageFileExtension)
    return {
        success: true,
        message: null,
        user: userDto,
        authToken: authToken
    }
}
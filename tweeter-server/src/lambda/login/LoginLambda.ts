import { LoginService } from "../../model/service/LoginService";
import { LoginRequest, LoginResponse } from "tweeter-shared"

export const handler = async (request: LoginRequest): Promise<LoginResponse> => {
    const loginService = new LoginService();
    const [userDto, authToken] = await loginService.login(request.userAlias, request.password)
    return {
        success: true,
        message: null,
        user: userDto,
        authToken: authToken
    }
}
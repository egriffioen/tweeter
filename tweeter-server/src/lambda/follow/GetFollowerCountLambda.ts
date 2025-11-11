import { GetCountResponse, UserInfoRequest } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";

export const handler = async (request: UserInfoRequest): Promise<GetCountResponse> => {
    const userInfoService = new UserInfoService();
    const followerCount = await userInfoService.getFollowerCount(request.token, request.user)
    return {
        success: true,
        message: null,
        count: followerCount
    }
}
import { GetCountResponse, GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, UpdateFollowResponse, UserInfoRequest } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";

export const handler = async (request: UserInfoRequest): Promise<UpdateFollowResponse> => {
    const userInfoService = new UserInfoService();
    const [followerCount, followeeCount] = await userInfoService.follow(request.token, request.user)
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    }
}
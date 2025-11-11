import { PostStatusService } from "../../model/service/PostStatusService";
import { PostStatusRequest, TweeterResponse } from "tweeter-shared"

export const handler = async (request: PostStatusRequest): Promise<TweeterResponse> => {
    const postStatusService = new PostStatusService();
    await postStatusService.postStatus(request.token, request.status)
    return {
        success: true,
        message: null,
    }
}
import { User } from "tweeter-shared";
import { AuthToken } from "tweeter-shared/dist/model/domain/AuthToken";
import { Status } from "tweeter-shared/dist/model/domain/Status"
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface StatusItemView extends View{
    addItems: (items: Status[]) => void
}

export abstract class StatusItemPresenter extends Presenter<StatusItemView>{
    private _hasMoreItems = true;
    private _lastItem: Status|null = null;
    private userService: UserService;

    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }
    

    protected constructor(view: StatusItemView) {
        super(view)
        this.userService = new UserService();
    }

    protected get lastItem () {
        return this._lastItem
    }

    protected set lastItem (value:Status|null) {
        this._lastItem = value
    }

    public get hasMoreItems () {
        return this._hasMoreItems
    }

    protected set hasMoreItems (value:boolean) {
        this._hasMoreItems = value
    }

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        return this.userService.getUser(authToken, alias)
    };

    public abstract loadMoreItems (authToken:AuthToken, userAlias:string) : void;
}
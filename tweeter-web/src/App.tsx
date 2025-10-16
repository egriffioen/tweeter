import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/ItemScroller";
import { useUserInfo } from "./components/userInfo/UserInfoHooks";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { Status, User } from "tweeter-shared";
import { PagedItemView } from "./presenter/PagedItemPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  const { displayedUser } = useUserInfo();

  //const renderStatus(status:Status)

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
        <Route path="feed/:displayedUser" element={<ItemScroller key={`feed-${displayedUser!.alias}`} featurePath="/feed" presenterFactory={(view: PagedItemView<Status>) => new FeedPresenter(view)} renderItem={(status: Status) => <StatusItem status={status} featurePath="/feed" />}/>} />
        <Route path="story/:displayedUser" element={<ItemScroller key={`story-${displayedUser!.alias}`} featurePath="/story" presenterFactory={(view: PagedItemView<Status>) => new StoryPresenter(view)} renderItem={(status: Status) => <StatusItem status={status} featurePath="/story" />}/>} />
        <Route path="followees/:displayedUser" element={<ItemScroller key={`followees-${displayedUser!.alias}`} featurePath="/followees" presenterFactory={(view:PagedItemView<User>) => new FolloweePresenter(view)} renderItem={(user: User) => <UserItem user={user} featurePath="/followees" />}/>} />
        <Route path="followers/:displayedUser" element={<ItemScroller key={`followers-${displayedUser!.alias}`} featurePath="/followers" presenterFactory={(view:PagedItemView<User>) => new FollowerPresenter(view)} renderItem={(user: User) => <UserItem user={user} featurePath="/followers" />}/>} />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={`/feed/${displayedUser!.alias}`} />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;

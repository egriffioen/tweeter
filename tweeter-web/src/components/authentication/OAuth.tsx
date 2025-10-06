import OAuthButton from "./OAuthButton";

const OAuth = () => {
    return (
        <div className="text-center mb-3">
            <OAuthButton buttonType="Google" />

            <OAuthButton buttonType="Facebook" />

            <OAuthButton buttonType="Twitter" />

            <OAuthButton buttonType="LinkedIn" />

            <OAuthButton buttonType="Github" />

          </div>
    );
};

export default OAuth;
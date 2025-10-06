import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useMessageActions } from "../toaster/MessageHooks";

interface Props {
    buttonType: string;
}

const OAuthButton = (props: Props) => {
    const iconName = props.buttonType.toLowerCase() as IconName
    const { displayInfoMessage } = useMessageActions();
    const displayInfoMessageWithDarkBackground = (message: string): void => {
        displayInfoMessage(
            message,
            3000,
            "text-white bg-primary"
        );
    };
    
    return (
        <button
              type="button"
              className="btn btn-link btn-floating mx-1"
              onClick={() =>
                displayInfoMessageWithDarkBackground(
                  `${props.buttonType} registration is not implemented.`
                )
              }
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`${props.buttonType.toLowerCase()}Tooltip`}>{props.buttonType}</Tooltip>}
              >
                <FontAwesomeIcon icon={["fab", iconName]} />
              </OverlayTrigger>
        </button>
    );
};

export default OAuthButton;
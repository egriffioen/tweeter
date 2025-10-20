import { useState } from "react";

interface Props {
    alias: string;
    setAlias: (alias: string) => void;
    password: string;
    setPassword: (password: string) => void;

    doSignIn: () => void;
}

const AuthenticationFields = (props: Props) => {
    const checkSubmitButtonStatus = (): boolean => {
        return !props.alias || !props.password;
    };

    const signInOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key == "Enter" && !checkSubmitButtonStatus()) {
        props.doSignIn();
        }
    };

    return (
        <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="aliasInput"
            aria-label="alias"
            placeholder="name@example.com"
            onKeyDown={signInOnEnter}
            onChange={(event) => props.setAlias(event.target.value)}
          />
          <label htmlFor="aliasInput">Alias</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control bottom"
            id="passwordInput"
            aria-label="password"
            placeholder="Password"
            onKeyDown={signInOnEnter}
            onChange={(event) => props.setPassword(event.target.value)}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
      </>
    );
};

export default AuthenticationFields;

import Joi from "joi";
import React, {useContext, useState} from "react";

import Input from "./Input";
import {LoginContext} from "/src/context/LoginContextProvider";

function LoginFormGroup() {
    const [account, setAccount] = useState({username: "", password: ""});
    const [errors, setErrors] = useState({});
    const {tryLogin} = useContext(LoginContext);
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    });

    const handleChange = ({target: input}) => {
        const {value, name} = input;
        account[name] = value;
        setAccount(account);
    };

    const handleSubmit = () => {
        const {error} = schema.validate(account, {abortEarly: false});
        const newErrors = error
            ? error.details.reduce((allErrors, error) => {
                allErrors[error.path[0]] = error.message;
                return allErrors;
            }, {})
            : {};
        setErrors(newErrors);
        if (error) return;
        tryLogin(account);
    };
    return (
        <div style={{minWidth: "400px"}}>
            <Input
                name="username"
                icon={<i className="fa fa-user" aria-hidden="true"></i>}
                label="用户名"
                error={errors.username}
                onChange={handleChange}
            />
            <div className="py-4"></div>
            <Input
                name="password"
                icon={<i className="fa fa-lock" aria-hidden="true"></i>}
                label="密码"
                type="password"
                error={errors.password}
                onChange={handleChange}
            />
            <div className="mt-5 d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-primary shadow"
                    onClick={() => handleSubmit()}
                    onKeyDown={(e) => {
                        if (e.key === "enter") {
                            handleSubmit();
                        }
                    }}
                >
                    登录
                </button>
            </div>
        </div>
    );
}

LoginFormGroup.propTypes = {};

export default LoginFormGroup;

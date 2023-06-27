import Joi from "joi";
import {useState} from "react";

import Input from "/src/components/Input";
import {register} from "/src/api/registerApi.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function RegisterFormGroup() {
    const [form, setForm] = useState({username: "", name: "", password: "", passwordConfirm: ""});
    const [errors, setErrors] = useState({});
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        name: Joi.string().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        passwordConfirm: Joi.any().valid(Joi.ref('password')).required(),
    });
    const navigate = useNavigate();

    const handleChange = ({target: input}) => {
        const {value, name} = input;
        form[name] = value;
        setForm(form);
    };

    const handleSubmit = async () => {
        const {error} = schema.validate(form, {abortEarly: false});
        const newErrors = error
            ? error.details.reduce((allErrors, error) => {
                allErrors[error.path[0]] = error.message;
                return allErrors;
            }, {})
            : {};
        setErrors(newErrors);
        if (error) return;
        const {code} = await register(form);
        if (code === 1) {
            toast("注册成功");
            navigate("/login");
        } else {
            toast("注册失败");
        }
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
                name="name"
                icon={<i className="fa fa-lock" aria-hidden="true"></i>}
                label="昵称"
                error={errors.name}
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
            <div className="py-4"></div>
            <Input
                name="passwordConfirm"
                icon={<i className="fa fa-lock" aria-hidden="true"></i>}
                label="确认密码"
                type="password"
                error={errors.passwordConfirm}
                onChange={handleChange}
            />
            <div className="mt-5 d-flex justify-content-evenly align-items-center">
                <button
                    className="btn btn-success shadow"
                    onClick={() => handleSubmit()}
                    onKeyDown={(e) => {
                        if (e.key === "enter") {
                            handleSubmit();
                        }
                    }}
                >
                    注册
                </button>
            </div>
        </div>
    );
}

RegisterFormGroup.propTypes = {};

export default RegisterFormGroup;

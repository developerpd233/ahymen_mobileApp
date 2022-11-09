import * as Yup from "yup";
import { validateNumberRegex } from "../../../utils/methods";

const scheme = (regex) =>
    Yup.object().shape({
        phone: Yup.string()
            .test("checkPhoneNumber", (value, obj) =>
                validateNumberRegex(regex, value || "", obj)
            )
            .required("Phone number is required."),
       
        password: Yup.string()
            .required("Please enter your password.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(
                RegExp("(.*[a-z].*)"),
                "Password should have a minimum of 1 lowercase letter"
            )
            .matches(
                RegExp("(.*[A-Z].*)"),
                "Password should have a minimum of 1 uppercase letter"
            )
            .matches(
                RegExp("(.*\\d.*)"),
                "Password should have a minimum of 1 digit"
            )
            .matches(
                RegExp('[!@#$%^&*(),.?":{}|<>]'),
                "Password should have a minimum of 1 symbol."
            ),
    });

export default scheme;

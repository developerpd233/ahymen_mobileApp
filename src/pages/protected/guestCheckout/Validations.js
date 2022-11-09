import * as Yup from "yup";
import { validateNumberRegex } from "../../../utils/methods";

const scheme = (regex) =>
    Yup.object().shape({
        fullName: Yup.string().required("Please enter your full name"),
        email: Yup.string()
            .required("Please enter email address")
            .email("Please enter valid email address"),
        phone: Yup.string()
            .test("checkPhoneNumber", (value, obj) =>
                validateNumberRegex(regex, value || "", obj)
            )
            .required("Phone number is required."),
    });

export default scheme;

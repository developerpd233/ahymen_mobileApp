import * as Yup from "yup";
import { validateNumberRegex } from "../../../utils/methods";

const scheme = (regex) =>
    Yup.object().shape({
        fullName: Yup.string().required("Please_enter_your_full_name"),
        email: Yup.string()
            .required("Please_enter_email_address")
            .email("Please_enter_valid_email_address"),
        phone: Yup.string()
            .test("checkPhoneNumber", (value, obj) =>
                validateNumberRegex(regex, value || "", obj)
            )
            .required("Phone number is required."),
    });

export default scheme;

import * as Yup from "yup";
import { validateNumberRegex } from "../../../utils/methods";

const scheme = (regex) =>
    Yup.object().shape({
        phone: Yup.string()
            .test("checkPhoneNumber", (value, obj) =>
                validateNumberRegex(regex, value || "", obj)
            )
            .required("Phone number is required."),
    });

export default scheme;

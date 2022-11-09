import * as Yup from "yup";

const scheme = Yup.object().shape({
    name: Yup.string().required("Please enter your full name"),
    email: Yup.string()
        .required("Please enter email address")
        .email("Please enter valid email address"),
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

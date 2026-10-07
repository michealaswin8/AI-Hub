
"use strict";

(() => {

    let csrfToken = "";


    // ===================================
    // FLASK API REQUEST
    // ===================================

    async function api(
        path,
        method = "GET",
        body = null
    ) {

        const headers = {
            Accept: "application/json"
        };


        if (method !== "GET") {

            headers["X-CSRF-Token"] =
                csrfToken;

        }


        if (body !== null) {

            headers["Content-Type"] =
                "application/json";

        }


        let response;


        try {

            response = await fetch(

                path,

                {
                    method,

                    headers,

                    credentials: "same-origin",

                    body: body === null
                        ? undefined
                        : JSON.stringify(body)
                }

            );

        } catch {

            throw new Error(
                "Cannot reach Flask. "
                + "Start py app.py and use port 5000."
            );

        }


        const result = await response
            .json()
            .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                result.error
                || `Server error ${response.status}`
            );

        }


        return result;

    }


    // ===================================
    // DISPLAY ERROR
    // ===================================

    function showError(message) {

        const errorBox =
            document.getElementById(
                "authError"
            );


        if (errorBox) {

            errorBox.textContent =
                message;

        } else {

            console.error(
                message
            );

        }

    }


    // ===================================
    // LOGIN AND SIGNUP FORMS
    // ===================================

    function setupForm(mode) {

        const form =
            document.getElementById(
                "authForm"
            );


        const button =
            document.getElementById(
                "authSubmit"
            );


        if (!form || !button) {
            return;
        }


        form.addEventListener(

            "submit",

            async event => {

                event.preventDefault();

                showError("");


                if (!form.reportValidity()) {
                    return;
                }


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "password"
                    ).value;


                const payload = {

                    email,

                    password

                };


                // ADD SIGNUP DETAILS

                if (mode === "signup") {

                    payload.name =
                        document.getElementById(
                            "name"
                        ).value.trim();


                    payload.confirm_password =
                        document.getElementById(
                            "confirm"
                        ).value;


                    if (
                        payload.password !==
                        payload.confirm_password
                    ) {

                        showError(
                            "The passwords do not match."
                        );

                        return;

                    }

                }


                button.disabled = true;


                try {

                    await api(

                        `/api/auth/${mode}`,

                        "POST",

                        payload

                    );


                    // OPEN ORIGINAL WEBSITE

                    window.location.replace(
                        "/"
                    );

                } catch (error) {

                    showError(
                        error.message
                    );

                    button.disabled = false;

                }

            }

        );

    }


    // ===================================
    // HOMEPAGE NAVIGATION
    // ===================================

    function setupHome(user) {

        const loginButton =
            document.getElementById(
                "loginNav"
            );


        const mobileLogin =
            document.getElementById(
                "mobileLogin"
            );


        const logoutButton =
            document.getElementById(
                "logoutNav"
            );


        const mobileLogout =
            document.getElementById(
                "mobileLogout"
            );


        const userName =
            document.getElementById(
                "navUser"
            );


        // SHOW CORRECT BUTTONS

        if (loginButton) {

            loginButton.hidden =
                Boolean(user);

        }


        if (mobileLogin) {

            mobileLogin.hidden =
                Boolean(user);

        }


        if (logoutButton) {

            logoutButton.hidden =
                !user;

        }


        if (mobileLogout) {

            mobileLogout.hidden =
                !user;

        }


        if (userName) {

            userName.textContent =
                user
                    ? `Hi, ${user.name}`
                    : "";


            userName.hidden =
                !user;

        }


        // ===================================
        // LOGOUT
        // ===================================

        async function logout() {

            try {

                await api(

                    "/api/auth/logout",

                    "POST",

                    {}

                );


                window.location.replace(
                    "/login.html"
                );

            } catch (error) {

                showError(
                    error.message
                );

                alert(
                    error.message
                );

            }

        }


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logout
            );

        }


        if (mobileLogout) {

            mobileLogout.addEventListener(
                "click",
                logout
            );

        }

    }


    // ===================================
    // INITIALIZE AUTHENTICATION
    // ===================================

    document.addEventListener(

        "DOMContentLoaded",

        async () => {

            const mode =
                document.body.dataset.authPage;


            try {

                const state = await api(
                    "/api/auth/me"
                );


                csrfToken =
                    state.csrf_token;


                // LOGIN / SIGNUP

                if (
                    mode === "login"
                    || mode === "signup"
                ) {

                    if (state.authenticated) {

                        window.location.replace(
                            "/"
                        );

                    } else {

                        setupForm(
                            mode
                        );

                    }

                }


                // ORIGINAL HOMEPAGE

                else {

                    if (!state.authenticated) {

                        window.location.replace(
                            "/login.html"
                        );

                    } else {

                        setupHome(
                            state.user
                        );

                    }

                }

            } catch (error) {

                showError(
                    error.message
                );

            }

        }

    );

})();

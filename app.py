
import os
import re
import secrets

from contextlib import contextmanager
from datetime import timedelta
from pathlib import Path

import mysql.connector

from dotenv import load_dotenv

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    request,
    send_from_directory,
    session
)

from werkzeug.security import (
    check_password_hash,
    generate_password_hash
)


# =========================================
# 1. CONFIGURATION
# =========================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

secret = os.getenv("FLASK_SECRET_KEY", "").strip()

if len(secret) < 32 or secret in {
    "replace_with_your_generated_secret",
    "YOUR_GENERATED_SECRET_KEY"
}:
    raise RuntimeError(
        "Set a generated FLASK_SECRET_KEY "
        "in .env (32+ characters)."
    )


app = Flask(__name__, static_folder=None)

app.config.update(
    SECRET_KEY=secret,

    PERMANENT_SESSION_LIFETIME=timedelta(
        days=1
    ),

    SESSION_COOKIE_HTTPONLY=True,

    SESSION_COOKIE_SAMESITE="Lax",

    SESSION_COOKIE_SECURE=(
        os.getenv(
            "SESSION_COOKIE_SECURE",
            "0"
        ) == "1"
    ),

    MAX_CONTENT_LENGTH=16384
)


# =========================================
# 2. WEBSITE FILES
# =========================================

PUBLIC_FILES = {
    "index.html",
    "style.css",
    "script.js",

    "login.html",
    "signup.html",

    "auth.css",
    "auth.js",

    "explore.html",
    "tool-details.html"
}


# =========================================
# 3. MYSQL CONNECTION
# =========================================

@contextmanager
def database():

    connection = mysql.connector.connect(
        host=os.getenv(
            "DB_HOST",
            "127.0.0.1"
        ),

        port=int(
            os.getenv(
                "DB_PORT",
                "3306"
            )
        ),

        user=os.getenv(
            "DB_USER",
            "root"
        ),

        password=os.getenv(
            "DB_PASSWORD",
            ""
        ),

        database=os.getenv(
            "DB_NAME",
            "ai_vault"
        ),

        connection_timeout=5
    )

    try:
        yield connection

    finally:
        connection.close()


# =========================================
# 4. HELPER FUNCTIONS
# =========================================

def api_error(message, status=400):

    return jsonify({
        "error": message
    }), status


def data_object():

    value = request.get_json(
        silent=True
    )

    if isinstance(value, dict):
        return value

    return {}


def csrf_token():

    if "csrf_token" not in session:

        session["csrf_token"] = (
            secrets.token_urlsafe(32)
        )

    return session["csrf_token"]


# =========================================
# 5. SECURITY
# =========================================

@app.before_request
def protect_api():

    if (
        request.path.startswith("/api/")
        and request.method in {
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        }
    ):

        expected = session.get(
            "csrf_token",
            ""
        )

        supplied = request.headers.get(
            "X-CSRF-Token",
            ""
        )

        if (
            not expected
            or not supplied
            or not secrets.compare_digest(
                expected,
                supplied
            )
        ):

            return api_error(
                "Security token expired. "
                "Refresh this page.",
                403
            )


@app.after_request
def response_headers(response):

    response.headers[
        "X-Content-Type-Options"
    ] = "nosniff"

    if request.path.startswith("/api/"):

        response.headers[
            "Cache-Control"
        ] = "no-store"

    return response


# =========================================
# 6. WEBSITE ROUTES
# =========================================

@app.get("/")
def homepage():

    # Open the login page first

    if not session.get("user"):

        return redirect(
            "/login.html"
        )

    return send_from_directory(
        BASE_DIR,
        "index.html"
    )


@app.get("/<path:filename>")
def public_file(filename):

    if filename not in PUBLIC_FILES:
        abort(404)

    protected_pages = {
        "index.html",
        "explore.html",
        "tool-details.html"
    }

    if (
        filename in protected_pages
        and not session.get("user")
    ):
        return redirect("/login.html")

    return send_from_directory(
        BASE_DIR,
        filename
    )


# Optional asset folder for your existing
# website's images and other assets

@app.get("/assets/<path:filename>")
def assets(filename):

    assets_dir = BASE_DIR / "assets"

    if not assets_dir.is_dir():
        abort(404)

    return send_from_directory(
        assets_dir,
        filename
    )


# =========================================
# 7. CHECK LOGIN STATUS
# =========================================

@app.get("/api/auth/me")
def auth_status():

    return jsonify({

        "authenticated": bool(
            session.get("user")
        ),

        "user": session.get(
            "user"
        ),

        "csrf_token": csrf_token()

    })


# =========================================
# 8. SIGNUP
# =========================================

@app.post("/api/auth/signup")
def signup():

    data = data_object()

    name = str(
        data.get("name") or ""
    ).strip()

    email = str(
        data.get("email") or ""
    ).strip().lower()

    password = data.get(
        "password"
    )

    confirm = data.get(
        "confirm_password"
    )


    # Validate name

    if (
        not 2 <= len(name) <= 64
        or any(
            ord(c) < 32
            for c in name
        )
    ):

        return api_error(
            "Name must be 2-64 characters."
        )


    # Validate email

    email_pattern = (
        r"[^@\s]{1,64}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    )

    if (
        len(email) > 254
        or not re.fullmatch(
            email_pattern,
            email
        )
    ):

        return api_error(
            "Enter a valid email address."
        )


    # Validate password

    if (
        not isinstance(
            password,
            str
        )
        or not 8 <= len(password) <= 128
    ):

        return api_error(
            "Password must have 8-128 characters."
        )


    if password != confirm:

        return api_error(
            "Passwords do not match."
        )


    # Save user to MySQL

    try:

        with database() as conn:

            cursor = conn.cursor()

            try:

                cursor.execute(
                    """
                    INSERT INTO users
                    (
                        name,
                        email,
                        password_hash
                    )
                    VALUES (%s, %s, %s)
                    """,

                    (
                        name,
                        email,

                        generate_password_hash(
                            password,
                            method="scrypt"
                        )
                    )
                )

                new_id = cursor.lastrowid

                conn.commit()

            finally:
                cursor.close()


    except mysql.connector.IntegrityError:

        return api_error(
            "This email is already registered.",
            409
        )


    except mysql.connector.Error:

        app.logger.exception(
            "Signup MySQL error"
        )

        return api_error(
            "Cannot access MySQL. "
            "Check database settings.",
            503
        )


    # Log in after successful signup

    session.clear()

    session.permanent = True

    session["user"] = {
        "id": new_id,
        "name": name,
        "email": email
    }

    csrf_token()

    return jsonify({

        "message": "Account created.",

        "user": session["user"]

    }), 201


# =========================================
# 9. LOGIN
# =========================================

@app.post("/api/auth/login")
def login():

    data = data_object()

    email = str(
        data.get("email") or ""
    ).strip().lower()

    password = data.get(
        "password"
    )


    if (
        not email
        or not isinstance(
            password,
            str
        )
        or not password
    ):

        return api_error(
            "Enter your email and password."
        )


    # Find user in MySQL

    try:

        with database() as conn:

            cursor = conn.cursor(
                dictionary=True
            )

            try:

                cursor.execute(
                    """
                    SELECT
                        id,
                        name,
                        email,
                        password_hash
                    FROM users
                    WHERE email = %s
                    LIMIT 1
                    """,

                    (email,)
                )

                user = cursor.fetchone()

            finally:
                cursor.close()


    except mysql.connector.Error:

        app.logger.exception(
            "Login MySQL error"
        )

        return api_error(
            "Cannot access MySQL. "
            "Check database settings.",
            503
        )


    # Check password

    if (
        not user
        or not check_password_hash(
            user["password_hash"],
            password
        )
    ):

        return api_error(
            "Incorrect email or password.",
            401
        )


    # Create login session

    session.clear()

    session.permanent = True

    session["user"] = {

        "id": user["id"],

        "name": user["name"],

        "email": user["email"]

    }

    csrf_token()

    return jsonify({

        "message": "Logged in.",

        "user": session["user"]

    })


# =========================================
# 10. LOGOUT
# =========================================

@app.post("/api/auth/logout")
def logout():

    session.clear()

    return jsonify({
        "message": "Logged out."
    })


# =========================================
# 11. FAVORITES API
# =========================================

@app.route(
    "/api/favorites",

    methods=[
        "GET",
        "POST",
        "DELETE"
    ]
)
def favorites():

    user = session.get(
        "user"
    )

    if not user:

        return api_error(
            "Sign in to manage favorites.",
            401
        )


    if request.method != "GET":

        data = data_object()

        tool_key = str(

            data.get("tool_key")
            or data.get("tool_id")
            or ""

        ).strip()


        if (
            not 1 <= len(tool_key) <= 160
            or any(
                ord(c) < 32
                for c in tool_key
            )
        ):

            return api_error(
                "Invalid tool identifier."
            )


    try:

        with database() as conn:

            cursor = conn.cursor()

            try:

                # Read saved tools

                if request.method == "GET":

                    cursor.execute(
                        """
                        SELECT tool_key
                        FROM favorites
                        WHERE user_id = %s
                        ORDER BY id DESC
                        """,

                        (user["id"],)
                    )

                    results = [

                        row[0]
                        for row in cursor.fetchall()

                    ]

                    return jsonify({
                        "favorites": results
                    })


                # Add a favorite

                if request.method == "POST":

                    cursor.execute(
                        """
                        INSERT IGNORE INTO favorites
                        (
                            user_id,
                            tool_key
                        )
                        VALUES (%s, %s)
                        """,

                        (
                            user["id"],
                            tool_key
                        )
                    )


                # Remove a favorite

                else:

                    cursor.execute(
                        """
                        DELETE FROM favorites
                        WHERE user_id = %s
                        AND tool_key = %s
                        """,

                        (
                            user["id"],
                            tool_key
                        )
                    )


                conn.commit()

                return jsonify({
                    "message": "Favorites updated."
                })

            finally:
                cursor.close()


    except mysql.connector.Error:

        app.logger.exception(
            "Favorites MySQL error"
        )

        return api_error(
            "Cannot access saved tools.",
            503
        )


# =========================================
# 12. MYSQL HEALTH CHECK
# =========================================

@app.get("/api/health")
def health():

    try:

        with database() as conn:

            cursor = conn.cursor()

            try:

                cursor.execute(
                    "SELECT 1"
                )

                cursor.fetchone()

            finally:
                cursor.close()


        return jsonify({

            "status": "ok",

            "database": "connected"

        })


    except mysql.connector.Error:

        app.logger.exception(
            "MySQL connection test failed"
        )

        return jsonify({

            "status": "error",

            "database": "not connected"

        }), 503


# =========================================
# 13. START THE SERVER
# =========================================
@app.get("/explore.html")
def explore_page():
    if not session.get("user"):
        return redirect("/login.html")

    return send_from_directory(
        BASE_DIR,
        "explore.html"
    )


@app.get("/tool-details.html")
def tool_details_page():
    if not session.get("user"):
        return redirect("/login.html")

    return send_from_directory(
        BASE_DIR,
        "tool-details.html"
    )
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
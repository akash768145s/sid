"use client";
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthContainer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            router.replace('/dashboard');
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.currentTarget.elements.namedItem('email').value;
        const password = e.currentTarget.elements.namedItem('password').value;

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        if (isLogin) {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                setError("");
                if (res?.url) router.replace("/dashboard");
            }
        } else {
            try {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (res.status === 400) {
                    setError("This email is already registered");
                } else if (res.status === 200) {
                    setError("");
                    router.push("/login");
                }
            } catch (error) {
                setError("Error, try again");
                console.log(error);
            }
        }
    };

    return (
        <div style={styles.body}>
            <div
                style={isActive ? styles.containerActive : styles.container}
                className={isActive ? 'active' : ''}
                id="container"
            >
                <div
                    style={{
                        ...styles.formContainer,
                        ...styles.signUp,
                        ...(isActive ? styles.activeSignUp : {}),
                    }}
                    className="form-container sign-up"
                >
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                        />
                        <button
                            type="submit"
                            style={styles.button}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                        <p style={styles.error}>{error && error}</p>
                    </form>
                </div>

                <div
                    style={{
                        ...styles.formContainer,
                        ...styles.signIn,
                        ...(isActive ? styles.activeSignIn : {}),
                    }}
                    className="form-container sign-in"
                >
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h1>Sign In</h1>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                        />
                        <a href="#" style={styles.a}>Forget Your Password?</a>
                        <button
                            type="submit"
                            style={styles.button}
                            onClick={() => setIsLogin(true)}
                        >
                            Sign In
                        </button>
                        <p style={styles.error}>{error && error}</p>
                    </form>
                </div>

                <div
                    style={{
                        ...styles.toggleContainer,
                        ...(isActive ? styles.activeToggleContainer : {}),
                    }}
                    className="toggle-container"
                >
                    <div
                        style={{
                            ...styles.toggle,
                            ...(isActive ? styles.activeToggle : {}),
                        }}
                        className="toggle"
                    >
                        <div
                            style={{
                                ...styles.togglePanel,
                                ...styles.toggleLeft,
                                ...(isActive ? styles.activeToggleLeft : {}),
                            }}
                            className="toggle-panel toggle-left"
                        >
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button
                                type="button"
                                style={styles.hiddenButton}
                                onClick={() => setIsActive(false)}
                                id="login"
                            >
                                Sign In
                            </button>
                        </div>
                        <div
                            style={{
                                ...styles.togglePanel,
                                ...styles.toggleRight,
                                ...(isActive ? styles.activeToggleRight : {}),
                            }}
                            className="toggle-panel toggle-right"
                        >
                            <h1>Welcome, Friend!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button
                                type="button"
                                style={styles.hiddenButton}
                                onClick={() => setIsActive(true)}
                                id="register"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Montserrat', sans-serif;
                }

                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

                @keyframes move {
                    0%, 49.99% {
                        opacity: 0;
                        z-index: 1;
                    }
                    50%, 100% {
                        opacity: 1;
                        z-index: 5;
                    }
                }
            `}</style>
        </div>
    );
};

const styles = {
    body: {
        backgroundColor: '#c9d6ff',
        background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        width: '768px',
        maxWidth: '100%',
        minHeight: '480px',
    },
    containerActive: {
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        width: '768px',
        maxWidth: '100%',
        minHeight: '480px',
    },
    formContainer: {
        position: 'absolute',
        top: '0',
        height: '100%',
        transition: 'all 0.6s ease-in-out',
    },
    signIn: {
        left: '0',
        width: '50%',
        zIndex: '2',
    },
    signUp: {
        left: '0',
        width: '50%',
        opacity: '0',
        zIndex: '1',
    },
    activeSignIn: {
        transform: 'translateX(100%)',
    },
    activeSignUp: {
        transform: 'translateX(100%)',
        opacity: '1',
        zIndex: '5',
        animation: 'move 0.6s',
    },
    form: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 40px',
        height: '100%',
    },
    input: {
        backgroundColor: '#eee',
        border: 'none',
        margin: '8px 0',
        padding: '10px 15px',
        fontSize: '13px',
        borderRadius: '8px',
        width: '100%',
        outline: 'none',
    },
    button: {
        backgroundColor: '#006DFF',
        color: '#fff',
        fontSize: '12px',
        padding: '10px 45px',
        border: '1px solid transparent',
        borderRadius: '8px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        marginTop: '10px',
        cursor: 'pointer',
    },
    hiddenButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
    },
    a: {
        color: '#333',
        fontSize: '13px',
        textDecoration: 'none',
        margin: '15px 0 10px',
    },
    error: {
        color: 'red',
        fontSize: '16px',
        margin: '4px 0',
    },
    toggleContainer: {
        position: 'absolute',
        top: '0',
        left: '50%',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        transition: 'all 0.6s ease-in-out',
        borderRadius: '150px 0 0 100px',
        zIndex: '1000',
    },
    activeToggleContainer: {
        transform: 'translateX(-100%)',
        borderRadius: '0 150px 100px 0',
    },
    toggle: {
        backgroundColor: 'orange',
        height: '100%',
        background: 'linear-gradient(to right, #004AAD, #2090FF)',
        color: '#fff',
        position: 'relative',
        left: '-100%',
        height: '100%',
        width: '200%',
        transform: 'translateX(0)',
        transition: 'all 0.6s ease-in-out',
    },
    activeToggle: {
        transform: 'translateX(50%)',
    },
    togglePanel: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 30px',
        textAlign: 'center',
        top: '0',
        transform: 'translateX(0)',
        transition: 'all 0.6s ease-in-out',
    },
    toggleLeft: {
        transform: 'translateX(-200%)',
    },
    activeToggleLeft: {
        transform: 'translateX(0)',
    },
    toggleRight: {
        right: '0',
        transform: 'translateX(0)',
    },
    activeToggleRight: {
        transform: 'translateX(200%)',
    },
};

export default AuthContainer;

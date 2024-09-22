export const LockIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        focusable="false"
        // ariaHidden="true"
        viewBox="0 0 24 24"
        // dataTestid="LockOutlinedIcon"
    >
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"></path>
    </svg>
);

export const GoogleIcon = ({ width = '24', height = '24', className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} className={className} viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        ></path>
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        ></path>
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        ></path>
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        ></path>
        <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
);

export const btnShow = ({ width = 10, height = 10, className }) => (
    <svg width={width} height={height} viewBox="0 0 8 5" className={className}>
        <path d="M0.538289 5H7.46171C7.94067 5 8.18015 4.42148 7.84111 4.08244L4.38075 0.619382C4.17087 0.4095 3.82913 0.4095 3.61925 0.619382L0.158886 4.08244C-0.180154 4.42148 0.0593268 5 0.538289 5Z"></path>
    </svg>
);

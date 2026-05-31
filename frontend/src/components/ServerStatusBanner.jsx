import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ServerStatusBanner() {
    const [status, setStatus] = useState(() => {
        // If server was already shown as connected in this session, don't show the banner
        if (sessionStorage.getItem('server_connected_shown') === 'true') {
            return 'hidden';
        }
        return 'checking';
    }); // 'checking' | 'offline' | 'online' | 'hidden'
    const [timeLeft, setTimeLeft] = useState(60);
    const pollingIntervalRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    const checkServer = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await axios.get(`${apiUrl}/ping`);
            if (response.data && response.data.status === 'ok') {
                setStatus('online');
                sessionStorage.setItem('server_connected_shown', 'true');
                clearInterval(pollingIntervalRef.current);
                clearInterval(countdownIntervalRef.current);
                // Hide the banner after 3 seconds of success
                setTimeout(() => {
                    setStatus('hidden');
                }, 3000);
            }
        } catch (error) {
            if (status !== 'offline') {
                setStatus('offline');
                setTimeLeft(60); // Reset timer to 60 seconds
            }
        }
    };

    useEffect(() => {
        // If already connected and shown, skip server checks and polling
        if (sessionStorage.getItem('server_connected_shown') === 'true') {
            return;
        }

        // Initial check
        checkServer();

        // Poll the server every 5 seconds
        pollingIntervalRef.current = setInterval(checkServer, 5000);

        return () => {
            clearInterval(pollingIntervalRef.current);
            clearInterval(countdownIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (status === 'offline') {
            // Start countdown
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Reset to 30s once it hits 0 if server is still down
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(countdownIntervalRef.current);
        }

        return () => clearInterval(countdownIntervalRef.current);
    }, [status]);

    useEffect(() => {
        // Adjust body padding-top dynamically to prevent content overlapping
        const body = document.body;
        if (status === 'offline' || status === 'online') {
            const isDashboard = body.classList.contains('dashboard-active') || body.querySelector('.dashboard-wrapper');
            if (!isDashboard) {
                body.style.paddingTop = '104px'; // 64px navbar + 40px banner
            }
        } else {
            const isDashboard = body.classList.contains('dashboard-active') || body.querySelector('.dashboard-wrapper');
            if (!isDashboard) {
                body.style.paddingTop = '64px'; // default
            }
        }

        return () => {
            body.style.paddingTop = '';
        };
    }, [status]);

    if (status === 'hidden' || status === 'checking') {
        return null;
    }

    return (
        <div className={`server-status-banner ${status}`}>
            <span className="material-symbols-outlined spin-icon">
                {status === 'online' ? 'check_circle' : 'hourglass_empty'}
            </span>
            <span className="banner-text">
                {status === 'online'
                    ? 'Server Connected. All services are fully functional.'
                    : `Connecting to secure backend server (Render cold start)... Warming up in ~${timeLeft}s`}
            </span>
        </div>
    );
}

export default ServerStatusBanner;

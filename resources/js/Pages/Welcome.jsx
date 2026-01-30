import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [latestNews, setLatestNews] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const user = auth?.user;
    const role = user?.role?.name;



    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';




    const [events, setEvents] = useState([]);

useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events')
        .then(res => {
            const lastThree = res.data.slice(0, 3); // take first 3 from returned array
            setEvents(lastThree);
        })
        .catch(err => console.error(err));
}, []);




    // Fetch latest 2 news items
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/news')
            .then(res => {
                setLatestNews(res.data.slice(0, 2));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Head title="الصفحة الرئيسية" />
            
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-yellow: #F2C94C;
                    --color-yellow-light: #FFF9E6;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Tajawal", "Cairo", "Segoe UI", system-ui, sans-serif;
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                    color: var(--color-text);
                    line-height: 1.8;
                    direction: rtl;
                    overflow-x: hidden;
                }

                .welcome-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .welcome-page::before {
                    content: '';
                    position: fixed;
                    top: -50%;
                    right: -20%;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(118, 73, 156, 0.05) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 20s ease-in-out infinite;
                }

                .welcome-page::after {
                    content: '';
                    position: fixed;
                    bottom: -30%;
                    left: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(74, 188, 157, 0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 25s ease-in-out infinite reverse;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                }

                .main-header {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                }

                .main-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        var(--color-teal) 25%, 
                        var(--color-primary) 50%, 
                        var(--color-teal) 75%, 
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .main-header:hover::after {
                    opacity: 1;
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    animation: slideInRight 0.8s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .logo-img {
                    height: 90px;
                    width: auto;
                    filter: drop-shadow(0 4px 12px rgba(118, 73, 156, 0.2));
                    transition: var(--transition);
                }

                .logo-img:hover {
                    transform: scale(1.05) rotate(-2deg);
                    filter: drop-shadow(0 8px 16px rgba(118, 73, 156, 0.3));
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .logo-text-ar-big {
                    font-size: 2.2rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.2;
                    letter-spacing: -0.5px;
                }

                .logo-text-sub {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                }

                .main-nav {
                    
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    animation: slideInLeft 0.8s ease-out;
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .main-nav a {
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1.1rem;
                    font-weight: 600;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: var(--transition);
                }

                .main-nav a::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 2px;
                }

                .main-nav a:hover {
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .main-nav a:hover::before {
                    width: 100%;
                }

                .main-nav a.active {
                    color: var(--color-primary);
                }

                .main-nav a.active::before {
                    width: 100%;
                }

                .user-menu {
                    position: relative;
                }

                .user-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.65rem 1.4rem;
                    border-radius: 50px;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                }

                .user-button::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .user-button:hover::before {
                    width: 300px;
                    height: 300px;
                }

                .user-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .user-button svg {
                    width: 1.1rem;
                    height: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .user-button:hover svg {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    left: 0;
                    top: calc(100% + 0.8rem);
                    background: white;
                    border-radius: 12px;
                    box-shadow: var(--shadow-lg);
                    min-width: 220px;
                    overflow: hidden;
                    z-index: 50;
                    opacity: 0;
                    transform: translateY(-10px);
                    animation: dropdownSlide 0.3s ease forwards;
                    border: 1px solid rgba(118, 73, 156, 0.1);
                }

                @keyframes dropdownSlide {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dropdown-item {
                    display: block;
                    padding: 1rem 1.3rem;
                    color: var(--color-text);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.98rem;
                    font-weight: 500;
                    border-right: 3px solid transparent;
                }

                .dropdown-item:hover {
                    background: linear-gradient(90deg, rgba(118, 73, 156, 0.08) 0%, transparent 100%);
                    border-right-color: var(--color-teal);
                    padding-right: 1.6rem;
                }

                .hero {
                    padding: 4rem 0 3rem;
                    position: relative;
                    z-index: 1;
                }

                .hero-content {
                    display: grid;
                    grid-template-columns: 1.8fr 1.2fr;
                    gap: 3rem;
                    align-items: center;
                }

                .hero-text {
                    animation: fadeInUp 0.8s ease-out 0.2s backwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .hero-text h1 {
                    font-size: 2.8rem;
                    margin-bottom: 1.2rem;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 900;
                    line-height: 1.3;
                    letter-spacing: -0.5px;
                }

                .hero-text p {
                    margin-bottom: 2rem;
                    max-width: 600px;
                    color: var(--color-text-light);
                    font-size: 1.15rem;
                    line-height: 1.8;
                }

                .hero-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .hero-box {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 5px solid var(--color-teal);
                    position: relative;
                    overflow: hidden;
                    animation: fadeInUp 0.8s ease-out 0.4s backwards;
                    transition: var(--transition);
                }

                .hero-box::before {
                    content: '📚';
                    position: absolute;
                    top: -20px;
                    left: -20px;
                    font-size: 120px;
                    opacity: 0.05;
                    transform: rotate(-15deg);
                }

                .hero-box:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(74, 188, 157, 0.2);
                }

                .hero-box h2 {
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-size: 1.6rem;
                    font-weight: 800;
                }

                .hero-box p {
                    color: var(--color-text-light);
                    line-height: 1.7;
                }

                .section {
                    padding: 4rem 0;
                    position: relative;
                    z-index: 1;
                }

                .section-alt {
                    background: linear-gradient(
                        135deg,
                        rgba(118, 73, 156, 0.03) 0%,
                        rgba(74, 188, 157, 0.05) 100%
                    );
                    position: relative;
                }

                .section-alt::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(242, 201, 76, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .section-title {
                    font-size: 2.2rem;
                    margin-bottom: 1rem;
                    color: var(--color-primary);
                    font-weight: 900;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.8rem;
                }

                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), transparent);
                    border-radius: 2px;
                }

                .section-intro {
                    max-width: 800px;
                    margin-bottom: 2.5rem;
                    color: var(--color-text-light);
                    font-size: 1.1rem;
                    line-height: 1.9;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }

                .section-link {
                    color: var(--color-teal);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.05rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: var(--transition);
                    position: relative;
                }

                .section-link::after {
                    content: '←';
                    transition: transform 0.3s ease;
                }

                .section-link:hover {
                    color: var(--color-primary);
                    transform: translateX(-5px);
                }

                .section-link:hover::after {
                    transform: translateX(-5px);
                }

                .grid {
                    display: grid;
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .grid-3 {
                    grid-template-columns: repeat(3, 1fr);
                }

                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(118, 73, 156, 0.08);
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.4s ease;
                }

                .card:hover::before {
                    transform: scaleX(1);
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: rgba(118, 73, 156, 0.15);
                }

                .card h3 {
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-size: 1.35rem;
                    font-weight: 800;
                }

                .card p {
                    color: var(--color-text-light);
                    line-height: 1.7;
                }

                .news-tag {
                    display: inline-block;
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                    padding: 0.35rem 1rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 0.8rem;
                    box-shadow: 0 2px 8px rgba(74, 188, 157, 0.3);
                    letter-spacing: 0.3px;
                }

                .event-meta {
                    font-size: 0.95rem;
                    color: var(--color-text-light);
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .event-meta::before {
                    content: '📅';
                    font-size: 1.1rem;
                }

                .event-details {
                    margin-top: 1rem;
                    font-size: 0.95rem;
                }

                .event-details summary {
                    cursor: pointer;
                    font-weight: 700;
                    color: var(--color-teal);
                    list-style: none;
                    position: relative;
                    padding: 0.8rem 1.2rem;
                    background: var(--color-teal-light);
                    border-radius: 8px;
                    transition: var(--transition);
                    padding-right: 2.5rem;
                }

                .event-details summary::before {
                    content: "▾";
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.9rem;
                    color: var(--color-primary);
                    transition: transform 0.3s ease;
                }

                .event-details[open] summary {
                    background: var(--color-primary-light);
                    color: var(--color-primary);
                }

                .event-details[open] summary::before {
                    transform: translateY(-50%) rotate(180deg);
                }

                .event-details summary:hover {
                    background: var(--color-primary-light);
                    padding-right: 3rem;
                }

                .event-details ul {
                    margin-top: 1rem;
                    padding-right: 1.5rem;
                    background: rgba(118, 73, 156, 0.02);
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    margin-top: 0.8rem;
                }

                .event-details li {
                    margin-bottom: 0.5rem;
                    position: relative;
                    padding-right: 1.2rem;
                }

                .event-details li::before {
                    content: '✓';
                    position: absolute;
                    right: 0;
                    color: var(--color-teal);
                    font-weight: bold;
                }

                .btn {
                    display: inline-block;
                    padding: 0.9rem 1.8rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-size: 1.05rem;
                    border: 2px solid transparent;
                    transition: var(--transition);
                    font-weight: 700;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                }

                .btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .btn:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                }

                .btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .btn-secondary {
                    background: white;
                    border-color: var(--color-teal);
                    color: var(--color-teal);
                    box-shadow: 0 4px 15px rgba(74, 188, 157, 0.15);
                }

                .btn-secondary:hover {
                    background: var(--color-teal);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(74, 188, 157, 0.3);
                }

                .btn-light {
                    background: white;
                    color: var(--color-primary);
                    border: 2px solid var(--color-yellow);
                    box-shadow: 0 4px 15px rgba(242, 201, 76, 0.3);
                }

                .btn-light:hover {
                    background: var(--color-yellow);
                    color: var(--color-primary);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(242, 201, 76, 0.4);
                }

                .cta-section {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    color: white;
                    padding: 2.5rem 0;
                    margin-top: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .cta-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .cta-section::after {
                    content: '🚌';
                    position: absolute;
                    bottom: -30px;
                    left: 5%;
                    font-size: 200px;
                    opacity: 0.08;
                    transform: rotate(-10deg);
                }

                .cta-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    position: relative;
                    z-index: 1;
                }

                .cta-container h2 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    font-weight: 900;
                }

                .cta-container p {
                    font-size: 1.1rem;
                    opacity: 0.95;
                }

                .main-footer {
                    background: linear-gradient(135deg, #2a0845 0%, #3a0d63 100%);
                    color: #f3e9ff;
                    padding: 2rem 0;
                    margin-top: 1rem;
                    font-size: 0.98rem;
                    position: relative;
                    overflow: hidden;
                }

                .main-footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        var(--color-teal), 
                        var(--color-primary), 
                        var(--color-yellow),
                        var(--color-primary),
                        var(--color-teal)
                    );
                }

                .footer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-links a {
                    color: #e0cffc;
                    text-decoration: none;
                    transition: var(--transition);
                    position: relative;
                }

                .footer-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    right: 0;
                    width: 0;
                    height: 2px;
                    background: var(--color-teal);
                    transition: width 0.3s ease;
                }

                .footer-links a:hover {
                    color: white;
                }

                .footer-links a:hover::after {
                    width: 100%;
                }

                @media (max-width: 968px) {
                    .hero-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .grid-2, .grid-3 {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .hero-text h1 {
                        font-size: 2.2rem;
                    }

                    .section-title {
                        font-size: 1.9rem;
                    }
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 1.2rem 0;
                    }

                    .main-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 1rem;
                    }

                    .logo-img {
                        height: 70px;
                    }

                    .logo-text-ar-big {
                        font-size: 1.6rem;
                    }

                    .logo-text-sub {
                        font-size: 0.9rem;
                    }

                    .hero {
                        padding: 2.5rem 0;
                    }

                    .hero-text h1 {
                        font-size: 1.9rem;
                    }

                    .hero-text p {
                        font-size: 1rem;
                    }

                    .grid-2, .grid-3 {
                        grid-template-columns: 1fr;
                    }

                    .section {
                        padding: 3rem 0;
                    }

                    .section-title {
                        font-size: 1.7rem;
                    }

                    .cta-container {
                        flex-direction: column;
                        text-align: center;
                    }

                    .cta-container h2 {
                        font-size: 1.6rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .btn {
                        padding: 0.8rem 1.5rem;
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 480px) {
                    .logo {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.8rem;
                    }

                    .logo-img {
                        height: 60px;
                    }

                    .hero-text h1 {
                        font-size: 1.6rem;
                    }

                    .section-title {
                        font-size: 1.5rem;
                    }

                    .card {
                        padding: 1.5rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

            <div className="welcome-page">
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            <Link href="/" className="active">الصفحة الرئيسية</Link>
                            <Link href={route('news')}>الأخبار</Link>
                            
                            {/* Event Packages - for registered_user or admin_events */}
                            {(isRegisteredUser || isAdminEvents) && (
                                <Link href={route('event.packages')}>الفعاليات</Link>
                            )}

                            {user ? (
                                <div className="user-menu">
                                    <button 
                                        className="user-button"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        {user.name}
                                    </button>
                                    
                                    {showDropdown && (
                                        <div className="dropdown-menu">

                                            {(isAdminEvents || isAdminNews || !isRegisteredUser) && (
                           
                                            <Link href={route('profile.edit')} className="dropdown-item">
                                                الملف الشخصي
                                            </Link>

                                             )}
                                            <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                                تسجيل الخروج
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                    <Link href={route('register')}>إنشاء حساب</Link> 
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero">
                    <div className="container hero-content">
                        <div className="hero-text">
                            <h1>ننشر الثقافة وحب القراءة في كل مكان</h1>
                            <p>
                                حافلة مليئة بالكتب والأنشطة الثقافية والتعليمية، 
                                تزور المدارس، الأفواج، والجمعيات في مختلف المناطق اللبنانية.
                            </p>
                            <div className="hero-actions">
                                {/* Request Event - for any logged-in user */}
                                {user && (
                                    <Link href={route('event.request')} className="btn btn-primary">
                                        قدّم طلب زيارة
                                    </Link>
                                )}
                                {!user && (
                                    <Link href={route('register')} className="btn btn-primary">
                                        قدّم طلب زيارة
                                    </Link>
                                )}
                                <Link href={route('news')} className="btn btn-secondary">آخر الأخبار</Link>
                            </div>
                        </div>

                        <div className="hero-box">
                            <h2>مكتبة على عجلات</h2>
                            <p>
                                قصص، أنشطة فنية، زاوية الواقع الافتراضي، وتحديات ثقافية  
                                كلّها داخل حافلة ملوّنة تنشر الفرح والمعرفة.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">ما هي المكتبة المتجولة؟</h2>
                        <p className="section-intro">
                            حافلة ثقافية متنقلة تتسع لـ8000 كتاب موجه للأطفال والناشئة، 
                            أطلقتها كشافة الإمام المهدي (عجل الله فرجه)، 
                            بهدف تعزيز العلاقة مع الكتاب. 
                            مكتبة مهدي تقدم باقة بأكثر من 40 نشاطاً فنياً مختلفاً 
                            ومجموعة كبيرة من الألعاب الفكرية وأفلام تعليمية 
                            تعرض على الحواسيب وعلى شاشة تلفاز ضخمة ثلاثية الأبعاد
                        </p>

                        <div className="grid grid-3">
                            <div className="card">
                                <h3>الكتب والقراءة</h3>
                                <p>
                                    مجموعة واسعة من الكتب المناسبة لجميع الأعمار، 
                                    تشجّع على تنمية حب القراءة.
                                </p>
                            </div>
                            <div className="card">
                                <h3>الورش والأنشطة</h3>
                                <p>
                                    رواية القصص، الأشغال اليدوية، والألعاب الجماعية التي 
                                    تعزّز روح الإبداع والتعاون.
                                </p>
                            </div>
                            <div className="card">
                                <h3>التكنولوجيا والواقع الافتراضي</h3>
                                <p>
                                    زاوية رقمية تتيح للأطفال التعلّم بطريقة ممتعة وعصرية.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events Section */}
                {/* <section className="section section-events">
                    <div className="container">
                        <h2 className="section-title">الأنشطة القادمة</h2>
                        <p className="section-intro">
                            يمكن للجميع الاطلاع على مواعيد الزيارات القادمة للمكتبة المتجولة 
                            والانضمام للحضور في المنطقة الأقرب إليهم.
                        </p>

                        <div className="grid grid-3">
                            <article className="card event-card">
                                <h3>يوم مفتوح – حديقة المدينة في صور</h3>
                                <p className="event-meta">الأحد 20 كانون الأول 2025 • من 3 حتى 6 مساءً</p>

                                <details className="event-details">
                                    <summary>عرض التفاصيل</summary>
                                    <ul>
                                        <li>مفتوح لجميع الأهالي والأطفال</li>
                                        <li>زاوية كتب، زاوية رسم، وتجربة واقع افتراضي</li>
                                        <li>الدخول مجاني • عدد محدود من المقاعد داخل الحافلة</li>
                                    </ul>
                                </details>
                            </article>
                        </div>
                    </div>
                </section> */}


                {/* Upcoming Events Section */}
<section className="section section-events">
    <div className="container">
        <h2 className="section-title">الأنشطة القادمة</h2>
        <p className="section-intro">
            يمكن للجميع الاطلاع على مواعيد الزيارات القادمة للمكتبة المتجولة 
            والانضمام للحضور في المنطقة الأقرب إليهم.
        </p>

        <div className="grid grid-3">
            {events && events.length > 0 ? (
                events.map(event => (
                    <article key={event.id} className="card event-card">
                        <h3>{event.title}</h3>
                        <p className="event-meta">{event.description1}</p>

                        {event.description2 && (
                            <details className="event-details">
                                <summary>عرض التفاصيل</summary>
                                <ul>
                                    {event.description2.split('\n').map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                                </ul>
                            </details>
                        )}
                    </article>
                ))
            ) : (
                <p>لا توجد فعاليات قادمة حالياً</p>
            )}
        </div>
    </div>
</section>


                {/* News Preview */}
                <section className="section section-alt">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">آخر الأخبار</h2>
                            <Link href={route('news')} className="section-link">عرض كل الأخبار →</Link>
                        </div>

                        <div className="grid grid-2">
                            {latestNews.length > 0 ? (
                                latestNews.map(item => (
                                    <article key={item.id} className="card news-card">
    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
        {item.title}
        <span
            style={{
                fontSize: '0.75rem',
                color: '#888',
                marginRight: '8px',
                fontWeight: 'normal'
            }}
        >
            · {new Date(item.published_at).toLocaleDateString('ar-LB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
        </span>
    </h3>

    <p>{item.description.substring(0, 120)}...</p>
</article>

                                ))
                            ) : (
                                <>
                                    {/* <article className="card news-card">
                                        <p className="news-tag">تحديث</p>
                                        <h3>إطلاق موقعنا الإلكتروني الجديد</h3>
                                        <p>
                                            يمكنكم الآن متابعة الفعاليات والأخبار وتقديم طلبات الزيارة 
                                            مباشرة عبر الموقع.
                                        </p>
                                    </article>

                                    <article className="card news-card">
                                        <p className="news-tag">إنجاز</p>
                                        <h3>أكثر من 1000 طفل استفادوا من المكتبة</h3>
                                        <p>
                                            من خلال زيارات المدارس والمخيمات والجمعيات، 
                                            تواصل المكتبة المتجولة نشر الثقافة في كل لبنان.
                                        </p>
                                    </article> */}
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                {isRegisteredUser && (
                    <section className="cta-section">
                        <div className="container cta-container">
                            <div>
                                <h2>هل ترغب بزيارة المكتبة المتجولة؟</h2>
                                <p>يمكن للمدارس والجمعيات والكشافة تقديم طلب زيارة بخطوات بسيطة.</p>
                            </div>
                            <Link href={route('event.request')} className="btn btn-light">سجّل طلبك الآن</Link>
                        </div>
                    </section>
                )}

                {!user && (
                    <section className="cta-section">
                        <div className="container cta-container">
                            <div>
                                <h2>هل ترغب بزيارة المكتبة المتجولة؟</h2>
                                <p>يمكن للمدارس والجمعيات والكشافة تقديم طلب زيارة بخطوات بسيطة.</p>
                            </div>
                            <Link href={route('register')} className="btn btn-light">سجّل طلبك الآن</Link>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="main-footer">
                    <div className="footer-container">
                        <p>© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
                        <p className="footer-links">
                            <a href="#">اتصل بنا</a>
                            <span> • </span>
                            <a href="#">سياسة الخصوصية</a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.leftContent}>
                    <p>
                        <a href="/location" className={styles.link}>
                            Grande Towers, Tokha Road, Kathmandu, Nepal
                        </a>
                    </p>
                    <p>(+977) 9860343359</p>
                    <p>Sun – Fri, 10am – 7pm</p>
                </div>

                {/* Center Content */}
                <div className={styles.centerContent}>
                    <p>
                        © 2023{' '}
                        <a
                            href="https://www.instagram.com/thebeautyaesthetics_/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            The Beauty Aesthetics
                        </a>{' '}
                        All Rights Reserved.
                    </p>
                    <p>
                        Follow us on{' '}

                    </p>
                </div>

                {/* Right Content */}
                <div className={styles.rightContent}>
                    <p>
                        Powered by{' '}
                        <a
                            href="https://www.instagram.com/sujina._/"
                            target="_blank"
                            className={styles.link}
                        >
                            Sujina Shrestha
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

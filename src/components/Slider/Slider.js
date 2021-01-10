import React, { useEffect, useState } from 'react';
import { FaChevronLeft as Left, FaChevronRight as Right, FaPlay as Play, FaPause as Pause } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Slider.module.css';

const Slider = (props) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        console.log(slideIndex);
    }, [slideIndex])

    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(() => {
                changeSlide(1);
            }, 5000)
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        }
    }, [autoPlay])

    const slides = [
        {
            id: "1",
            url: "https://images.unsplash.com/photo-1533332408354-c5f979b0e086?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=996&q=80"
        },
        {
            id: "2",
            url: "https://images.unsplash.com/photo-1522885147691-06d859633fb8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
        },
        {
            id: "3",
            url: "https://images.unsplash.com/photo-1522885411213-fed07f49473d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
        },
        {
            id: "4",
            url: "https://images.unsplash.com/photo-1589813348611-eff65c80ae14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
        },
    ];

    const sliderVariants = {
        hidden: () => {
            return {
                opacity: 0,
            }
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                duration: 0.3
            },
        },
        exit: () => {
            return {
                opacity: 0,
                transition: {
                    duration: 0.3
                },
            }
        }
    }

    const changeSlide = (inc) => {
        setSlideIndex((currentSlideIndex) => {
            if (currentSlideIndex + inc < 0) {
                return slides.length - 1;
            }

            if (currentSlideIndex + inc === slides.length) {
                return 0;
            }

            return currentSlideIndex + inc;
        })
    }

    const playPause = () => {
        setAutoPlay((curr) => {
            return !curr;
        })
    }

    return (
        <div className={styles.slider}>
            <div className={styles.slider_controls}>
                <button className={[styles.slider_control, styles.previous].join(" ")} onClick={() => changeSlide(-1)}>
                    <Left size={22} style={{ display: 'block' }} />
                </button>
                <button className={[styles.slider_control, styles.play_pause].join(" ")} onClick={playPause}>
                    {
                        (autoPlay) ? <Pause size={22} style={{ display: 'block' }} /> : <Play size={22} style={{ display: 'block' }} />
                    }
                </button>
                <button className={[styles.slider_control, styles.next].join(" ")} onClick={() => changeSlide(1)}>
                    <Right size={22} style={{ display: 'block' }} />
                </button>
            </div>
            <AnimatePresence initial={false}>
                <motion.img
                    className={styles.slide}
                    key={slides[slideIndex].id}
                    src={slides[slideIndex].url}
                    alt={slides[slideIndex].id}
                    variants={sliderVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                />
            </AnimatePresence>
        </div>
    );
}

export default Slider;
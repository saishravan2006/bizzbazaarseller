import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ProTextTypeEffectProps {
  text: string | string[];
  as?: keyof JSX.IntrinsicElements;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorMode?: 'preset' | 'custom';
  cursorCharacterPreset?: string;
  customCursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  cursorColorMode?: 'auto' | 'custom';
  cursorCustomColor?: string;
  variableSpeed?: { min: number; max: number } | null;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  style?: React.CSSProperties;
  font?: React.CSSProperties;
}

const ProTextTypeEffect: React.FC<ProTextTypeEffectProps> = ({
  text,
  as: asTag = 'div',
  typingSpeed = 100,
  initialDelay = 0,
  pauseDuration = 1000,
  deletingSpeed = 50,
  loop = false,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorMode = 'preset',
  cursorCharacterPreset = '|',
  customCursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = ['#000000'],
  cursorColorMode = 'auto',
  cursorCustomColor = '#000000',
  variableSpeed = null,
  startOnVisible = false,
  reverseMode = false,
  style = {},
  font = {},
  ...rest
}) => {
  // Accept single string or array
  const textArray = useMemo(() => Array.isArray(text) ? text : [text ?? ''], [text]);
  
  // Cursor character resolution
  const cursorChar = cursorMode === 'custom' 
    ? (customCursorCharacter?.length ? customCursorCharacter : '|')
    : cursorCharacterPreset;

  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  // Colors
  const firstColor = (textColors && textColors[0]) || '#000000';
  const resolvedCursorColor = cursorColorMode === 'custom' && cursorCustomColor 
    ? cursorCustomColor 
    : firstColor;

  const containerRef = useRef<HTMLElement>(null);
  const As = asTag as any;

  // Variable typing speed
  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    const lo = Math.max(0, Number(min) || 0);
    const hi = Math.max(lo, Number(max) || lo);
    return Math.random() * (hi - lo) + lo;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = useCallback(() => {
    if (!textColors || textColors.length === 0) return '#000000';
    return textColors[currentTextIndex % textColors.length];
  }, [textColors, currentTextIndex]);

  // Start on visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnVisible]);

  // Typing loop
  useEffect(() => {
    if (!isVisible) return;
    
    let timeout: NodeJS.Timeout;
    const currentText = textArray[currentTextIndex] ?? '';
    const processed = reverseMode 
      ? currentText.split('').reverse().join('')
      : currentText;

    const run = () => {
      if (isDeleting) {
        if (displayedText.length === 0) {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex((i) => (i + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processed.length) {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + processed[currentCharIndex]);
            setCurrentCharIndex((i) => i + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else {
          if (textArray.length > 1 && (loop || currentTextIndex < textArray.length - 1)) {
            timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(run, initialDelay);
    } else {
      run();
    }

    return () => timeout && clearTimeout(timeout);
  }, [
    isVisible,
    textArray,
    currentTextIndex,
    loop,
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
  ]);

  // Base container style
  const baseStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
    whiteSpace: 'pre-wrap',
    overflow: 'visible',
    ...style,
  };

  const shouldHideCursor = hideCursorWhileTyping && 
    (currentCharIndex < (textArray[currentTextIndex] ?? '').length || isDeleting);

  return (
    <As
      ref={containerRef}
      className={`text-type ${className}`}
      style={baseStyle}
      {...rest}
    >
      <span
        className="text-type__content"
        style={{
          all: 'unset',
          display: 'inline',
          color: getCurrentTextColor(),
          ...font,
        }}
      >
        {displayedText}
      </span>
      {showCursor && !shouldHideCursor && (
        <motion.span
          className={`text-type__cursor ${cursorClassName}`}
          style={{
            marginLeft: '0.25rem',
            display: 'inline-block',
            color: resolvedCursorColor,
            ...font,
          }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: cursorBlinkDuration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </As>
  );
};

export default ProTextTypeEffect;
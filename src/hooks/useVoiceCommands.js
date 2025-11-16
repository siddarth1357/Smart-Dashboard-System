import { useState, useEffect } from 'react';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceCommand(text);
      };

      setRecognition(recognition);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('show dashboard')) {
      window.location.hash = '#dashboard';
    } else if (cmd.includes('show users')) {
      window.location.hash = '#users';
    } else if (cmd.includes('export data')) {
      // Trigger export function
      alert('Voice command: Exporting data...');
    } else if (cmd.includes('dark mode')) {
      document.body.classList.toggle('dark-mode');
    }
    
    // Add more voice commands...
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return { isListening, transcript, startListening, stopListening };
};
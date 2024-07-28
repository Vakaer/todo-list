import { useState, useRef } from 'react';
import { formatTime } from '../utils';

export const useAudioRecorder = (onAudioRecorded: (blob: Blob) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        onAudioRecorded(audioBlob);
        audioChunks.current = [];
        setAudioURL(URL.createObjectURL(audioBlob)); // Set the audio URL
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = mediaRecorder;
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  return { isRecording, audioURL, elapsedTime: formatTime(elapsedTime), startRecording, stopRecording };
};

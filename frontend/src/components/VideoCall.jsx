import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const VideoCall = ({ roomId, userName, userRole, onClose }) => {
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);

  useEffect(() => {
    if (!roomId || !userName) return;

    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeJitsi = async () => {
      try {
        await loadJitsiScript();

        const domain = 'meet.jit.si';
        const options = {
          roomName: `MedConnect_${roomId}`,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          userInfo: {
            displayName: `${userRole === 'doctor' ? '👨‍⚕️ Dr. ' : '👤 '}${userName}`,
          },
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            enableClosePage: false,
            subject: 'MedConnect Consultation',
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
            ],
          },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        jitsiApiRef.current = api;

        // Grant moderator rights to doctor
        if (userRole === 'doctor') {
          api.addEventListener('videoConferenceJoined', () => {
            api.executeCommand('setTileView', false);
          });
        }

        api.addEventListener('readyToClose', () => {
          onClose();
        });

      } catch (error) {
        console.error('Error loading Jitsi Meet:', error);
        alert('Failed to load video call. Please try again.');
        onClose();
      }
    };

    initializeJitsi();

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, [roomId, userName, userRole, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-semibold text-lg">MedConnect Video Consultation</h3>
            <p className="text-sm text-gray-300">{userRole === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'} • Room: {roomId}</p>
            {userRole === 'doctor' && <p className="text-xs text-green-300 mt-1">✓ You have moderator privileges</p>}
          </div>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
            title="End Call"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Jitsi Meet Container */}
      <div ref={jitsiContainerRef} className="w-full h-full" />
    </div>
  );
};

export default VideoCall;

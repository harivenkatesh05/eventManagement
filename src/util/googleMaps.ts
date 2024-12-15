let isLoading = false;
let isLoaded = false;
const callbacks: (() => void)[] = [];

export const loadGoogleMapsScript = (callback: () => void) => {
  // If already loaded, call callback immediately
  if (isLoaded) {
    callback();
    return;
  }

  // Add to callback queue
  callbacks.push(callback);

  // If already loading, wait for existing load
  if (isLoading) {
    return;
  }

  isLoading = true;

  // Create script element
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.onload = () => {
    isLoaded = true;
    isLoading = false;
    // Execute all callbacks
    callbacks.forEach(cb => cb());
    callbacks.length = 0; // Clear callbacks
  };

  document.head.appendChild(script);
}; 
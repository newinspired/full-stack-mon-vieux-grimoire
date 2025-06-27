import { useState, useEffect } from 'react';
import { getAuthenticatedUser, getBestRatedBooks } from './common';

// eslint-disable-next-line import/prefer-default-export
export function useUser() {
  const [connectedUser, setConnectedUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      setConnectedUser(user);
      setAuth(authenticated);
      setUserLoading(false);
    }
    getUserDetails();
  }, []);

  return { connectedUser, auth, userLoading };
}

export function useBestRatedBooks(currentBookId) {
  const [bestRatedBooks, setBestRatedBooks] = useState([]);

  useEffect(() => {
    if (!currentBookId) return; // ✅ Protection : éviter appel si ID manquant

    async function fetchBestRated() {
      const books = await getBestRatedBooks();
      const filtered = books.filter((book) => book.id !== currentBookId); // ✅ ne pas recommander le livre actuel
      setBestRatedBooks(filtered);
    }

    fetchBestRated();
  }, [currentBookId]);

  return { bestRatedBooks };
}

export function useFilePreview(file) {
  const fileInput = file[0] ?? [];
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (file && file[0]?.length > 0) {
      const newUrl = URL.createObjectURL(file[0][0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [fileInput[0]?.name]);

  return [imgSrc, setImgSrc];
}

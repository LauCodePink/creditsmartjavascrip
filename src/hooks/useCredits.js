import { useState, useEffect } from 'react';
import {db} from '../firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

export const useCredits = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'credits'));
        const creditsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCredits(creditsList);
      } catch (err) {
        setError('Error al cargar los créditos');
        console.error('Error fetching credits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return { credits, loading, error };
};
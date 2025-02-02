import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get('/songs');
                setSongs(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return { songs, loading, error };
}; 
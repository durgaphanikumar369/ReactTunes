import React from 'react';
import { useSongs } from '../hooks/useSongs';

const Home = () => {
    const { songs, loading, error } = useSongs();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {songs.map((song) => (
                <div key={song._id} className="bg-gray-800 p-4 rounded-lg">
                    <img 
                        src={`http://localhost:3000/${song.coverImage}`} 
                        alt={song.title}
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-xl font-bold mt-2">{song.title}</h3>
                    <p className="text-gray-400">{song.artist}</p>
                    <p className="text-gray-500">{song.album}</p>
                </div>
            ))}
        </div>
    );
};

export default Home; 
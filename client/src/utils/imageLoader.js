export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
};

export const preloadImages = async (songs) => {
  const imagePromises = songs.map(song => 
    preloadImage(song.coverImage)
      .catch(() => song.backupImage || 'https://via.placeholder.com/300')
  );
  
  return Promise.all(imagePromises);
}; 
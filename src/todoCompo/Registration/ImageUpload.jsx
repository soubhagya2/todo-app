
const ImageUpload = ({ imagePreview, onImageChange }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-20 rounded-full bg-gray-300 flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            className="w-full h-full rounded-full object-cover"
            alt="Profile Preview"
          />
        ) : (
          <i className="fa-solid fa-user text-3xl text-gray-500" />
        )}
      </div>
      <label className="cursor-pointer bg-gray-200 dark:text-gray-300 dark:bg-gray-800 px-4 py-2 rounded-lg">
        Upload Image
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;

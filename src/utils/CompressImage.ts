import imageCompression from "browser-image-compression";


export default async function CompressImage  (file: File){
    const options = {
        maxSizeMB: 1,
        useWebWorker: true,
        preserveExif: true,
        initialQuality: 0.8,
    };


    try {
        const compressedFile = await imageCompression(file, options);

        console.log("Original file size:", file.size / 1024 / 1024, "MB");
        console.log("Compressed file size:", compressedFile.size / 1024 / 1024, "MB");
        return compressedFile;
    } catch (error) {

        console.error("Error during image compression", error)
    }
}
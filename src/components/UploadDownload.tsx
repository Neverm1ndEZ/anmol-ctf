"use client";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function UploadDownload() {
	const [file, setFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [downloadURL, setDownloadURL] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		if (!file) return;
		const fileRef = ref(storage, `uploads/${file.name}`);
		const uploadTask = uploadBytesResumable(fileRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				console.error("Error Uploading File: ", error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setDownloadURL(downloadURL);
				});
			},
		);
	};

	const handleDownload = () => {
		if (downloadURL) {
			const link = document.createElement("a");
			link.href = downloadURL;
			link.download = file?.name || "download";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<div>
			<div>
				<input type="file" onChange={handleFileChange} />
				<button onClick={handleUpload}>Upload</button>
				{uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
				{downloadURL && (
					<div>
						<p>File Uploaded Successfully</p>
						<a
							href={downloadURL}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Download URL
						</a>
						<button onClick={handleDownload}>Download</button>
					</div>
				)}
			</div>
		</div>
	);
}

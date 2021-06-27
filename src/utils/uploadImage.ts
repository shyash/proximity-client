import { storage } from '../firebase';
export async function uploadImage(image: File): Promise<any> {
	try {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		return (await uploadTask).ref.getDownloadURL();
	} catch (error) {
		console.log(error);
	}
}

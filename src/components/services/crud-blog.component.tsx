import { db } from "../../utils/firebase/firebase.utils";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  AddPrefixToKeys,
} from "firebase/firestore";
interface IBlogObj {
  title: string;
  content: string;
  uid: string | null;
  username: string | null;
  date: string;
}
const blogCollectionRef = collection(db, "blogs");
class BlogDataServices {
  addBlog = (newBlog: IBlogObj) => {
    return addDoc(blogCollectionRef, newBlog);
  };
  updateBlog = (id: string, updateBlog: AddPrefixToKeys<string, any>) => {
    const blogDoc = doc(db, "blogs", id);
    return updateDoc(blogDoc, updateBlog);
  };
  deleteBlog = (id: string) => {
    const blogDoc = doc(db, "blogs", id);
    return deleteDoc(blogDoc);
  };
  getAllBlogs = () => {
    return getDocs(blogCollectionRef);
  };
  getBlog = (id: string) => {
    const blogDoc = doc(db, "blogs", id);
    return getDoc(blogDoc);
  };
}
export default new BlogDataServices();

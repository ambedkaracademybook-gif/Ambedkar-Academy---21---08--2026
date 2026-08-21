import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { 
  initializeFirestore, 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  setDoc, 
  doc, 
  getDoc,
  serverTimestamp 
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");

// Initialize Firestore with custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)"
  ? initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Collection References
export const REGISTRATIONS_COLLECTION = "registrations";
export const CONFIG_COLLECTION = "config";

export interface RegistrationData {
  id?: string;
  fullName: string;
  email?: string;
  whatsappNumber: string;
  targetExam: string;
  currentPosition: string;
  district: string;
  attendedCoachingBefore?: string;
  timestamp?: any;
  syncedToSheets?: boolean;
}

/**
 * Save new registration to Firebase Firestore
 */
export async function saveRegistrationToFirestore(data: RegistrationData) {
  try {
    const colRef = collection(db, REGISTRATIONS_COLLECTION);
    const docRef = await addDoc(colRef, {
      ...data,
      timestamp: new Date().toISOString(),
      createdAt: serverTimestamp(),
      syncedToSheets: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving registration to Firestore:", error);
    return { success: false, error };
  }
}

/**
 * Fetch all registrations from Firebase Firestore
 */
export async function fetchRegistrationsFromFirestore(): Promise<RegistrationData[]> {
  try {
    const colRef = collection(db, REGISTRATIONS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const list: RegistrationData[] = [];
    snapshot.forEach((docSnap) => {
      list.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<RegistrationData, "id">)
      });
    });
    // Sort newest first
    return list.sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching registrations from Firestore:", error);
    return [];
  }
}

/**
 * Save Sheets Config to Firestore
 */
export async function saveSheetsConfigToFirestore(config: {
  spreadsheetId: string;
  spreadsheetUrl: string;
  sheetTitle: string;
  updatedAt: string;
}) {
  try {
    const configDoc = doc(db, CONFIG_COLLECTION, "sheets_integration");
    await setDoc(configDoc, config, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error saving sheets config to Firestore:", error);
    return { success: false, error };
  }
}

/**
 * Fetch Sheets Config from Firestore
 */
export async function fetchSheetsConfigFromFirestore() {
  try {
    const configDoc = doc(db, CONFIG_COLLECTION, "sheets_integration");
    const snapshot = await getDoc(configDoc);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching sheets config from Firestore:", error);
    return null;
  }
}

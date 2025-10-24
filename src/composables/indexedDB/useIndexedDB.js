export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myMedicineDB", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("medication")) {
        db.createObjectStore("medication", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

export function addMedication(db, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("medication", "readwrite");
    const store = tx.objectStore("medication");
    const request = store.add(data);

    request.onsuccess = (e) => {
      resolve({ success: true, id: e.target.result });
    };

    request.onerror = (e) => {
      reject({ success: false, error: e.target.error });
    };
  });
}

export function listTransactions(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("medication", "readonly");
    const store = tx.objectStore("medication");
    const request = store.getAll();

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}